import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "../components/icons.jsx";
import { RollText, RollIcon } from "../components/roll.jsx";
import { SiteFooter } from "../components/site-footer.jsx";
import { SiteHeader } from "../components/shell.jsx";
import heroImg from "../assets/Hero image.png";
import dashboardImg from "../assets/hero-dashboard.png";
import receiptBuilderImg from "../assets/receipt-builder.png";
import step1Img from "../assets/steps/step-1.jpg";
import step2Img from "../assets/steps/step-2.jpg";
import step3Img from "../assets/steps/step-3.jpg";
import avatarAImg from "../assets/avatar-2.jpg";
import avatarBImg from "../assets/avatar-3.jpg";
import "../styles/site.css";
import "../styles/wepos-for-dokan.css";
import { useScrollReveal } from "../components/scroll-reveal.js";

/* ── Content ── */
/* Comparison rows. `without` is false (✕) or a short note on what you get today without wePOS. */
const COMPARE = [
  { icon: "store", tone: "blue", title: "A POS for every vendor", desc: "Each vendor rings up in-store sales from their own POS, instead of a separate till or paper.", without: "Separate tills" },
  { icon: "sync", tone: "orange", title: "Real-time stock sync", desc: "Every counter sale updates WooCommerce stock instantly, so online and in-store stock always match.", without: false },
  { icon: "users", tone: "yellow", title: "Cashier role & staff permissions", desc: "A dedicated cashier role, and vendor staff inherit the permissions you already set in Dokan.", without: "Shared logins" },
  { icon: "receipt", tone: "purple", title: "Receipts for every vendor", desc: "Each vendor customizes their own receipt instead of handing out generic or handwritten ones.", without: "Generic" },
  { icon: "globe", tone: "green", title: "Per-vendor tax & currency", desc: "Set tax and currency for each vendor, not one setup for everyone.", without: "One setup" },
  { icon: "chart", tone: "pink", title: "In-store sales reports", desc: "A sales dashboard you can filter by date, cashier, outlet and status.", without: false },
  { icon: "outlet", tone: "teal", title: "Outlets linked to vendors", desc: "Assign each physical outlet to the vendor who runs it.", without: false },
  { icon: "shield", tone: "indigo", title: "Control at every counter", desc: "One access matrix for what vendors and cashiers can do, enforced on the server.", without: false },
];

/* Stroke icons for the comparison rows (24px grid) */
const CMP_ICON_PATHS = {
  store: <><path d="M3 9.5 4.5 4h15L21 9.5" /><path d="M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /><path d="M5 12v8h14v-8" /><path d="M10 20v-4h4v4" /></>,
  sync: <><path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16" /><path d="M20 20v-4h-4" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8" /><path d="M18.5 14.5a6.5 6.5 0 0 1 3 5.5" /></>,
  receipt: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></>,
  chart: <><path d="M21 12A9 9 0 1 1 12 3v9z" /><path d="M15 3.5A9 9 0 0 1 20.5 9H15z" /></>,
  outlet: <><path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6" /><path d="M2 21h20" /></>,
  shield: <><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z" /><path d="m9 12 2 2 4-4" /></>,
};

function CmpIcon({ name }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {CMP_ICON_PATHS[name]}
    </svg>
  );
}


/* Bar heights (%) for the vendor dashboard chart; `hi` bars use the dark brand color */
const SVC_BARS = [
  { m: "Mar", h: 38 }, { m: "Apr", h: 100, hi: true }, { m: "May", h: 58 },
  { m: "Jun", h: 78, hi: true }, { m: "Jul", h: 48, hi: true }, { m: "Aug", h: 74 },
];

/* Stroke icons for the service cards (24px grid) */
const SVC_ICON_PATHS = {
  store: <><path d="M3 9.5 4.5 4h15L21 9.5" /><path d="M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /><path d="M5 12v8h14v-8" /><path d="M10 20v-4h4v4" /></>,
  chart: <><path d="M4 4v16h16" /><path d="m7 15 4-4 3 3 5-6" /></>,
  receipt: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
};

function SvcIcon({ name }) {
  return (
    <span className="dk-svc-ic" aria-hidden="true">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {SVC_ICON_PATHS[name]}
      </svg>
    </span>
  );
}

const ArrowUpRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
);
const ArrowDownLeft = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 7 7 17" /><path d="M16 17H7V8" /></svg>
);


const STEPS = [
  { title: "Install wePOS", body: "Add wePOS to your Dokan Powered Marketplace and activate your lifetime license." },
  { title: "Set up outlets and cashiers", body: "Assign outlets to vendors and give staff a cashier login." },
  { title: "Start selling", body: "Vendors ring up sales at the counter, and stock updates across your store." },
];

/* Step illustrations: 3D clay renders, one per step, shown between the title and the text */
const STEP_ARTS = [step1Img, step2Img, step3Img];

/* "Your marketplace, your rules": one tab per area of control.
   `rows` drive the list mock-up on the left (sample names, for illustration). */
const CONTROL_TABS = [
  {
    key: "matrix", label: "Access matrix", icon: "grid", tone: "violet",
    title: "One access matrix for every vendor",
    body: "Set what vendors can see and do in the POS from a single screen. Permissions are enforced on the server, so the rules hold even if someone tries to work around the screen.",
    checks: ["One screen for all vendors", "Enforced on the server", "Holds outside the screen"],
  },
  {
    key: "teams", label: "Vendor teams", icon: "users", tone: "blue",
    title: "Vendors manage their own team",
    body: "Each vendor sets permissions for their own cashiers and staff, and can never grant more than they have.",
    checks: ["Vendor-managed staff", "Permissions per team member", "Never more than the vendor has"],
  },
  {
    key: "outlets", label: "Outlets", icon: "store", tone: "teal",
    title: "Outlets stay with their owner",
    body: "Every physical outlet belongs to the vendor who runs it. Vendors can only edit and staff their own outlets.",
    checks: ["Outlets assigned to vendors", "Edit only your own outlets", "Staff only your own outlets"],
  },
  {
    key: "cashiers", label: "Cashiers", icon: "badge", tone: "amber",
    title: "A dedicated cashier role",
    body: "Give counter staff only what they need to sell, and set up a whole team in one go with bulk cashier assignment.",
    checks: ["Cashier-only POS access", "Bulk cashier assignment", "Login per outlet and counter"],
  },
];

const CONTROL_ICON_PATHS = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><path d="m14 17.5 2.2 2.2L21 15" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8" /><path d="M18.5 14.5a6.5 6.5 0 0 1 3 5.5" /></>,
  store: <><path d="M3 9.5 4.5 4h15L21 9.5" /><path d="M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /><path d="M5 12v8h14v-8" /><path d="M10 20v-4h4v4" /></>,
  badge: <><rect x="4" y="3" width="16" height="18" rx="2.5" /><circle cx="12" cy="10" r="2.6" /><path d="M8 17a4 4 0 0 1 8 0" /></>,
  shield: <><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z" /><path d="m9 12 2 2 4-4" /></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.4" /></>,
};

const CtlIcon = ({ name, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{CONTROL_ICON_PATHS[name]}</svg>
);

const YES = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const NO = <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>;

/* Access matrix: who can do what, enforced server-side */
function MatrixIllo() {
  const rows = [["Sell at the counter", 1, 1], ["Apply discounts", 1, 1], ["Issue refunds", 1, 0], ["Edit product prices", 1, 0], ["Export reports", 1, 0]];
  return (
    <div className="ill ill-matrix">
      <div className="ill-card mx">
        <div className="mx-row mx-head"><span>Permission</span><span>Vendor</span><span>Cashier</span></div>
        {rows.map((r) => (
          <div className="mx-row" key={r[0]}>
            <span>{r[0]}</span>
            <span className={"mx-cell " + (r[1] ? "y" : "n")}>{r[1] ? YES : NO}</span>
            <span className={"mx-cell " + (r[2] ? "y" : "n")}>{r[2] ? YES : NO}</span>
          </div>
        ))}
      </div>
      <div className="ill-chip mx-chip"><CtlIcon name="shield" size={18} />Enforced on the server</div>
    </div>
  );
}

/* Vendor teams: one vendor, their own staff underneath */
function TeamIllo() {
  const staff = [["BC", "a", "Bob", "Cashier"], ["MS", "b", "Maya", "Cashier"], ["JN", "c", "Jin", "Manager"]];
  return (
    <div className="ill ill-team">
      <div className="ill-card tm-owner"><span className="tm-store"><CtlIcon name="store" size={20} /></span><div><b>Vendor A</b><small>Sets their team's access</small></div></div>
      <svg className="tm-lines" viewBox="0 0 360 60" preserveAspectRatio="none" aria-hidden="true"><path d="M180 0v22M60 60V38q0-16 16-16h208q16 0 16 16v22M180 22v38" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" /></svg>
      <div className="tm-staff">
        {staff.map((m) => (
          <div className="ill-card tm-member" key={m[0]}>
            <span className={"dk-ctl-av g-" + m[1]}>{m[0]}</span>
            <b>{m[2]}</b>
            <span className="tm-role">{m[3]}</span>
          </div>
        ))}
      </div>
      <div className="ill-chip tm-chip"><CtlIcon name="lock" size={16} />Never more than Vendor A has</div>
    </div>
  );
}

/* Outlets: pins on a map, each owned by one vendor */
function OutletIllo() {
  const pins = [["Main St", "Vendor A", "a", "18%", "26%"], ["Airport", "Vendor A", "a", "62%", "16%"], ["City Mall", "Vendor B", "b", "40%", "56%"]];
  return (
    <div className="ill ill-outlet">
      <div className="ill-card ol-map">
        <span className="ol-road r1" /><span className="ol-road r2" /><span className="ol-road r3" />
        {pins.map((p) => (
          <div className={"ol-pin v-" + p[2]} key={p[0]} style={{ left: p[3], top: p[4] }}>
            <span className="ol-dot"><CtlIcon name="pin" size={16} /></span>
            <span className="ol-label"><b>{p[0]}</b><small>{p[1]}</small></span>
          </div>
        ))}
      </div>
      <div className="ill-chip ol-chip"><CtlIcon name="lock" size={16} />Only Vendor A can edit Main St</div>
    </div>
  );
}

/* Cashiers: a cashier badge with just the access they need + bulk assignment */
function CashierIllo() {
  return (
    <div className="ill ill-cashier">
      <div className="ill-card cs-badge">
        <span className="cs-slot" />
        <span className="dk-ctl-av g-b cs-av">MS</span>
        <b className="cs-name">Maya Singh</b>
        <span className="cs-role">Cashier · Counter 2</span>
        <div className="cs-perms">
          <span className="y">{YES}Sell</span><span className="y">{YES}Print receipts</span>
          <span className="n">{NO}Settings</span><span className="n">{NO}Reports</span>
        </div>
      </div>
      <div className="ill-chip cs-chip">
        <span className="cs-stack"><span className="dk-ctl-av g-a">BC</span><span className="dk-ctl-av g-c">JN</span><span className="dk-ctl-av g-d">AK</span></span>
        +8 cashiers assigned in one go
      </div>
    </div>
  );
}

const CONTROL_ILLOS = { matrix: MatrixIllo, teams: TeamIllo, outlets: OutletIllo, cashiers: CashierIllo };

function ControlTabs() {
  const [tab, setTab] = useState(0);
  const t = CONTROL_TABS[tab];
  const Illo = CONTROL_ILLOS[t.key];
  const onKey = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (tab + (e.key === "ArrowRight" ? 1 : -1) + CONTROL_TABS.length) % CONTROL_TABS.length;
    setTab(next);
    document.getElementById("dk-ctl-tab-" + next)?.focus();
  };
  return (
    <section className="dk-wrap dk-ctl" data-screen-label="Control">
      <div className="dk-head center dk-reveal">
        <h2>Your marketplace, your rules</h2>
        <p>Vendors get their own POS. You still decide who can use it and what they can do.</p>
      </div>

      <div className="dk-ctl-tabs dk-reveal" role="tablist" aria-label="Areas of control" onKeyDown={onKey}>
        {CONTROL_TABS.map((x, i) => (
          <button key={x.key} id={"dk-ctl-tab-" + i} type="button" role="tab" aria-selected={i === tab} aria-controls="dk-ctl-panel" tabIndex={i === tab ? 0 : -1} className={i === tab ? "on" : ""} onClick={() => setTab(i)}>
            <CtlIcon name={x.icon} />{x.label}
          </button>
        ))}
      </div>

      <div className={"dk-ctl-card dk-reveal tone-" + t.tone} id="dk-ctl-panel" role="tabpanel" aria-labelledby={"dk-ctl-tab-" + tab}>
        <div className="dk-ctl-visual" aria-hidden="true" key={t.key}>
          <Illo />
        </div>
        <div className="dk-ctl-copy" key={t.key + "-copy"}>
          <span className="dk-ctl-tag">{t.label}</span>
          <h3>{t.title}</h3>
          <p>{t.body}</p>
          <ul className="dk-ctl-checks">
            {t.checks.map((c) => (
              <li key={c}><span className="dk-ctl-ok"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


const WOO_GROUPS = [
  { icon: "barcode", title: "Fast checkout", items: ["Barcode scanning", "Multiple live carts", "Carts saved across devices", "Sell by weight", "Coupons and discounts"] },
  { icon: "card", title: "Payments", items: ["Cash payments", "Card and WooCommerce gateways", "Automatic tax calculation", "POS fee tax"] },
  { icon: "store", title: "Outlets and staff", items: ["Unlimited outlets", "Unlimited counters and cashiers", "Login with outlet and counter selection"] },
  { icon: "bell", title: "Stock", items: ["Low and out-of-stock alerts", "Out-of-stock protection", "Quick Edit for stock, price, categories and tags"] },
  { icon: "chart", title: "Reports", items: ["Sales dashboard with charts", "Payment summaries", "Filter by date, cashier, outlet and status", "Printable reports and CSV export"] },
  { icon: "printer", title: "Receipts and orders", items: ["Advanced receipt builder", "One-click print from order tables", "Detailed order view", "Conditional refunds"] },
];

const WOO_EXTRAS = ["Unlimited products", "Unlimited customers", "HPOS support", "Light, dark or system mode"];

/* Stroke icons for the WooCommerce carousel (24px grid) */
const WOO_ICON_PATHS = {
  barcode: <path d="M4 5v14M7 5v14M10 5v14M14 5v14M17 5v14M20 5v14" />,
  card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
  store: <><path d="M3 9.5 4.5 4h15L21 9.5" /><path d="M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /><path d="M5 12v8h14v-8" /><path d="M10 20v-4h4v4" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
  chart: <><path d="M4 4v16h16" /><path d="m7 15 4-4 3 3 5-6" /></>,
  printer: <><path d="M6 9V3h12v6" /><rect x="3" y="9" width="18" height="8" rx="2" /><path d="M6 14h12v7H6z" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
};

const WooIcon = ({ name }) => (
  <span className="dk-woo-ic" aria-hidden="true">
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{WOO_ICON_PATHS[name]}</svg>
  </span>
);

/* WooCommerce features as a horizontal card carousel.
   Desktop: the section pins and vertical scrolling slides the cards sideways; cards that
   arrive from off-screen animate their features in. Phones / reduced motion: native swipe. */
function WooCarousel() {
  const cards = [
    ...WOO_GROUPS.map((g, i) => ({ ...g, tone: "t" + i })),
    { icon: "plus", title: "Included on every plan", items: WOO_EXTRAS, tone: "t-dark" },
  ];
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const stRef = useRef(null);      // pinned ScrollTrigger (desktop only)
  const [active, setActive] = useState(0);

  // Offset (px) that brings card i to the left edge, capped at the end of the track
  const offsetFor = (i) => {
    const track = trackRef.current, vp = viewportRef.current;
    const card = track.children[i];
    const max = track.scrollWidth - vp.clientWidth;
    return Math.max(0, Math.min(card.offsetLeft, max));
  };
  const indexFromOffset = (x) => {
    const kids = [...trackRef.current.children];
    const max = trackRef.current.scrollWidth - viewportRef.current.clientWidth;
    if (x >= max - 4) return kids.length - 1;
    let best = 0;
    kids.forEach((k, i) => { if (Math.abs(k.offsetLeft - x) < Math.abs(kids[best].offsetLeft - x)) best = i; });
    return best;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    let raf = requestAnimationFrame(() => {
      mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current, vp = viewportRef.current, track = trackRef.current;
        section.classList.add("is-pinned");
        const distance = () => Math.max(0, track.scrollWidth - vp.clientWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "center center",
            end: () => "+=" + distance(),
            pin: true,
            pinSpacing: true,   // parent (.dk-main) is flex, where GSAP would default this to false
            scrub: 0.6,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onUpdate: (self) => setActive(indexFromOffset(self.progress * distance())),
          },
        });
        stRef.current = tween.scrollTrigger;
        // Cards that start off-screen reveal their features as they slide in
        [...track.children].forEach((card) => {
          if (card.offsetLeft + 40 < vp.clientWidth) return;
          gsap.from(card.querySelectorAll("li"), {
            opacity: 0, y: 16, duration: 0.45, stagger: 0.07, ease: "power2.out",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 88%", toggleActions: "play none none reverse" },
          });
        });
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        return () => { section.classList.remove("is-pinned"); stRef.current = null; };
      });
    });
    return () => { cancelAnimationFrame(raf); mm.revert(); };
  }, []);

  // Native swipe mode: keep the dots in sync with the scroll position
  const onNativeScroll = () => {
    if (stRef.current) return;
    setActive(indexFromOffset(viewportRef.current.scrollLeft));
  };

  const go = (dir) => {
    const next = Math.max(0, Math.min(cards.length - 1, active + dir));
    const st = stRef.current;
    if (st) {
      const max = trackRef.current.scrollWidth - viewportRef.current.clientWidth;
      const y = st.start + (max ? offsetFor(next) / max : 0) * (st.end - st.start);
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      viewportRef.current.scrollTo({ left: offsetFor(next), behavior: "smooth" });
    }
  };

  return (
    <section className="dk-wrap dk-woo" ref={sectionRef} data-screen-label="WooCommerce POS">
      <div className="dk-woo-head">
        <div>
          <h2>A full WooCommerce POS behind every counter</h2>
          <p>Products, customers, orders and stock all come from your WooCommerce store, synced in real time.</p>
        </div>
        <div className="dk-woo-nav">
          <button type="button" aria-label="Previous features" onClick={() => go(-1)} disabled={active === 0}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 6 9 12 15 18" /></svg>
          </button>
          <button type="button" aria-label="Next features" onClick={() => go(1)} disabled={active === cards.length - 1}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
        </div>
      </div>

      <div className="dk-woo-viewport" ref={viewportRef} onScroll={onNativeScroll}>
        <div className="dk-woo-track" ref={trackRef}>
          {cards.map((c) => (
            <article className={"dk-woo-card " + c.tone} key={c.title}>
              <div className="dk-woo-top">
                <WooIcon name={c.icon} />
              </div>
              <h3>{c.title}</h3>
              <ul>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>

      <div className="dk-woo-dots" aria-hidden="true">
        {cards.map((c, i) => <i key={c.title} className={i === active ? "on" : ""} />)}
      </div>
    </section>
  );
}

const PLANS = [
  { name: "Starter", sites: "1 site", price: "$299", was: "$599" },
  { name: "Professional", sites: "3 sites", price: "$399", was: "$799", feat: true, badge: "Most Popular", badgeType: "pop" },
  { name: "Business", sites: "10 sites", price: "$599", was: "$1,199", badge: "Best Valued", badgeType: "val" },
];

const PLAN_INCLUDES = ["Dokan vendor POS", "Outlets", "Cashiers", "Reports", "Barcode tools", "Ticket support"];

const FAQS = [
  { q: "Do I need Dokan to use wePOS?", a: "No. wePOS runs on any WooCommerce store. With Dokan, each vendor also gets their own POS." },
  { q: "Is the lifetime plan really a one-time payment?", a: "Yes. You pay once for your license, with no yearly renewal." },
  { q: "What's the difference between the plans?", a: "Only the number of sites. Starter covers 1, Professional 3 and Business 10. Every feature is in every plan." },
  { q: "Can each vendor run their own counter?", a: "Yes. Each Dokan vendor gets their own POS, receipts, and tax and currency settings, and vendor staff keep their Dokan permissions." },
  { q: "Does it work with a barcode scanner?", a: "Yes. You can scan products at the counter and manage scanner settings from wePOS." },
  { q: "How many outlets and cashiers can I add?", a: "As many as you need. Outlets, counters and cashiers are unlimited on every lifetime plan." },
  { q: "What if it's not right for me?", a: "You get a full refund within 14 days, no questions asked." },
];

/* ── Small marks ── */
const MarkYes = () => (
  <span className="dk-mark yes" aria-hidden="true">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
  </span>
);

function Trust({ light }) {
  return (
    <ul className={"dk-trust" + (light ? " light" : "")}>
      <li><Icon.Check size={15} stroke="currentColor" /> One-time payment</li>
      <li><Icon.Check size={15} stroke="currentColor" /> 14-day money-back guarantee</li>
    </ul>
  );
}

function SectionHead({ eyebrow, title, lead, center = true }) {
  return (
    <div className={"dk-head dk-reveal" + (center ? " center" : "")}>
      {eyebrow && <span className="page-eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

/* ── Page ── */
function WePOSForDokan() {
  useScrollReveal();
  const [open, setOpen] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.timeline()
          .from(".dk-hero .page-eyebrow", { y: 16, opacity: 0, duration: 0.5, ease: "power3.out" })
          .from(".dk-hero h1", { y: 28, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
          .from(".dk-hero .dk-lead", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
          .from(".dk-hero .dk-ctas, .dk-hero .dk-trust", { y: 16, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.4")
          .from(".dk-hero-img", { y: 60, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.35");
      }, rootRef);
    });
    return () => { cancelAnimationFrame(raf); if (ctx) ctx.revert(); };
  }, []);

  return (
    <div ref={rootRef}>
      <div className="dk-top">
        <SiteHeader active="dokan" />
      </div>

      <main className="dk-main">
        {/* ── 1. Hero ── */}
        <section className="dk-hero" data-screen-label="Hero">
          <div className="dk-wrap dk-hero-copy">
            <span className="page-eyebrow">For Dokan Powered Marketplace owners</span>
            <h1>Give Every Dokan Vendor Their Own Point of Sale</h1>
            <p className="dk-lead">wePOS adds in-store selling to your WooCommerce marketplace. Each vendor runs their own POS, and every sale syncs with your store in real time.</p>
            <div className="dk-ctas">
              <a className="ds-btn ds-btn-primary with-arrow roll-btn" href="#pricing">
                <RollText>Get Lifetime Access</RollText>
                <span className="ds-circle"><RollIcon fill><Icon.ArrowRight size={18} /></RollIcon></span>
              </a>
              <a className="ds-btn ds-btn-secondary plain" href="#pricing">See lifetime plans</a>
            </div>
            <Trust />
          </div>

          <div className="dk-wrap dk-stage">
            <img
              className="dk-hero-img"
              src={heroImg}
              width="2800"
              height="1568"
              alt="A vendor's POS sale syncing in real time with the marketplace"
            />
          </div>
        </section>

        {/* ── 2. Without vs with ── */}
        <section className="dk-wrap dk-cmp-section" data-screen-label="Comparison">
          <div className="dk-cmp-head dk-reveal">
            <span className="dk-cmp-mark" aria-hidden="true">
              {/* wePOS mark, taken from assets/Lite Logo.svg */}
              <svg width="34" height="40" viewBox="0 0 33 39" fill="none">
                <defs>
                  <mask id="dkCmpMask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="33" height="39">
                    <path d="M0 16.0759V38.0308L7.70589 25.2304C9.30852 22.5683 12.1887 20.9403 15.296 20.9403H21.6816C27.4642 20.9403 32.1518 16.2527 32.1518 10.4702C32.1518 4.68765 27.4642 0 21.6816 0H16.0759C7.19743 0 0 7.19743 0 16.0759Z" fill="white" />
                  </mask>
                  <linearGradient id="dkCmpG1" x1="19.2894" y1="4.68196" x2="3.14329" y2="27.9925" gradientUnits="userSpaceOnUse">
                    <stop offset="0.000422297" stopColor="#0ACEFE" />
                    <stop offset="1" stopColor="#495AFF" />
                  </linearGradient>
                  <linearGradient id="dkCmpG2" x1="30.8686" y1="0.289185" x2="30.8686" y2="44.2872" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#265FF9" />
                    <stop offset="1" stopColor="#4339FF" />
                  </linearGradient>
                </defs>
                <g mask="url(#dkCmpMask)">
                  <path d="M0 16.0759V38.0308L7.70589 25.2304C9.30852 22.5683 12.1887 20.9403 15.296 20.9403H21.6816C27.4642 20.9403 32.1518 16.2527 32.1518 10.4702C32.1518 4.68765 27.4642 0 21.6816 0H16.0759C7.19743 0 0 7.19743 0 16.0759Z" fill="url(#dkCmpG1)" />
                  <path opacity="0.160319" fillRule="evenodd" clipRule="evenodd" d="M0.658203 38.0309C2.65175 22.2331 7.26548 14.3341 14.4994 14.3341C25.3503 14.3341 29.8163 15.6971 29.8163 4.48312C29.8163 -2.99288 40.2372 -0.473991 61.0789 12.0398L12.3804 44.2871L0.658203 38.0309Z" fill="url(#dkCmpG2)" />
                </g>
              </svg>
            </span>
            <h2>What changes when your vendors get wePOS</h2>
          </div>

          <div className="dk-cmp dk-reveal" role="table" aria-label="Your marketplace with and without wePOS">
            <div className="dk-cmp-cols" role="row">
              <span role="columnheader"><span className="sr-only">Feature</span></span>
              <span role="columnheader">With wePOS</span>
              <span role="columnheader">Without wePOS</span>
            </div>
            <div className="dk-cmp-card">
              {COMPARE.map((r) => (
                <div className="dk-cmp-row" role="row" key={r.title}>
                  <div className="dk-cmp-feature" role="rowheader">
                    <span className={"dk-cmp-ic " + r.tone}><CmpIcon name={r.icon} /></span>
                    <div>
                      <h3>{r.title}</h3>
                      <p>{r.desc}</p>
                    </div>
                  </div>
                  <div className="dk-cmp-val" role="cell">
                    <span className="dk-cmp-yes">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                      <span className="sr-only">Included</span>
                    </span>
                  </div>
                  <div className="dk-cmp-val" role="cell">
                    {r.without
                      ? <span className="dk-cmp-note">{r.without}</span>
                      : (
                        <span className="dk-cmp-no">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
                          <span className="sr-only">Not available</span>
                        </span>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Built for Dokan ── */}
        <section className="dk-wrap dk-svc-section" data-screen-label="Built for Dokan">
          <SectionHead
            eyebrow="Dokan integration"
            title="Built for Dokan Powered Marketplaces"
            lead="wePOS works with Dokan out of the box. Vendors get their own counter, and you keep one store behind it all." />

          <div className="dk-svc dk-stagger">
            {/* Large: POS per vendor */}
            <article className="dk-svc-card lg cream">
              <SvcIcon name="store" />
              <h3>A POS for every vendor</h3>
              <p>Each Dokan vendor runs their own point of sale, and outlets stay with the vendors who run them.</p>
              <div className="dk-svc-visual dk-svc-device" aria-hidden="true">
                <div className="dk-device">
                  <div className="dk-device-screen">
                    <div className="dk-device-status"><span>12:30</span><span className="dk-device-bars"><i /><i /><i /><i /></span></div>
                    <div className="dk-device-title"><strong>Vendor POS</strong><span>Counter 2</span></div>
                    <div className="dk-device-row">
                      <span className="dk-device-ic"><SvcIcon name="receipt" /></span>
                      <div><b>Order #1042</b><small>Cashier: Maya</small></div>
                      <em>$12.00</em>
                    </div>
                    <div className="dk-device-line" />
                  </div>
                </div>
                <div className="dk-svc-float">
                  <span className="dk-svc-float-ic"><SvcIcon name="store" /></span>
                  <span className="dk-svc-float-txt">Vendor A · Outlet 1</span>
                  <span className="dk-svc-float-amt">+$15.00</span>
                </div>
              </div>
            </article>

            {/* Large: vendor dashboard */}
            <article className="dk-svc-card lg grey">
              <SvcIcon name="chart" />
              <h3>Vendor admin dashboard</h3>
              <p>Vendors see their own reports, orders and settings in one place, without asking the marketplace owner.</p>
              <div className="dk-svc-visual dk-svc-chart" aria-hidden="true">
                <div className="dk-svc-tabs">
                  <span className="on">Sales <ArrowDownLeft size={16} /></span>
                  <span>Orders <ArrowUpRight size={16} /></span>
                </div>
                <div className="dk-svc-bars">
                  {SVC_BARS.map((b) => (
                    <div className="dk-svc-bar" key={b.m}>
                      <span className={b.hi ? "hi" : ""} style={{ height: b.h + "%" }} />
                      <small>{b.m}</small>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Small: tax & currency */}
            <article className="dk-svc-card sm grey">
              <h3>Local tax and currency for each vendor</h3>
              <p>Set tax and currency for each vendor instead of one setup for the whole marketplace.</p>
              <div className="dk-svc-visual dk-svc-currency" aria-hidden="true">
                <div className="dk-cur back"><span className="dk-cur-sym eur">€</span>EUR</div>
                <div className="dk-cur"><span className="dk-cur-sym usd">$</span>USD<ArrowUpRight size={20} /></div>
              </div>
            </article>

            {/* Small: receipts */}
            <article className="dk-svc-card sm grey">
              <h3>Receipts in each vendor's name</h3>
              <p>Every vendor customizes their own receipt, from the store header to the thank-you note.</p>
              <div className="dk-svc-visual dk-svc-receipt" aria-hidden="true">
                <span className="dk-svc-ring" />
                <img src={receiptBuilderImg} alt="" />
              </div>
            </article>

            {/* Small: staff permissions */}
            <article className="dk-svc-card sm grey">
              <h3>Staff permissions carry over</h3>
              <p>Vendor staff inherit the permissions you already set in Dokan.</p>
              <div className="dk-svc-visual dk-svc-perms" aria-hidden="true">
                <div className="dk-perms-who">
                  <span className="dk-perms-av">MS</span>
                  <div><b>Maya</b><small>Vendor staff</small></div>
                  <span className="dk-perms-src">From Dokan</span>
                </div>
                <ul>
                  <li>Sell at the counter<span className="dk-toggle on" /></li>
                  <li>Apply discounts<span className="dk-toggle on" /></li>
                  <li>Issue refunds<span className="dk-toggle" /></li>
                </ul>
              </div>
            </article>

            {/* Small: clear at the counter */}
            <article className="dk-svc-card sm grey">
              <h3>Clear at the counter</h3>
              <p>The POS header shows the counter, outlet and vendor at a glance.</p>
              <div className="dk-svc-visual dk-svc-posbar" aria-hidden="true">
                <div className="dk-posbar-top">
                  <span className="dk-posbar-name">Register</span>
                  <span className="dk-posbar-live"><i />Online</span>
                </div>
                <div className="dk-posbar-items">
                  <div><small>Counter</small><b>#2</b></div>
                  <div><small>Outlet</small><b>Main St</b></div>
                  <div><small>Vendor</small><b>Vendor A</b></div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ── 4. How it works ── */}
        <section className="dk-how" id="how" data-screen-label="How it works">
         <div className="dk-wrap">
          <div className="dk-head center dk-reveal">
            <span className="dk-mono-tag">How it works</span>
            <h2>Live at your vendors' counters in three steps</h2>
          </div>
          <div className="dk-steps-wrap">
            {/* Hand-drawn arrows linking the cards */}
            <svg className="dk-steps-arrow top" width="92" height="44" viewBox="0 0 92 44" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 38C12 16 36 4 82 15" />
              <path d="M70 6l13 9-12 8" />
            </svg>
            <svg className="dk-steps-arrow bottom" width="92" height="44" viewBox="0 0 92 44" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 6c10 24 38 34 78 22" />
              <path d="M70 20l13 8-12 9" />
            </svg>
            <ol className="dk-steps dk-stagger">
              {STEPS.map((s, i) => (
                <li className="dk-step" key={s.title}>
                  <div className="dk-step-card">
                    <span className="dk-step-num">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{s.title}</h3>
                    <div className="st-art"><img src={STEP_ARTS[i]} alt="" width="760" height="572" loading="lazy" /></div>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
         </div>
        </section>

        {/* ── 5. Control ── */}
        <ControlTabs />

        {/* ── 6. WooCommerce ── */}
        <WooCarousel />

        {/* ── 7. Lifetime pricing ── */}
        <section className="dk-pricing" id="pricing" data-screen-label="Lifetime pricing">
          <div className="dk-wrap">
            <SectionHead
              title="Pay once. Run your counters for life."
              lead="Every lifetime plan includes every feature. Pick by how many sites you run." />
            <div className="dk-plans dk-stagger">
              {PLANS.map((p) => (
                <div className={"dk-plan" + (p.feat ? " feat" : "")} key={p.name}>
                  {p.badge && <span className={"dk-plan-badge " + p.badgeType}>{p.badge}</span>}
                  <div className="dk-plan-head">
                    <h3>{p.name}</h3>
                    <span className="dk-plan-sites">{p.sites}</span>
                  </div>
                  <div className="dk-plan-price">
                    <span className="num">{p.price}</span>
                    <span className="per">one-time</span>
                  </div>
                  <div className="dk-plan-was">
                    <s>{p.was}</s>
                    <span className="dk-chip">50% OFF</span>
                  </div>
                  <a className="dk-plan-btn roll-btn" href="#">
                    <RollText>Buy Now</RollText> <RollIcon><Icon.ArrowRight size={16} /></RollIcon>
                  </a>
                </div>
              ))}
            </div>
            {/* ── 8. Includes + guarantee footer ── */}
            <div className="dk-plan-foot dk-reveal">
              <div className="dk-plan-inc">
                <b>All plans include</b>
                {PLAN_INCLUDES.map((x) => <span key={x}><MarkYes />{x}</span>)}
              </div>
              <div className="dk-plan-guar">
                <div className="dk-plan-seal" aria-hidden="true"><b>14</b><small>DAYS</small></div>
                <div>
                  <h3>Try it for 14 days, risk free</h3>
                  <p>If wePOS isn't right for your marketplace, ask for a refund within 14 days. No questions asked.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. FAQ ── */}
        <section className="dk-wrap" data-screen-label="FAQ">
          <div className="dk-faq-head dk-reveal">
            <h2>Have Questions?</h2>
            <p>We're here to help you understand every part of wePOS for Dokan. Reach out to us, and let's talk about how it fits your marketplace's needs.</p>
          </div>
          <div className="dk-faq dk-reveal">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div className={"dk-faq-item" + (isOpen ? " open" : "")} key={item.q}>
                  <button type="button" className="dk-faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                    <span>{item.q}</span>
                    <span className="dk-faq-x" aria-hidden="true" />
                  </button>
                  <div className="dk-faq-a">
                    <div className="dk-faq-a-inner"><p>{item.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="dk-faq-cta dk-reveal">
            <a className="dk-ask" href="faq.html">
              Ask Question
              <span className="dk-ask-faces" aria-hidden="true">
                <img src={avatarAImg} alt="" />
                <img src={avatarBImg} alt="" />
              </span>
            </a>
          </div>
        </section>

        {/* ── 10. Final CTA (Dokan CTA pattern: purple band, copy left, screenshot bottom-right) ── */}
        <section className="dk-cta" data-screen-label="Final CTA">
          <div className="dk-cta-band dk-reveal">
            <svg className="dk-cta-waves" preserveAspectRatio="none" viewBox="0 0 1000 500" fill="none" stroke="#FFFFFF" strokeWidth="2" aria-hidden="true">
              <path d="M-40 430 C 240 340 620 380 1050 210" /><path d="M-40 500 C 280 410 640 440 1050 300" />
              <path d="M-40 360 C 240 280 620 320 1050 140" /><path d="M-40 290 C 240 220 620 260 1050 80" />
            </svg>
            <div className="dk-cta-copy">
              <div className="dk-cta-copy-top">
                <h2>Bring Your Marketplace To The Counter</h2>
                <p>Give every Dokan vendor a POS that syncs with your store. Pay once and keep it for life.</p>
              </div>
              <a href="#pricing" className="dk-cta-btn roll-btn">
                <RollText>Get Lifetime Access</RollText>
                <span className="circle"><RollIcon fill><Icon.ArrowRight size={22} /></RollIcon></span>
              </a>
            </div>
            <div className="dk-cta-art">
              <img src={dashboardImg} width="3024" height="1590" alt="wePOS vendor dashboard inside Dokan" loading="lazy" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<WePOSForDokan />);
