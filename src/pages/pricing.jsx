import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RollText, RollIcon } from "../components/roll.jsx";
import { Icon } from "../components/icons.jsx";
import { DokanFooter } from "../components/dokan-footer.jsx";
import { SiteHeader } from "../components/shell.jsx";
import "../styles/site.css";
import "../styles/pricing.css";
import { useScrollReveal } from "../components/scroll-reveal.js";

const THEME = { "heroAccent": "#2A5AFA", "tableAccent": "#6456BE" };
const HERO_DEEP = { "#2A5AFA": "#1E40C8", "#3D5AFE": "#2438D9", "#4338CA": "#312593", "#6456BE": "#4E3FA0" };

/* ── Hero plan cards (Annual / Lifetime) ── */
const HERO_PLANS = {
  annual: [
    { name: "Always Free", price: "$0", per: "/year", cta: "Download Free" },
    { name: "Starter", site: "1 site", price: "$99", per: "/year", cta: "Buy Now" },
    { name: "Professional", site: "3 site", price: "$99", per: "/year", cta: "Buy Now", feat: true, badge: "Most Popular", badgeType: "pop" },
    { name: "Business", site: "10 site", price: "$99", per: "/year", cta: "Buy Now", badge: "Best Valued", badgeType: "val" },
  ],
  lifetime: [
    { name: "Always Free", price: "$0", per: "/once", cta: "Download Free" },
    { name: "Starter", site: "1 site", price: "$299", per: "/once", cta: "Buy Now" },
    { name: "Professional", site: "3 site", price: "$399", per: "/once", cta: "Buy Now", feat: true, badge: "Most Popular", badgeType: "pop" },
    { name: "Business", site: "10 site", price: "$1499", per: "/once", cta: "Buy Now", badge: "Best Valued", badgeType: "val" },
  ],
};

const COL_HEADS = [
  { name: "Free", label: "Download" },
  { name: "Starter", label: "Buy Now" },
  { name: "Professional", label: "Buy Now", solid: true },
  { name: "Business", label: "Buy Now" },
];

/* marks: "c" = check, "m" = minus, or plain text */
const GENERAL = [
  { label: "Plugin updated", vals: ["Free", "1 Year", "1 Year", "1 Year"] },
  { label: "Support", vals: ["WordPress.org", "Ticket Based", "Ticket Based", "Priority"] },
  { label: "Domain", vals: ["Free", "1 Site", "5 Sites", "10 Sites"] },
  { label: "Premium Modules", vals: ["m", "1", "4", "9"] },
];

const ADVANCE = [
  "Unlimited Tasks", "Edit and Style Messages", "Interactive Calendar", "Progress Bar on List",
  "Add Title and Description", "Mark To-Do as Complete or Incomplete", "Assign Messages and Task Lists to Milestones",
  "Upload Files in Messages and Comments", "Built-In Private Messenger", "Set Project Start and End Dates",
  "Upload All Files in One Location",
].map((label) => ({ label, vals: ["c", "c", "c", "c"] })).concat(
  [
    "Create Folders for Files", "Link Messages and Task Lists to Files", "Project User Permissions",
    "Team Category Permissions", "Frontend Projects and Discussions", "Automatic Daily Digest Emails",
    "Advanced Report Filters", "Real-Time Updates", "Custom Fields",
  ].map((label) => ({ label, vals: ["m", "c", "c", "c"] }))
);

const MODULES = [
  { label: "Subtask", vals: ["m", "c", "c", "c"] },
  { label: "Time Tracker", vals: ["m", "c", "c", "c"] },
  { label: "Gantt Chart", vals: ["m", "m", "c", "c"] },
  { label: "Invoice", vals: ["Basic", "Basic", "c", "c"] },
  { label: "Kanban Board", vals: ["m", "m", "c", "c"] },
  { label: "BuddyPress Integration", vals: ["m", "m", "c", "c"] },
  { label: "WooCommerce Orders", vals: ["m", "m", "c", "c"] },
  { label: "Stripe", vals: ["m", "m", "c", "c"] },
  { label: "Recurring Task", vals: ["m", "m", "c", "c"] },
];

const FAQS = [
  { q: "Can I use wePOS with my existing WooCommerce setup?", a: "Absolutely. wePOS runs on top of your existing WooCommerce store with no migration required — your products, orders, and customers stay exactly where they are." },
  { q: "Does wePOS work with Dokan multivendor?", a: "Yes. Dokan integration is included from the Starter plan and above. Each vendor gets their own isolated POS environment." },
  { q: "What types of businesses can benefit from Dokan Cloud?", a: "From single-store retailers to large multivendor marketplaces — Dokan Cloud scales to fit boutiques, franchises, and everything in between." },
  { q: "What is the Save Carts feature?", a: "Save Carts lets cashiers park an in-progress sale and resume it later, so a single register can serve multiple customers without losing any order details." },
  { q: "Do cashiers need their own accounts?", a: "Each cashier can have a dedicated login with role-based permissions, giving you a clear audit trail of every transaction and shift." },
];

const Check = () => (
  <svg className="ci" viewBox="0 0 24 24" fill="none" stroke="#6456BE" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="Included">
    <polyline points="4 12.5 9.5 18 20 6.5" />
  </svg>
);
const Minus = () => (
  <svg className="ci" viewBox="0 0 24 24" fill="none" stroke="#CDCDCD" strokeWidth="2.6" strokeLinecap="round" aria-label="Not included">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const InfoDot = () => (
  <svg className="info" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="11" x2="12" y2="16.5" strokeLinecap="round" />
    <circle cx="12" cy="7.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

function Mark({ v }) {
  if (v === "c") return <Check />;
  if (v === "m") return <Minus />;
  return <span>{v}</span>;
}

function CmpRow({ row, info }) {
  return (
    <div className="cmp-row data">
      <div className="c-label">{info && <InfoDot />}{row.label}</div>
      {row.vals.map((v, i) => (
        <div className={"c-val" + (i === 2 ? " pro" : "")} key={i}><Mark v={v} /></div>
      ))}
    </div>
  );
}

function Pricing() {
  useScrollReveal();
  const [open, setOpen] = useState(1);
  const [billing, setBilling] = useState("annual");
  const t = THEME;
  const rootRef = useRef(null);
  const ctxRef = useRef(null);

  const accentStyle = {
    "--hero-accent": t.heroAccent,
    "--hero-accent-deep": HERO_DEEP[t.heroAccent] || "#1E40C8",
    "--tbl-accent": t.tableAccent,
  };
  const plans = HERO_PLANS[billing];

  useEffect(() => {
    if (!gsap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Schedule inside rAF: if animation frames are paused (background tab / preview),
    // nothing is ever hidden and all content stays visible. In a live browser it plays.
    const raf = requestAnimationFrame(() => {
      ctxRef.current = gsap.context(() => {
        const tl = gsap.timeline();
        tl.from(".p-hero h1", { y: 26, opacity: 0, duration: 0.7, ease: "power3.out" })
          .from(".p-hero .p-sub", { y: 18, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
          .from(".bill-wrap", { y: 14, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.35")
          .from(".p-card", { y: 34, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "-=0.3");
        if (ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
          gsap.utils.toArray(".cmp-row.head, .cmp-row.data, .cmp-secttl").forEach((el) => {
            gsap.from(el, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: el, start: "top 94%", once: true } });
          });
        }
      }, rootRef);
    });
    return () => { cancelAnimationFrame(raf); if (ctxRef.current) ctxRef.current.revert(); };
  }, []);

  return (
    <div ref={rootRef}>
      <div className="pricing-top">
        <SiteHeader active="pricing" />
        <section className="p-hero" data-screen-label="Pricing hero">
          <h1>Simple Pricing for Every Store Size</h1>
          <p className="p-sub">Start free. Upgrade when your store needs more. Every plan includes the full wePOS counter experience.</p>
        </section>

        <div className="bill-row">
          <div className="bill-wrap">
            <div className="bill-toggle" role="tablist" aria-label="Billing period" style={accentStyle}>
              <button className={billing === "annual" ? "active" : ""} onClick={() => setBilling("annual")} role="tab" aria-selected={billing === "annual"}>Annual</button>
              <button className={billing === "lifetime" ? "active" : ""} onClick={() => setBilling("lifetime")} role="tab" aria-selected={billing === "lifetime"}>Lifetime</button>
            </div>
            <div className="bill-annot" aria-hidden="true">
              <svg className="arrow" viewBox="0 0 46 40"><path d="M44 6 C 30 2, 12 8, 6 26 M6 26 L 2 17 M6 26 L 15 23" /></svg>
              <span className="txt">Upto 35% Off</span>
            </div>
          </div>
        </div>

        <div className="p-cards" style={accentStyle}>
          {plans.map((p) => (
            <div className={"p-card" + (p.feat ? " feat" : "")} key={p.name}>
              {p.badge && <span className={"p-badge " + p.badgeType}>{p.badge}</span>}
              <div className="p-name-row">
                <span className="p-name">{p.name}</span>
                {p.site && <span className="p-site">{p.site}</span>}
              </div>
              <div className="p-amt">
                <span className="num">{p.price}</span>
                <span className="per">{p.per}</span>
              </div>
              <button className="p-btn roll-btn"><RollText>{p.cta}</RollText> <RollIcon><Icon.ArrowRight size={15} stroke="currentColor" /></RollIcon></button>
            </div>
          ))}
        </div>

        <div className="refund-wrap">
          <div className="refund-band">
            <div className="refund-left">
              <h3>Our Fair Refund Policy</h3>
              <p>100% satisfaction guaranteed. If wePOS doesn't meet your needs, we'll refund your full purchase within 14 days — no questions asked.</p>
              <div className="pay-row">
                <span className="lbl">Payment Options:</span>
                <div className="pay-logos">
                  <span className="pay paypal"><span className="a">Pay</span><span className="b">Pal</span></span>
                  <span className="sep"></span>
                  <span className="pay visa">VISA</span>
                  <span className="sep"></span>
                  <span className="mc"><span></span><span></span></span>
                  <span className="sep"></span>
                  <span className="pay jcb"><span className="j">J</span><span className="c">C</span><span className="b2">B</span></span>
                  <span className="sep"></span>
                  <span className="pay disc">DIS<b>C</b>VER</span>
                  <span className="sep"></span>
                  <span className="pay amex">AMERICAN<br/>EXPRESS</span>
                </div>
              </div>
            </div>
            <div className="seal">
              <svg width="110" height="110" viewBox="0 0 132 132">
                <defs>
                  <path id="sealpath" d="M66,66 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" />
                </defs>
                <circle cx="66" cy="66" r="64" fill="#2A5AFA" />
                <circle cx="66" cy="66" r="50" fill="none" stroke="#fff" strokeWidth="2" />
                <circle cx="66" cy="66" r="38" fill="#fff" />
                <text fontFamily="Poppins" fontWeight="700" fontSize="11" letterSpacing="2.5" fill="#fff">
                  <textPath href="#sealpath" startOffset="2%">MONEY BACK • GUARANTEE • </textPath>
                </text>
              </svg>
              <div className="center">
                <div>
                  <div className="num">14</div>
                  <div className="days">DAYS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="cmp-section" data-screen-label="Features comparison" style={accentStyle}>
        <div className="cmp-head">
          <h2>Features Comparison</h2>
          <p>It's the perfect time to level up your marketplace. Don't wait — these deals won't last long!</p>
        </div>
        <div className="cmp-scroll">
          <div className="cmp-table">
            <div className="cmp-row head">
              <div className="c-head-features">Features</div>
              {COL_HEADS.map((h) => (
                <div className="c-head" key={h.name}>
                  <div className="c-head-name">{h.name}</div>
                  <button className={"c-head-btn" + (h.solid ? " solid" : "")}>{h.label} <Icon.ArrowRight size={14} stroke="currentColor" /></button>
                </div>
              ))}
            </div>

            <div className="cmp-general">
              {GENERAL.map((row) => <CmpRow row={row} info={false} key={row.label} />)}
            </div>

            <div className="cmp-secttl">Advance Features</div>
            {ADVANCE.map((row) => <CmpRow row={row} info={true} key={row.label} />)}

            <div className="cmp-secttl">Modules</div>
            {MODULES.map((row) => <CmpRow row={row} info={true} key={row.label} />)}
          </div>
        </div>
      </section>

      <section className="hq">
        <div className="hq-container">
          <div className="hq-inner">
            <h2 className="hq-title">Have <span className="hq-mark">Questions?<svg className="hq-underline" viewBox="0 0 320 24" preserveAspectRatio="none"><path d="M6 15 C 70 4, 250 4, 314 13"/></svg></span></h2>
            <p className="hq-subtitle">We're here to help you understand every aspect of our service. Reach out to us, and let's discuss how we can tailor our marketing expertise to your marketplace's specific needs.</p>
            <div className="hq-faq">
              {FAQS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div className={`hq-item ${isOpen ? "open" : ""}`} key={i}>
                    <button className="hq-qrow" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                      <span className="hq-qtext">{item.q}</span>
                      <span className="hq-icon" aria-hidden="true"></span>
                    </button>
                    <div className="hq-answer">
                      <div className="hq-answer-inner">
                        <p className="hq-answer-text">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="hq-ask">
              <span className="hq-label">Ask&nbsp;&nbsp;Question</span>
              <span className="hq-avatars">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" width="34" height="34" />
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" width="34" height="34" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <DokanFooter />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("app")).render(<Pricing />);
  