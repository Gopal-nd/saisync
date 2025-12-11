'use client'
import React from "react";
import { BookOpen, Users, Calendar, Database, ShieldCheck, Mail } from "lucide-react";

// Edumate-ERP Landing Page
// Single-file React component using Tailwind CSS classes.
// Paste this file into a React + Tailwind project (e.g., Next.js / CRA) and render <EdumateLanding />.

export default function EdumateLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-sky-400 flex items-center justify-center text-white font-bold">EM</div>
          <div>
            <div className="font-semibold">Edumate</div>
            <div className="text-xs text-slate-500">ERP for modern schools & colleges</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm text-slate-700">
          <a href="#features" className="hover:text-slate-900">Features</a>
          <a href="#pricing" className="hover:text-slate-900">Pricing</a>
          <a href="#testimonials" className="hover:text-slate-900">Testimonials</a>
          <a href="#contact" className="px-4 py-2 rounded-md bg-slate-900 text-white">Get a demo</a>
        </nav>
        <button className="md:hidden p-2 rounded-md bg-slate-100">Menu</button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* HERO */}
        <section className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Edumate ERP — run your institution with clarity</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-xl">A unified school and college management system: admissions, attendance, exams, fees, staff payroll, and parent communication — all in one beautiful dashboard.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow-md">Request a demo</a>
              <a href="#features" className="inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-slate-200 text-slate-700">Explore features</a>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-slate-100"><Users size={20} /></div>
                <div>
                  <div className="text-sm font-semibold">300+ Institutions</div>
                  <div className="text-xs text-slate-500">Trusted worldwide</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-slate-100"><Calendar size={20} /></div>
                <div>
                  <div className="text-sm font-semibold">Real-time Attendance</div>
                  <div className="text-xs text-slate-500">Mobile & kiosk friendly</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="rounded-xl overflow-hidden border border-slate-100">
              {/* Mock dashboard preview */}
              <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-sky-400 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-90">Overview</div>
                    <div className="text-2xl font-bold mt-2">Edumate Dashboard</div>
                  </div>
                  <div className="text-xs opacity-90">Admin • 2m ago</div>
                </div>
              </div>

              <div className="p-5 grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-slate-50 border">Students <div className="text-2xl font-bold mt-2">4,832</div></div>
                <div className="p-4 rounded-lg bg-slate-50 border">Teachers <div className="text-2xl font-bold mt-2">234</div></div>
                <div className="p-4 rounded-lg bg-slate-50 border">Pending Fees <div className="text-2xl font-bold mt-2">₹1.2L</div></div>
                <div className="p-4 rounded-lg bg-slate-50 border">Upcoming Exams <div className="text-2xl font-bold mt-2">3</div></div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mt-16">
          <h2 className="text-2xl font-bold">Powerful features built for education teams</h2>
          <p className="mt-2 text-slate-600 max-w-2xl">Everything you need to manage students, staff, academics and finance — with powerful automations and a friendly UI.</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <FeatureCard Icon={BookOpen} title="Academic Management" desc="Course planning, timetables, lesson tracking and exam generation." />
            <FeatureCard Icon={Users} title="Student & Staff" desc="Admission workflows, ID cards, staff payroll, and role based access." />
            <FeatureCard Icon={Calendar} title="Attendance & Events" desc="Daily attendance, event calendars, and SMS/email reminders." />
            <FeatureCard Icon={Database} title="Fee & Finance" desc="Flexible invoicing, receipts, concessions and financial reports." />
            <FeatureCard Icon={ShieldCheck} title="Secure & Compliant" desc="Role-level security, audit logs and data export for regulators." />
            <FeatureCard Icon={Mail} title="Parent Communication" desc="Automated emails, SMS & parent portal with progress reports." />
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mt-16">
          <h2 className="text-2xl font-bold">Simple pricing that grows with you</h2>
          <p className="mt-2 text-slate-600 max-w-2xl">Transparent plans — switch anytime. No hidden onboarding fees for standard configurations.</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <PricingCard title="Starter" price="₹4,999/mo" bullets={["Up to 500 students","Core modules","Email support"]} />
            <PricingCard title="Growth" price="₹11,999/mo" featured bullets={["Unlimited students","SMS bundle","Priority support"]} />
            <PricingCard title="Enterprise" price="Custom" bullets={["Dedicated account manager","Custom integrations","On-prem or cloud"]} />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="mt-16">
          <h2 className="text-2xl font-bold">Loved by administrators & teachers</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Testimonial name="Smt. Radha Iyer" title="Principal, Sunrise Academy" quote="Edumate simplified our fees management and reduced manual work by 60%. The support team is excellent." />
            <Testimonial name="Mr. Arun Kumar" title="Exam Coordinator" quote="Scheduling exams used to be a nightmare. Now it's a single click and parents get notified automatically." />
            <Testimonial name="Ms. Leena Shah" title="Accountant" quote="Reconciliations are faster and the exportable reports made audits painless." />
          </div>
        </section>

        {/* CONTACT / CTA */}
        <section id="contact" className="mt-16 bg-white rounded-2xl p-8 shadow-md">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold">Ready to transform your institution?</h3>
              <p className="mt-2 text-slate-600">Book a walkthrough with our product specialist and get a free pilot setup.</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="mt-6 md:mt-0 flex gap-3">
              <input aria-label="Name" className="rounded-md border border-gray-500 px-4 py-3" placeholder="Your name" />
              <input aria-label="Email" className="rounded-md border border-gray-500 px-4 py-3" placeholder="Email" />
              <button className="rounded-md bg-indigo-600 px-4 py-3 text-white">Request demo</button>
            </form>
          </div>
        </section>

        <footer className="mt-12 text-sm text-slate-500">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
            <div>© {new Date().getFullYear()} Edumate — All rights reserved.</div>
            <div className="mt-3 md:mt-0">Made with ❤️ for educators</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({ Icon, title, desc }:any){
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-md bg-slate-50"><Icon size={22} /></div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-slate-500 text-sm mt-1">{desc}</div>
        </div>
      </div>
    </div>
  )
}

function PricingCard({ title, price, bullets = [], featured = false }:any){
  return (
    <div className={`p-6 rounded-lg border ${featured ? 'scale-105 shadow-lg border-indigo-200' : ''} bg-white`}>
      <div className="flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-slate-500">{price}</div>
      </div>
      <ul className="mt-4 space-y-2 text-slate-600 text-sm">
        {bullets.map((b:string,i:number)=> <li key={i}>• {b}</li>)}
      </ul>
      <div className="mt-6">
        <button className="w-full rounded-md py-2 bg-indigo-600 text-white">Choose</button>
      </div>
    </div>
  )
}

function Testimonial({ name, title, quote }:any){
  return (
    <div className="p-6 bg-white rounded-lg border shadow-sm">
      <div className="text-slate-700 italic">“{quote}”</div>
      <div className="mt-4 font-semibold">{name}</div>
      <div className="text-xs text-slate-500">{title}</div>
    </div>
  )
}

