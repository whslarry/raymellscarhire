import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { useScrollReveal } from '../../lib/useScrollReveal';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Rural Route 12, Green Valley, CA 90210', href: '#', color: 'bg-forest-50 text-forest-600' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567', color: 'bg-blue-50 text-blue-600' },
  { icon: Mail, label: 'Email', value: 'hello@agrovista.farm', href: 'mailto:hello@agrovista.farm', color: 'bg-sun-50 text-sun-600' },
  { icon: Clock, label: 'Hours', value: 'Mon-Fri 8AM-6PM, Sat 9AM-4PM', href: '#', color: 'bg-soil-50 text-soil-600' },
];

export default function AgroContactPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useScrollReveal(0.1);
  const infoRef = useScrollReveal(0.1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase.from('agro_contacts').insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-50 via-white to-sun-50/30" />
        <div className="absolute bottom-0 left-[20%] w-48 h-48 bg-forest-100/30 rounded-full blur-[60px]" />
        <div className="relative container-wide animate-slide-up">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 badge bg-forest-100 text-forest-700 mb-4">
              <MessageSquare className="h-3.5 w-3.5" />
              Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-forest-900 mb-4">Get in Touch</h1>
            <p className="text-gray-600 text-lg">
              Have a question, want a quote, or ready to place an order? We would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3" ref={formRef}>
              <div className="card p-8 md:p-10 reveal">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-500 text-sm mb-8">Fill out the form and we will get back to you within 4 business hours.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="John Doe"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="e.g. Bulk grain order inquiry"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us about your needs..."
                      className="input-field resize-none"
                    />
                  </div>

                  {status === 'success' && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm animate-slide-up">
                      <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      Message sent successfully! We will get back to you soon.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-slide-up">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full text-base !py-3.5 group"
                  >
                    {status === 'loading' ? (
                      <><Loader className="h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" /> Send Message</>
                    )}
                  </button>

                  {!user && (
                    <p className="text-center text-gray-400 text-xs">
                      Note: Please sign in first to submit the form.
                    </p>
                  )}
                </form>
              </div>
            </div>

            {/* Contact info + map */}
            <div className="lg:col-span-2 space-y-6" ref={infoRef}>
              <div className="space-y-4 stagger-children">
                {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    className="card p-5 flex items-start gap-4 group hover:border-forest-200 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">{label}</p>
                      <p className="text-gray-800 text-sm font-medium">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="card overflow-hidden reveal">
                <div className="relative h-64 bg-forest-50 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-forest-300 mx-auto mb-2 animate-float" />
                    <p className="text-forest-600 font-semibold text-sm">Green Valley, California</p>
                    <p className="text-forest-400 text-xs mt-1">Rural Route 12, CA 90210</p>
                  </div>
                  <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: 'linear-gradient(forestgreen 1px, transparent 1px), linear-gradient(90deg, forestgreen 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }} />
                </div>
              </div>

              {/* Quick call panel */}
              <div className="bg-forest-900 rounded-2xl p-6 text-white reveal-scale relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sun-400/10 rounded-full blur-[40px]" />
                <div className="relative">
                  <h3 className="font-display font-bold text-lg mb-2">Quick Response</h3>
                  <p className="text-forest-200/80 text-sm leading-relaxed mb-5">
                    Our team typically responds within 4 business hours. For urgent orders, call us directly.
                  </p>
                  <a href="tel:+15551234567" className="btn-gold text-sm !py-2.5 w-full justify-center group">
                    <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
