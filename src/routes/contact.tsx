import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Clock, CheckCircle2 } from "lucide-react";
import { destinations } from "@/data/site";
import { PageHeader, inputCls, btnPrimary } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Us | ExploreWorld" }, { name: "description", content: "Get in touch with the ExploreWorld travel team." }, { property: "og:title", content: "Contact Us | ExploreWorld" }, { property: "og:description", content: "Get in touch with the ExploreWorld travel team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});
type F = { name: string; email: string; subject: string; message: string };
const info = [{ i: MapPin, t: "Address", d: "201, Sky Tower, CG Road, Ahmedabad, Gujarat 380009" }, { i: Phone, t: "Phone", d: "+91 98765 43210" }, { i: Mail, t: "Email", d: "hello@exploreworld.in" }, { i: Clock, t: "Hours", d: "Mon – Sat, 9:00 AM – 7:00 PM" }];

function Page() {
  const [f, setF] = useState<F>({ name: "", email: "", subject: "", message: "" });
  const [err, setErr] = useState<Partial<Record<keyof F, string | undefined>>>({});
  const [ok, setOk] = useState(false);
  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setF({ ...f, [k]: e.target.value }); setErr({ ...err, [k]: undefined }); setOk(false); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v: Partial<Record<keyof F, string>> = {};
    if (f.name.trim().length < 3) v.name = "Name must be at least 3 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) v.email = "Please enter a valid email address.";
    if (f.subject.trim().length < 3) v.subject = "Please enter a subject.";
    if (f.message.trim().length < 10) v.message = "Message must be at least 10 characters.";
    setErr(v);
    if (!Object.keys(v).length) { setOk(true); setF({ name: "", email: "", subject: "", message: "" }); }
  };
  const E = ({ k }: { k: keyof F }) => (err[k] ? <p className="mt-1 text-xs text-destructive">{err[k]}</p> : null);
  return (
    <>
      <PageHeader title="Contact Us" subtitle="We'd love to help plan your next adventure." img={destinations[2]!.img} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pt-12 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">{info.map(({ i: I, t, d }) => <div key={t} className="card-lift flex gap-4 rounded-2xl bg-card p-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-sky text-primary-foreground"><I className="h-5 w-5" /></span><div><p className="font-semibold text-primary">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div></div>)}</div>
        <form noValidate onSubmit={submit} className="space-y-4 rounded-2xl bg-card p-6 shadow-card md:p-8 lg:col-span-3">
          <h2 className="text-2xl font-bold text-primary">Send us a message</h2>
          {ok && <div className="flex animate-rise items-center gap-3 rounded-xl bg-success/10 p-4 text-sm text-success"><CheckCircle2 className="h-5 w-5" />Thank you! Your message has been sent successfully (demo — nothing was stored).</div>}
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium">Name<input className={`${inputCls} mt-1`} value={f.name} onChange={set("name")} maxLength={60} /><E k="name" /></label>
            <label className="text-sm font-medium">Email<input type="email" className={`${inputCls} mt-1`} value={f.email} onChange={set("email")} maxLength={100} /><E k="email" /></label>
          </div>
          <label className="block text-sm font-medium">Subject<input className={`${inputCls} mt-1`} value={f.subject} onChange={set("subject")} maxLength={100} /><E k="subject" /></label>
          <label className="block text-sm font-medium">Message<textarea rows={5} className={`${inputCls} mt-1`} value={f.message} onChange={set("message")} maxLength={1000} /><E k="message" /></label>
          <button className={`${btnPrimary} w-full`}>Send Message</button>
        </form>
      </section>
    </>
  );
}
