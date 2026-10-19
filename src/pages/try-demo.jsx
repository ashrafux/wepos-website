import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RollText, RollIcon } from "../components/roll.jsx";
import { Icon } from "../components/icons.jsx";
import { DokanFooter } from "../components/dokan-footer.jsx";
import { SiteHeader } from "../components/shell.jsx";
import "../styles/site.css";
import "../styles/try-demo.css";
import { useScrollReveal } from "../components/scroll-reveal.js";

/* Try Demo page app — wePOS */

const TD_THEME = { tdAccent: "#7047EB", tdCta: "purple" };
const TD_ACCENT_DEEP = { "#7047EB": "#5C32D4", "#2A5AFA": "#1E40C8", "#4338CA": "#312593", "#0D9488": "#0B7A70" };
const TD_ACCENT_SOFT = { "#7047EB": "#F3F0FD", "#2A5AFA": "#EFF4FF", "#4338CA": "#EEEDFB", "#0D9488": "#EBF7F6" };

const TD_TESTS = [
  { n: "01", t: "Complete Your First Sale", d: "Search products, add them to the cart, collect payment, and experience how quickly checkout works." },
  { n: "02", t: "Customize the Receipt", d: "Customize your receipt to match your brand." },
  { n: "03", t: "Watch Inventory Sync", d: "Complete a sale, then open the WooCommerce product and see inventory update automatically." },
  { n: "04", t: "Print a Receipt", d: "Generate and print a professional receipt just like you would in a real retail store." },
  { n: "05", t: "Explore Reports", d: "View sales reports, cashier activity, and performance insights — all from one dashboard." },
];

const TD_VS = [
  ["Separate online and in-store systems", "One WooCommerce-powered POS"],
  ["Manual inventory updates", "Real-time stock sync"],
  ["Slow product search", "Barcode-powered checkout"],
  ["Separate customer records", "Unified customer database"],
  ["Manual sales reporting", "Built-in reports and analytics"],
  ["Multiple disconnected tools", "Everything managed from one place"],
  ["Expensive standalone POS subscriptions", "Built directly into WooCommerce"],
];

const TD_FAQS = [
  { q: "Is this the full product?", a: "Yes. The demo runs the real wePOS Pro experience with most features enabled." },
  { q: "Will my changes be saved?", a: "No. The demo is a sandbox and resets automatically, so feel free to experiment." },
  { q: "Do I need barcode scanners or receipt printers?", a: "No. You can explore everything directly in your browser. Hardware is only needed for your own live store." },
  { q: "Can I use this with Dokan?", a: "Yes. wePOS includes dedicated support for Dokan, allowing each vendor to manage sales through their own POS interface." },
];

const TdX = () => (
  <span className="td-vs-ic no" aria-hidden="true">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  </span>
);
const TdCheck = () => (
  <span className="td-vs-ic yes" aria-hidden="true">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);
const TdShield = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z" />
  </svg>
);

function TdCred({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="td-cred">
      <div className="td-cred-txt">
        <span className="td-cred-label">{label}</span>
        <span className="td-cred-value">{value}</span>
      </div>
      <button type="button" className={"td-copy" + (copied ? " done" : "")} onClick={copy}>
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}

function TryDemo() {
  useScrollReveal();
  const [open, setOpen] = useState(0);
  const t = TD_THEME;
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const launchRef = useRef(null);
  const ctxRef = useRef(null);

  const accentStyle = {
    "--td-accent": t.tdAccent,
    "--td-accent-deep": TD_ACCENT_DEEP[t.tdAccent] || "#5C32D4",
    "--td-accent-soft": TD_ACCENT_SOFT[t.tdAccent] || "#F3F0FD",
  };

  /* Entrance + scroll reveals */
  useEffect(() => {
    if (!gsap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const raf = requestAnimationFrame(() => {
      ctxRef.current = gsap.context(() => {
        const tl = gsap.timeline();
        tl.from(".td-hero .page-eyebrow", { y: 16, opacity: 0, duration: 0.5, ease: "power3.out" })
          .from(".td-hero h1", { y: 28, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
          .from(".td-hero .td-sub", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
          .from(".td-cta-row", { y: 16, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.4")
          .from(".td-access-wrap", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.55");
        if (ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
          gsap.utils.toArray(".td-reveal").forEach((el) => {
            gsap.from(el, { opacity: 0, y: 26, duration: 0.6, ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
          });
          gsap.utils.toArray(".td-test").forEach((el, i) => {
            gsap.from(el, { opacity: 0, y: 30, duration: 0.55, delay: (i % 5) * 0.07, ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: el, start: "top 94%", once: true } });
          });
        }
      }, rootRef);
    });
    return () => { cancelAnimationFrame(raf); if (ctxRef.current) ctxRef.current.revert(); };
  }, []);

  /* Hover: 3D tilt on access card + magnetic launch button (pointer devices only) */
  useEffect(() => {
    if (!gsap) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const card = cardRef.current;
    const onCardMove = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: px * 7, rotateX: -py * 7, transformPerspective: 1100, duration: 0.45, ease: "power2.out" });
    };
    const onCardLeave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.55)" });
    card.addEventListener("mousemove", onCardMove);
    card.addEventListener("mouseleave", onCardLeave);

    const btn = launchRef.current;
    const onBtnMove = (e) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.16, y: (e.clientY - r.top - r.height / 2) * 0.24, duration: 0.35, ease: "power2.out" });
    };
    const onBtnLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    btn.addEventListener("mousemove", onBtnMove);
    btn.addEventListener("mouseleave", onBtnLeave);

    return () => {
      card.removeEventListener("mousemove", onCardMove);
      card.removeEventListener("mouseleave", onCardLeave);
      btn.removeEventListener("mousemove", onBtnMove);
      btn.removeEventListener("mouseleave", onBtnLeave);
    };
  }, []);

  return (
    <div ref={rootRef} style={accentStyle}>
      <SiteHeader active="demo" />

      <main className="td-main">
        {/* ── Hero + demo access ── */}
        <section className="td-wrap td-hero" data-screen-label="Demo hero">
          <div>
            <span className="page-eyebrow">LIVE DEMO · NO SIGNUP REQUIRED</span>
            <h1>Run In-Store Sales Right From WooCommerce and Dokan</h1>
            <p className="td-sub">Experience the new wePOS 2.0 in your browser. Ring up sales, scan barcodes, print receipts, and explore advanced POS features using a fully functional sandbox; no installation, signup, or credit card required.</p>
            <div className="td-cta-row">
              <a className="ds-btn ds-btn-primary with-arrow roll-btn" href="#" ref={launchRef}>
                <RollText>Launch Live Demo</RollText>
                <span className="ds-circle"><RollIcon fill><Icon.ArrowRight size={18} /></RollIcon></span>
              </a>
              <span className="td-cta-hint"><Icon.Check size={15} stroke="currentColor" /> Free — no credit card</span>
            </div>
          </div>

          <div className="td-access-wrap">
            <aside className="td-access" ref={cardRef} data-screen-label="Demo access card">
              <span className="td-access-tag"><span className="dot"></span>ADMIN DEMO</span>
              <h3>One Login. Full Pro Experience.</h3>
              <p>Everything is unlocked so you can explore the complete wePOS experience, including Pro features.</p>
              <div className="td-creds">
                <TdCred label="Email" value="demo@wepos.com" />
                <TdCred label="Password" value="wepos_demo" />
              </div>
              <div className="td-access-note">
                <TdShield />
                <span>Sandbox resets automatically — experiment freely.</span>
              </div>
            </aside>
          </div>
        </section>

        {/* ── Five things worth testing ── */}
        <section className="td-wrap" data-screen-label="Five things to test">
          <div className="td-sec-head center td-reveal">
            <h2>Five Things Worth Testing First</h2>
            <p>Not sure where to start? Try these in your first five minutes.</p>
          </div>
          <ol className="td-tests">
            {TD_TESTS.map((item) => (
              <li className="td-test" key={item.n}>
                <div className="td-test-num">{item.n}</div>
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Without / With comparison ── */}
        <section className="td-wrap" data-screen-label="Why switch comparison">
          <div className="td-sec-head center td-reveal">
            <h2>Why Store Owners Switch to wePOS</h2>
          </div>
          <div className="td-vs td-reveal">
            <div className="td-vs-row head">
              <div className="td-vs-cell without">Without wePOS</div>
              <div className="td-vs-cell with">With wePOS</div>
            </div>
            {TD_VS.map(([w, ww]) => (
              <div className="td-vs-row data" key={w}>
                <div className="td-vs-cell without"><TdX />{w}</div>
                <div className="td-vs-cell with"><TdCheck />{ww}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="td-wrap" data-screen-label="Demo FAQs">
          <div className="td-sec-head center td-reveal">
            <h2>FAQs</h2>
          </div>
          <div className="td-faq-list td-reveal">
            {TD_FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div className={"td-faq-item" + (isOpen ? " open" : "")} key={i}>
                  <button type="button" className="td-faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                    <span>{item.q}</span>
                    <span className="td-faq-x" aria-hidden="true"></span>
                  </button>
                  <div className="td-faq-a">
                    <div className="td-faq-a-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="td-wrap td-reveal" data-screen-label="Final CTA">
          <div className={"td-band" + (t.tdCta === "dark" ? " dark" : "")}>
            <h2>Ready to Run Faster Checkout?</h2>
            <p>Everything you've explored in the demo can be running on your own WooCommerce store in just a few minutes.</p>
            <a className="td-band-btn roll-btn" href="pricing.html">
              <RollText>Get Started with wePOS</RollText>
              <span className="cir"><RollIcon fill><Icon.ArrowRight size={16} /></RollIcon></span>
            </a>
          </div>
        </section>
      </main>

      <DokanFooter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<TryDemo />);
