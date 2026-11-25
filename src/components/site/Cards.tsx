import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Check, MapPin } from "lucide-react";
import type { Destination, Hotel, Pkg } from "@/data/site";
import { packages } from "@/data/site";
import { inr } from "@/lib/budget";
import { Modal, Stars, btnOutline, btnPrimary } from "./Layout";

export function DestinationCard({ d }: { d: Destination }) {
  const [open, setOpen] = useState(false);
  const related = packages.filter((p) => p.dest === d.name);
  return (
    <>
      <article className="group card-lift overflow-hidden rounded-2xl bg-card">
        <div className="relative h-56 overflow-hidden">
          <img src={d.img} alt={d.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
          <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-primary">{d.category}</span>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between"><h3 className="text-xl font-bold text-primary">{d.name}</h3><Stars n={d.rating} /></div>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{d.state}</p>
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{d.desc}</p>
          <button onClick={() => setOpen(true)} className={`${btnOutline} mt-4 w-full`}>Explore More</button>
        </div>
      </article>
      <Modal open={open} onClose={() => setOpen(false)}>
        <img src={d.img} alt={d.name} className="h-56 w-full object-cover" />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-primary">{d.name}</h3>
          <p className="text-sm text-muted-foreground">{d.state} · Best time: {d.bestTime}</p>
          <p className="mt-3 text-sm">{d.desc}</p>
          {related.map((p) => <p key={p.id} className="mt-3 rounded-xl bg-secondary p-3 text-sm"><b>{p.title}</b> — {p.days} days from {inr(p.price)}</p>)}
          <Link to="/booking" search={{ dest: d.name }} className={`${btnPrimary} mt-5 w-full`}>Book a trip to {d.name}</Link>
        </div>
      </Modal>
    </>
  );
}

export function PackageCard({ p }: { p: Pkg }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className="group card-lift flex flex-col overflow-hidden rounded-2xl bg-card">
        <div className="relative h-52 overflow-hidden">
          <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
          <span className="absolute right-3 top-3 rounded-full bg-gradient-sky px-3 py-1 text-xs font-semibold text-primary-foreground">{p.category}</span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="flex items-center gap-1 text-xs font-medium text-accent"><MapPin className="h-3 w-3" />{p.dest}</p>
          <h3 className="mt-1 text-lg font-bold text-primary">{p.title}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" />{p.days} Days / {p.days - 1} Nights</p>
          <ul className="mt-3 flex flex-wrap gap-2">{p.facilities.map((f) => <li key={f} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">{f}</li>)}</ul>
          <div className="mt-auto pt-4">
            <p className="text-xs text-muted-foreground">Estimated price per person</p>
            <p className="text-2xl font-bold text-primary">{inr(p.price)}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={() => setOpen(true)} className={btnOutline}>View Details</button>
              <Link to="/booking" search={{ dest: p.dest, pkg: p.title }} className={`${btnPrimary} px-4 py-2.5`}>Book Now</Link>
            </div>
          </div>
        </div>
      </article>
      <Modal open={open} onClose={() => setOpen(false)}>
        <img src={p.img} alt={p.title} className="h-52 w-full object-cover" />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-primary">{p.title}</h3>
          <p className="text-sm text-muted-foreground">{p.dest} · {p.days} Days · {inr(p.price)} per person</p>
          <h4 className="mt-4 font-semibold">Highlights</h4><p className="text-sm text-muted-foreground">{p.itinerary}</p>
          <h4 className="mt-4 font-semibold">Included</h4>
          <ul className="mt-2 grid grid-cols-2 gap-2 text-sm">{p.facilities.map((f) => <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" />{f}</li>)}</ul>
          <Link to="/booking" search={{ dest: p.dest, pkg: p.title }} className={`${btnPrimary} mt-5 w-full`}>Book this package</Link>
        </div>
      </Modal>
    </>
  );
}

export function HotelCard({ h }: { h: Hotel }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className="group card-lift overflow-hidden rounded-2xl bg-card">
        <div className="h-56 overflow-hidden"><img src={h.img} alt={h.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /></div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-2"><h3 className="text-lg font-bold text-primary">{h.name}</h3><Stars n={h.rating} /></div>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{h.location}</p>
          <ul className="mt-3 flex flex-wrap gap-2">{h.facilities.map((f) => <li key={f} className="rounded-full bg-secondary px-2.5 py-1 text-xs">{f}</li>)}</ul>
          <div className="mt-4 flex items-end justify-between">
            <div><p className="text-xs text-muted-foreground">Est. per night</p><p className="text-xl font-bold text-primary">{inr(h.price)}</p></div>
            <button onClick={() => setOpen(true)} className={btnOutline}>View Details</button>
          </div>
        </div>
      </article>
      <Modal open={open} onClose={() => setOpen(false)}>
        <img src={h.img} alt={h.name} className="h-56 w-full object-cover" />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-primary">{h.name}</h3>
          <p className="text-sm text-muted-foreground">{h.location} · {inr(h.price)} / night (estimate)</p>
          <p className="mt-3 text-sm">{h.about}</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">{h.facilities.map((f) => <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" />{f}</li>)}</ul>
          <Link to="/booking" search={{ dest: h.location }} className={`${btnPrimary} mt-5 w-full`}>Plan a stay in {h.location}</Link>
        </div>
      </Modal>
    </>
  );
}
