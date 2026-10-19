import React from "react";
import ReactDOM from "react-dom/client";
import { RollText, RollIcon } from "../components/roll.jsx";
import { Icon } from "../components/icons.jsx";
import { DokanFooter } from "../components/dokan-footer.jsx";
import { SiteHeader } from "../components/shell.jsx";
import "../styles/site.css";
import "../styles/docs.css";
import { useScrollReveal } from "../components/scroll-reveal.js";

const SECTIONS = [
  { icon: "Cart", title: "Getting Started", desc: "Install wePOS and make your first sale.", links: ["Install & activate", "Open your first counter", "Process a sale", "Cashier basics"] },
  { icon: "Building", title: "Outlets & Counters", desc: "Set up locations, counters, and cashiers.", links: ["Create an outlet", "Add counters", "Assign cashiers", "Permissions & roles"] },
  { icon: "Tag", title: "Products & Inventory", desc: "Sync your catalog and manage stock.", links: ["Sync from WooCommerce", "Barcode scanning", "Fractional quantities", "Low-stock alerts"] },
  { icon: "Printer", title: "Receipts & Printing", desc: "Customize and print receipts reliably.", links: ["Receipt builder", "White-label invoices", "Connect a printer", "Tax & shipping lines"] },
  { icon: "Settings", title: "Payments & Checkout", desc: "Configure gateways and taxes.", links: ["Payment gateways", "Tax settings", "Discounts", "Multiple carts"] },
  { icon: "Code", title: "Developer", desc: "Extend wePOS with hooks and the REST API.", links: ["Extension points", "REST API reference", "Webhooks", "Custom panels"] },
];
function Docs() {
  useScrollReveal();
  return (<>
    <SiteHeader active="resource" />
    <section className="page-hero">
      <span className="page-eyebrow">DOCUMENTATION</span>
      <h1 className="page-h1">Setup, configuration, and reference</h1>
      <p className="page-sub">Everything you need to install, configure, and extend wePOS — organized by topic.</p>
      <div className="docs-search">
        <span className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
        <input type="text" placeholder="Search the docs…" />
      </div>
    </section>
    <section className="section">
      <div className="docs-grid">
        {SECTIONS.map((s, i) => (
          <div className="docs-card" key={i}>
            <div className="docs-card-icon">{React.createElement(Icon[s.icon] || Icon.Doc, { size: 24 })}</div>
            <h3 className="docs-card-title">{s.title}</h3>
            <p className="docs-card-desc">{s.desc}</p>
            <div className="docs-links">
              {s.links.map(l => <a href="#" key={l}>{l}<span className="ar"><Icon.ArrowRight size={14} stroke="currentColor" /></span></a>)}
            </div>
          </div>
        ))}
      </div>
      <div className="docs-cta">
        <div>
          <h3>Can't find what you need?</h3>
          <p>Our support team is online 24/7 and happy to help.</p>
        </div>
        <a className="ds-btn with-arrow ds-btn-primary roll-btn" href="#"><RollText>Contact Support</RollText> <span className="ds-circle"><RollIcon fill><Icon.ArrowRight size={23} stroke="currentColor" /></RollIcon></span></a>
      </div>
    </section>
    <DokanFooter />
  </>);
}
ReactDOM.createRoot(document.getElementById("app")).render(<Docs />);
  