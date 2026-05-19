import { supabase, CartHold, Seat } from './supabase';

export function generateBookingReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'WC26-';
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

// Attempt to hold a seat — returns true if successful, false if already taken
export async function holdSeat(
  userId: string,
  seat: Seat,
  matchId: string,
  zoneId: string
): Promise<boolean> {
  // Optimistic lock: only update if still available
  const { data: updated, error: updateErr } = await supabase
    .from('wc_seats')
    .update({ status: 'held' })
    .eq('id', seat.id)
    .eq('status', 'available')
    .select('id')
    .maybeSingle();

  if (updateErr || !updated) return false;

  // Insert cart hold (unique on seat_id prevents double-holds)
  const { error: holdErr } = await supabase.from('wc_cart_holds').insert({
    user_id: userId,
    seat_id: seat.id,
    match_id: matchId,
    zone_id: zoneId,
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
  });

  if (holdErr) {
    // Rollback seat status
    await supabase.from('wc_seats').update({ status: 'available' }).eq('id', seat.id);
    return false;
  }

  return true;
}

// Release a specific seat hold
export async function releaseSeatHold(seatId: string): Promise<void> {
  await supabase.from('wc_seats').update({ status: 'available' }).eq('id', seatId).eq('status', 'held');
  await supabase.from('wc_cart_holds').delete().eq('seat_id', seatId);
}

// Confirm all held seats into a booking
export async function confirmBooking(
  userId: string,
  matchId: string,
  holds: CartHold[],
  paymentMethod: string
): Promise<{ bookingId: string; reference: string } | null> {
  if (holds.length === 0) return null;

  const reference = generateBookingReference();
  const totalAmount = holds.reduce((sum, h) => sum + (h.wc_seat_zones?.price_usd ?? 0), 0);

  const { data: booking, error: bookingErr } = await supabase
    .from('wc_bookings')
    .insert({
      user_id: userId,
      match_id: matchId,
      total_amount: totalAmount,
      payment_method: paymentMethod,
      booking_reference: reference,
      status: 'confirmed',
    })
    .select('id')
    .single();

  if (bookingErr || !booking) return null;

  const items = holds.map((h) => ({
    booking_id: booking.id,
    seat_id: h.seat_id,
    zone_id: h.zone_id,
    price_paid: h.wc_seat_zones?.price_usd ?? 0,
  }));

  const { error: itemsErr } = await supabase.from('wc_booking_items').insert(items);
  if (itemsErr) return null;

  // Mark seats as booked and clean up holds
  await supabase
    .from('wc_seats')
    .update({ status: 'booked' })
    .in('id', holds.map((h) => h.seat_id));

  await supabase
    .from('wc_cart_holds')
    .delete()
    .in('seat_id', holds.map((h) => h.seat_id));

  return { bookingId: booking.id, reference };
}
