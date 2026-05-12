import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="space-y-28 pb-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20">
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute top-1/2 -left-32 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px]" />
          <div className="absolute -bottom-32 right-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px]" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-5 py-2 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide text-muted-foreground">Secured with 2-Level AES-256 Encryption</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Student Management
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Redefined
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A modern registration system with enterprise-grade security.
            Manage students with data protected by dual-layer encryption.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Get Started Free
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card/50 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:-translate-y-0.5"
            >
              Sign In to Dashboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 max-w-2xl">
          <div className="grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <div className="px-4 text-center">
              <p className="text-2xl font-bold text-foreground sm:text-3xl">256-bit</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">AES Encryption</p>
            </div>
            <div className="px-4 text-center">
              <p className="text-2xl font-bold text-foreground sm:text-3xl">2-Layer</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">Security Model</p>
            </div>
            <div className="px-4 text-center">
              <p className="text-2xl font-bold text-foreground sm:text-3xl">CRUD</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">Full Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section>
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Built for Security & Simplicity</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Everything you need to manage student data safely and efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-6 lg:grid-cols-12">
          {/* Large card - Encryption (spans 8 cols) */}
          <div className="group sm:col-span-6 lg:col-span-8 rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-card-foreground">2-Level Encryption</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Data is encrypted on the frontend before transmission, then encrypted again on the backend before storage.
                  Even if one layer is compromised, your data remains fully protected.
                </p>
                <div className="mt-5 flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span className="text-xs font-medium text-secondary-foreground">Frontend Layer</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-accent"></span>
                    <span className="text-xs font-medium text-secondary-foreground">Backend Layer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small card - CRUD (spans 4 cols) */}
          <div className="group sm:col-span-3 lg:col-span-4 rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 transition-colors group-hover:bg-accent/25">
              <svg className="h-6 w-6 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Full CRUD Operations</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Create, read, update, and delete student records with a clean, intuitive interface.
            </p>
          </div>

          {/* Small card - Validation (spans 4 cols) */}
          <div className="group sm:col-span-3 lg:col-span-4 rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 transition-colors group-hover:bg-green-200 dark:bg-green-900/30 dark:group-hover:bg-green-900/50">
              <svg className="h-6 w-6 text-green-700 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Smart Validation</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Real-time validation for email, phone, and all required fields before submission.
            </p>
          </div>

          {/* Small card - Dark Mode (spans 4 cols) */}
          <div className="group sm:col-span-3 lg:col-span-4 rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 transition-colors group-hover:bg-purple-200 dark:bg-purple-900/30 dark:group-hover:bg-purple-900/50">
              <svg className="h-6 w-6 text-purple-700 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Dark & Light Mode</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Beautiful themes with system preference detection and manual toggle.
            </p>
          </div>

          {/* Large card - Tech Stack (spans 8 cols) */}
          <div className="group sm:col-span-6 lg:col-span-8 rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary transition-colors group-hover:bg-muted">
                <svg className="h-7 w-7 text-secondary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-card-foreground">Modern Tech Stack</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Built with React, TypeScript, and Tailwind CSS on the frontend. Node.js, Express, and MongoDB on the backend.
                  Type-safe from end to end.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section>
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Process</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">How Encryption Works</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Your data goes through two independent layers of protection
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Frontend Encrypts',
              desc: 'Sensitive fields are encrypted with AES-256-CBC using a frontend key before leaving the browser.',
              color: 'bg-primary/10 text-primary',
            },
            {
              step: '02',
              title: 'Backend Encrypts Again',
              desc: 'The already-encrypted data gets a second AES-256-CBC encryption with a different key before storage.',
              color: 'bg-accent/15 text-accent-foreground',
            },
            {
              step: '03',
              title: 'Stored in MongoDB',
              desc: 'Data sits in the database with double encryption. Fetching reverses the process layer by layer.',
              color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            },
          ].map((item, idx) => (
            <div key={item.step} className="relative">
              <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                  <span className="text-sm font-bold">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
              {/* Connector arrow */}
              {idx < 2 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-card border border-border shadow-sm">
                    <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
          {/* Left side */}
          <div className="flex flex-col justify-center p-10 md:p-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Complete Solution</p>
            <h2 className="text-3xl font-bold text-card-foreground">Everything You Need</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              A complete student management solution with security at its core. No compromises.
            </p>
            <div className="mt-8">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Start Now
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right side - Feature list */}
          <div className="border-t border-border bg-muted/30 p-10 md:border-l md:border-t-0 md:p-14">
            <div className="space-y-6">
              {[
                { icon: '🔐', title: 'AES-256-CBC Encryption', desc: 'Military-grade encryption on both layers' },
                { icon: '📋', title: 'Student Registration', desc: 'Full form with validation and error handling' },
                { icon: '✏️', title: 'Edit & Update', desc: 'Partial updates with PATCH method' },
                { icon: '🗑️', title: 'Safe Deletion', desc: 'Confirmation dialog before removing records' },
                { icon: '🌙', title: 'Dark Mode', desc: 'System-aware theme with manual toggle' },
                { icon: '📱', title: 'Responsive Design', desc: 'Works on desktop, tablet, and mobile' },
              ].map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card text-lg shadow-sm border border-border">
                    {feature.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-card-foreground">{feature.title}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-14 text-center shadow-sm sm:p-20">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-[80px]" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-accent/5 blur-[80px]" />
        </div>

        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Ready to Get Started?</h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Create your first student record in seconds with enterprise-grade security
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Register Now
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card/50 px-8 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-card hover:-translate-y-0.5"
          >
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
