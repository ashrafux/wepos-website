import React from "react";
import ReactDOM from "react-dom/client";
import { RollText, RollIcon } from "../components/roll.jsx";
import { Icon } from "../components/icons.jsx";
import { DokanFooter } from "../components/dokan-footer.jsx";
import { SiteHeader } from "../components/shell.jsx";
import "../styles/site.css";
import "../styles/about.css";

const STATS = [
  { n: "60K+", l: "Active stores" },
  { n: "12M+", l: "Sales processed" },
  { n: "150+", l: "Countries" },
  { n: "4.8★", l: "Average rating" },
];
const VALUES = [
  { icon: "Cart", title: "Built for the counter", desc: "Every decision starts with the cashier — speed, clarity, and zero friction at checkout." },
  { icon: "UserGroup", title: "Merchant-first", desc: "We build what store owners actually ask for, and ship fixes fast when something breaks." },
  { icon: "Settings", title: "Open by design", desc: "Native to WooCommerce and extensible everywhere — your stack stays yours." },
];
const TEAM = [
  { name: "Nizam U.", role: "Founder & CEO", g: "linear-gradient(135deg,#765FF0,#2A5AFA)", i: "NU" },
  { name: "Sarah K.", role: "Head of Product", g: "linear-gradient(135deg,#EC4899,#8B5CF6)", i: "SK" },
  { name: "Diego M.", role: "Lead Engineer", g: "linear-gradient(135deg,#10B981,#0891B2)", i: "DM" },
  { name: "Aiko T.", role: "Customer Success", g: "linear-gradient(135deg,#F59E0B,#DC2626)", i: "AT" },
];
function About() {
  return (<>
    <SiteHeader active="resource" />
    <section className="page-hero">
      <span className="page-eyebrow">ABOUT US</span>
      <h1 className="page-h1">Our mission and the team behind wePOS</h1>
      <p className="page-sub">We're on a mission to give every WooCommerce store a counter that's as fast and reliable as the web store behind it.</p>
      <div className="about-stats">
        {STATS.map((s, i) => (
          <div className="about-stat" key={i}>
            <div className="about-stat-num">{s.n}</div>
            <div className="about-stat-label">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
    <section className="section">
      <div className="about-mission">
        <div>
          <h2>Started by retailers, built for retailers</h2>
          <p>wePOS began at weDevs when our own merchants told us the same thing: their online store was modern, but the counter was stuck in the past. Separate systems, mismatched stock, clunky receipts.</p>
          <p>So we built a POS that lives inside WooCommerce — no migrations, no parallel database, no surprises. Today it powers counters in stores and marketplaces around the world.</p>
        </div>
        <div className="about-mission-img">
          <div className="glyph"><svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div>
        </div>
      </div>
      <div className="about-values">
        <div className="about-values-head">
          <h2 className="section-title" style={{ textAlign: "center" }}>What we believe</h2>
          <p>The principles that shape every release.</p>
        </div>
        <div className="values-grid">
          {VALUES.map((v, i) => (
            <div className="value-card" key={i}>
              <div className="value-icon">{React.createElement(Icon[v.icon] || Icon.Check, { size: 24 })}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="about-team">
        <h2 className="section-title" style={{ textAlign: "center" }}>The people behind wePOS</h2>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <div className="team-card" key={i}>
              <div className="team-av" style={{ background: m.g }}>{m.i}</div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="about-cta">
        <div className="about-cta-inner">
          <h2>Ready to bring your store to the counter?</h2>
          <a className="ds-btn with-arrow ds-btn-primary roll-btn" href="#" style={{ display: "inline-flex" }}><RollText>Get wePOS Now</RollText> <span className="ds-circle"><RollIcon fill><Icon.ArrowRight size={23} stroke="currentColor" /></RollIcon></span></a>
        </div>
      </div>
    </section>
    <DokanFooter />
  </>);
}
ReactDOM.createRoot(document.getElementById("app")).render(<About />);
  