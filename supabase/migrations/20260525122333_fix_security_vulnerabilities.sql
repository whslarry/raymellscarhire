/*
  # Fix Security Vulnerabilities

  ## 1. Function Search Path Mutability
  - `handle_new_wc_user()`: Add `SET search_path = ''` to prevent search_path injection
  - `release_expired_wc_holds()`: Add `SET search_path = ''` to prevent search_path injection

  ## 2. RLS Policies Always True (Bypassing RLS)
  - `agro_contacts` INSERT policy: Replace `WITH CHECK (true)` with `WITH CHECK (auth.uid() IS NOT NULL)`
    so only genuinely authenticated users can insert, not anonymous callers with an authenticated role.
  - `agro_newsletter` INSERT policy: Replace `WITH CHECK (true)` with `WITH CHECK (auth.uid() IS NOT NULL)`
    for the same reason.
  - `wc_seats` UPDATE policy: Replace both `USING (true)` and `WITH CHECK (true)` with proper checks:
    users can only update seats they hold in `wc_cart_holds`, OR admins can update any seat.

  ## 3. SECURITY DEFINER Functions Executable by Public
  - `handle_new_wc_user()`: This is a trigger function called by the auth system.
    Revoke EXECUTE from `anon` and `authenticated`. Only `postgres` and `service_role` need access.
    Trigger functions are called by the database superuser, not via RPC.
  - `release_expired_wc_holds()`: This is a maintenance function.
    Revoke EXECUTE from `anon` and `authenticated`. Only `service_role` should call this
    (e.g., from a cron job or edge function using the service_role key).
*/

-- ═══════════════════════════════════════════
-- 1. Fix function search_path mutability
-- ═══════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.handle_new_wc_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.wc_profiles (id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$function$;

CREATE OR REPLACE FUNCTION public.release_expired_wc_holds()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  released integer;
BEGIN
  UPDATE public.wc_seats
  SET status = 'available'
  WHERE id IN (
    SELECT seat_id FROM public.wc_cart_holds WHERE expires_at < now()
  );
  GET DIAGNOSTICS released = ROW_COUNT;
  DELETE FROM public.wc_cart_holds WHERE expires_at < now();
  RETURN released;
END;
$function$;

-- ═══════════════════════════════════════════
-- 2. Fix RLS policies with always-true checks
-- ═══════════════════════════════════════════

-- agro_contacts: Replace overly permissive INSERT policy
DROP POLICY IF EXISTS "Authenticated users can submit contacts" ON public.agro_contacts;
CREATE POLICY "Authenticated users can submit contacts"
  ON public.agro_contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- agro_newsletter: Replace overly permissive INSERT policy
DROP POLICY IF EXISTS "Authenticated users can subscribe" ON public.agro_newsletter;
CREATE POLICY "Authenticated users can subscribe"
  ON public.agro_newsletter
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- wc_seats: Replace overly permissive UPDATE policy
-- Users can only update seats they currently hold, or admins can update any
DROP POLICY IF EXISTS "Authenticated users can update seat status" ON public.wc_seats;
CREATE POLICY "Users can update seats they hold"
  ON public.wc_seats
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.wc_cart_holds
      WHERE wc_cart_holds.seat_id = wc_seats.id
      AND wc_cart_holds.user_id = auth.uid()
      AND wc_cart_holds.expires_at > now()
    )
    OR EXISTS (
      SELECT 1 FROM public.wc_profiles
      WHERE wc_profiles.id = auth.uid()
      AND wc_profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.wc_cart_holds
      WHERE wc_cart_holds.seat_id = wc_seats.id
      AND wc_cart_holds.user_id = auth.uid()
      AND wc_cart_holds.expires_at > now()
    )
    OR EXISTS (
      SELECT 1 FROM public.wc_profiles
      WHERE wc_profiles.id = auth.uid()
      AND wc_profiles.role = 'admin'
    )
  );

-- ═══════════════════════════════════════════
-- 3. Revoke EXECUTE on SECURITY DEFINER functions
-- ═══════════════════════════════════════════

-- Revoke from PUBLIC (default grant)
REVOKE EXECUTE ON FUNCTION public.handle_new_wc_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.release_expired_wc_holds() FROM PUBLIC;

-- Revoke from anon (unauthenticated API callers)
REVOKE EXECUTE ON FUNCTION public.handle_new_wc_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.release_expired_wc_holds() FROM anon;

-- Revoke from authenticated (signed-in API callers)
REVOKE EXECUTE ON FUNCTION public.handle_new_wc_user() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.release_expired_wc_holds() FROM authenticated;

-- Ensure service_role retains EXECUTE (for cron/edge functions)
GRANT EXECUTE ON FUNCTION public.release_expired_wc_holds() TO service_role;
