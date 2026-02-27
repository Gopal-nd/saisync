'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Users,
  CalendarCheck,
  IndianRupee,
  ShieldCheck,
  MessageSquare,
  Menu,
  X,
  BookOpen,
  UserCheck,
  Clock,
  FileText,
  Building,
  Star,
  ArrowRight,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";


const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const features = [
  { icon: BookOpen, title: "Academic Management", desc: "Course planning, timetables, lesson tracking and exam generation." },
  { icon: Users, title: "Student & Staff", desc: "Admission workflows, ID cards, staff payroll, and role based access." },
  { icon: CalendarCheck, title: "Attendance & Events", desc: "Daily attendance, event calendars, and SMS/email reminders." },
  { icon: IndianRupee, title: "Fee & Finance", desc: "Flexible invoicing, receipts, concessions and financial reports." },
  { icon: ShieldCheck, title: "Secure & Compliant", desc: "Role-level security, audit logs and data export for regulators." },
  { icon: MessageSquare, title: "Parent Communication", desc: "Automated emails, SMS & parent portal with progress reports." },
];

const testimonials = [
  { quote: "Edumate simplified our fees management and reduced manual work by 60%. The support team is excellent.", name: "Smt. Radha Iyer", role: "Principal, Sunrise Academy" },
  { quote: "Scheduling exams used to be a nightmare. Now it's a single click and parents get notified automatically.", name: "Mr. Arun Kumar", role: "Exam Coordinator" },
  { quote: "Reconciliations are faster and the exportable reports made audits painless.", name: "Ms. Leena Shah", role: "Accountant" },
];





const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
 const router = useRouter();

  const goLogin = () => router.push("/sign-in");

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen animated-gradient-bg text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-xl font-bold text-primary">Edumate</span>
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </button>
            ))}
            <Button size="sm" onClick={goLogin}>Get Started</Button>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="flex flex-col gap-3 border-t px-4 py-4 md:hidden">
            {navLinks.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="text-sm text-muted-foreground text-left">
                {l.label}
              </button>
            ))}
            <Button size="sm" className="w-fit" onClick={goLogin}>Get Started</Button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
        <Badge variant="secondary" className="mb-4">ERP for modern schools & colleges</Badge>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Edumate ERP run your institution with <span className="text-primary">clarity</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          A unified school and college management system: admissions, attendance, exams, fees, staff payroll, and parent communication all in one beautiful dashboard.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={goLogin}>
            Get Started <ArrowRight size={16} />
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo("#features")}>
            Explore features
          </Button>
        </div>
 
      </section>

 

      {/* Features */}
      <section id="features" className="bg-secondary/30 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">Powerful features built for education teams</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Everything you need to manage students, staff, academics and finance — with powerful automations and a friendly UI.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section id="testimonials" className="bg-secondary/30 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">Loved by administrators & teachers</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to transform your institution?</h2>
          <p className="mt-3 text-muted-foreground">
            Book a walkthrough with our product specialist and get a free pilot setup.
          </p>
          <Button size="lg" onClick={goLogin}>
            Get Started <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm text-muted-foreground">© 2026 Edumate — All rights reserved.</p>
          <p className="mt-1 text-xs text-muted-foreground">Made with <Heart size={12} className="inline text-primary" /> for educators</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
