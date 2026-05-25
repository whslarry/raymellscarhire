import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Target, Heart, Recycle, ArrowRight, Award, Users, Globe } from 'lucide-react';
import { useScrollReveal } from '../../lib/useScrollReveal';

const team = [
  { name: 'Maria Santos', role: 'Founder & CEO', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300', bio: 'Third-generation farmer with 20 years in sustainable agriculture.' },
  { name: 'David Chen', role: 'Head of Agronomy', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300', bio: 'PhD in Soil Science, pioneer of our regenerative methods.' },
  { name: 'Amara Johnson', role: 'Supply Chain Director', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300', bio: 'Ensures full traceability from every field to every shelf.' },
  { name: 'Tom Brewer', role: 'Head of Operations', image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300', bio: 'Logistics expert making farm-to-table delivery seamless.' },
];

const values = [
  { icon: Leaf, title: 'Soil First', desc: 'We believe healthy soil is the foundation of everything. Our practices regenerate the land for future generations.' },
  { icon: Recycle, title: 'Zero Waste', desc: 'From composting crop residue to upcycling byproducts, we are committed to circular agriculture.' },
  { icon: Heart, title: 'Community', desc: 'We invest in rural communities through fair wages, education programs, and infrastructure development.' },
  { icon: Target, title: 'Transparency', desc: 'Full supply chain visibility. Every product can be traced back to the exact field and harvest date.' },
];

const milestones = [
  { year: '2012', event: 'Founded with 200 acres and a vision for sustainable farming' },
  { year: '2015', event: 'Achieved USDA Organic Certification for all product lines' },
  { year: '2018', event: 'Launched the Heritage Seed Program with 50+ heirloom varieties' },
  { year: '2020', event: 'Expanded to 340+ partner farms across three states' },
  { year: '2023', event: 'Introduced full blockchain-based supply chain traceability' },
  { year: '2025', event: 'Reached 12,000+ acres under regenerative management' },
];

export default function AgroAboutPage() {
  const missionRef = useScrollReveal(0.1);
  const valuesRef = useScrollReveal(0.1);
  const timelineRef = useScrollReveal(0.1);
  const teamRef = useScrollReveal(0.1);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/327540/pexels-photo-327540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Farm landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-900/70 to-forest-900/40" />
        </div>
        <div className="relative container-wide animate-slide-up">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 badge bg-white/10 backdrop-blur-sm text-white/90 border border-white/20 mb-6">
              <Leaf className="h-3.5 w-3.5" />
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Rooted in Purpose
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              We started with 200 acres and a belief that farming could heal the earth. Today, we manage 12,000+ acres of regenerative farmland — and we are just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding" ref={missionRef}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <div className="inline-flex items-center gap-2 badge bg-forest-100 text-forest-700 mb-4">
                <Target className="h-3.5 w-3.5" />
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-900 mb-6">
                Regenerating Land, Nourishing Communities
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Larry Farm was born from the conviction that agriculture does not have to choose between productivity and sustainability. Our regenerative methods increase yields while restoring soil health, sequestering carbon, and conserving water.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We work with a network of 340+ partner farms, providing them with the resources, technology, and market access they need to transition to sustainable practices — while ensuring buyers receive premium, fully traceable products.
              </p>
              <div className="grid grid-cols-3 gap-8">
                {[
                  { icon: Award, value: '12K+', label: 'Acres Managed', color: 'text-forest-600' },
                  { icon: Users, value: '340+', label: 'Partner Farms', color: 'text-soil-600' },
                  { icon: Globe, value: '3', label: 'States Active', color: 'text-sun-600' },
                ].map(({ icon: Icon, value, label, color }) => (
                  <div key={label} className="group">
                    <Icon className={`h-5 w-5 ${color} mb-2 group-hover:scale-110 transition-transform`} />
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <p className="text-gray-500 text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-right relative">
              <div className="img-zoom rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/2165759/pexels-photo-2165759.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Sustainable farming practices"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                <p className="text-forest-700 font-bold text-lg">Since 2012</p>
                <p className="text-gray-500 text-xs">Growing sustainably</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-forest-50/30" ref={valuesRef}>
        <div className="container-wide">
          <div className="text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-900 mb-3">Our Values</h2>
            <p className="text-gray-500 max-w-xl mx-auto">The principles that guide every decision we make, from the field to the boardroom.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-8 flex gap-5 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-forest-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-forest-100 group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-6 w-6 text-forest-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" ref={timelineRef}>
        <div className="container-wide">
          <div className="text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-900 mb-3">Our Journey</h2>
            <p className="text-gray-500">Key milestones in our mission to transform agriculture.</p>
          </div>
          <div className="max-w-2xl mx-auto space-y-0 stagger-children">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-forest-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 group-hover:bg-forest-700 group-hover:scale-110 transition-all duration-300 shadow-md shadow-forest-600/20">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 h-14 bg-gradient-to-b from-forest-300 to-forest-100" />}
                </div>
                <div className="pb-8">
                  <p className="text-forest-600 font-bold text-sm mb-1">{m.year}</p>
                  <p className="text-gray-700">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-forest-50/30" ref={teamRef}>
        <div className="container-wide">
          <div className="text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-900 mb-3">Meet the Team</h2>
            <p className="text-gray-500 max-w-xl mx-auto">The people behind Larry Farm who make sustainable agriculture a reality every day.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {team.map((member) => (
              <div key={member.name} className="card overflow-hidden group hover:-translate-y-1.5 transition-all duration-300">
                <div className="h-64 img-zoom">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-gray-900">{member.name}</h3>
                  <p className="text-forest-600 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0 grain-overlay opacity-20" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-sun-400/10 rounded-full blur-[100px]" />
        <div className="relative container-wide text-center reveal">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Want to Join Our Network?</h2>
          <p className="text-forest-200/80 max-w-lg mx-auto mb-8">We are always looking for partner farms and conscious buyers who share our commitment to sustainable agriculture.</p>
          <Link to="/contact" className="btn-gold text-base !py-4 !px-10 group">
            Get in Touch
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
