import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Compass, Menu, X, Mail, Phone, MapPin, Star } from "lucide-react";

const nav = [
  { to: "/", label: "Home" }, { to: "/destinations", label: "Destinations" }, { to: "/packages", label: "Packages" },
  { to: "/hotels", label: "Hotels" }, { to: "/budget", label: "Budget" }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" },
] as const;

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-display text-2xl font-bold ${light ? "text-primary-foreground" : "text-primary"}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-sky text-primary-foreground"><Compass className="h-5 w-5" /></span>
      Explore<span className="text-accent">World</span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-primary" activeProps={{ className: "bg-secondary text-primary" }}>{n.label}</Link>
          ))}
        </nav>
        <Link to="/booking" className="hidden rounded-full bg-gradient-sky px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition hover:opacity-90 lg:inline-block">Book Now</Link>
        <button aria-label="Toggle menu" className="lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 lg:hidden">
          {[...nav, { to: "/booking", label: "Book Now" } as const].map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 font-medium text-foreground hover:bg-secondary">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1"><Logo light /><p className="mt-4 text-sm opacity-75">Your trusted companion for discovering India's most beautiful destinations.</p></div>
        <div><h4 className="mb-3 font-semibold">Explore</h4><ul className="space-y-2 text-sm opacity-80">{nav.slice(0, 5).map((n) => <li key={n.to}><Link to={n.to} className="hover:text-accent">{n.label}</Link></li>)}</ul></div>
        <div><h4 className="mb-3 font-semibold">Company</h4><ul className="space-y-2 text-sm opacity-80"><li><Link to="/about" className="hover:text-accent">About Us</Link></li><li><Link to="/contact" className="hover:text-accent">Contact</Link></li><li><Link to="/booking" className="hover:text-accent">Booking</Link></li></ul></div>
        <div><h4 className="mb-3 font-semibold">Get in touch</h4><ul className="space-y-2 text-sm opacity-80"><li className="flex gap-2"><MapPin className="h-4 w-4" />CG Road, Ahmedabad, Gujarat</li><li className="flex gap-2"><Phone className="h-4 w-4" />+91 98765 43210</li><li className="flex gap-2"><Mail className="h-4 w-4" />hello@exploreworld.in</li></ul></div>
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs opacity-70">© 2026 ExploreWorld. Frontend prototype for academic demonstration.</div>
    </footer>
  );
}

export function PageHeader({ title, subtitle, img }: { title: string; subtitle: string; img: string }) {
  return (
    <section className="relative flex h-72 items-center justify-center overflow-hidden text-center md:h-80">
      <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative animate-rise px-4 text-primary-foreground">
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-xl opacity-90">{subtitle}</p>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold text-primary md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Stars({ n }: { n: number }) {
  return <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary"><Star className="h-4 w-4 fill-chart-4 text-chart-4" />{n.toFixed(1)}</span>;
}

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/50 p-4" onClick={onClose}>
      <div className="relative max-h-[90vh] w-full max-w-lg animate-rise overflow-auto rounded-2xl bg-card shadow-lift" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-card shadow-card"><X className="h-4 w-4" /></button>
        {children}
      </div>
    </div>
  );
}

export const inputCls = "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-ring/30";
export const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sky px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card transition hover:opacity-90 hover:shadow-lift";
export const btnOutline = "inline-flex items-center justify-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground";
