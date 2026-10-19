import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RollText, RollIcon } from "../components/roll.jsx";
import { Icon } from "../components/icons.jsx";
import { DokanFooter } from "../components/dokan-footer.jsx";
import { SiteHeader } from "../components/shell.jsx";
import "../styles/site.css";
import "../styles/faq.css";

const GROUPS = [
  { cat: "General", qa: [
    { q: "What is wePOS?", a: "wePOS is a point-of-sale system that runs on top of your WooCommerce store. It connects your physical counter to your online catalog, orders, and inventory — no separate database or data migration required." },
    { q: "Do I need WooCommerce to use wePOS?", a: "Yes. wePOS is built natively on WooCommerce and uses its products, orders, tax, and currency settings. If you run a Dokan marketplace, each vendor also gets their own independent POS." },
    { q: "Is there a free version?", a: "wePOS is free to start with all the essentials for a single counter. Pro unlocks reporting, low-stock alerts, granular cashier permissions, and more." },
  ]},
  { cat: "Setup & Hardware", qa: [
    { q: "Which barcode scanners are supported?", a: "Most USB and Bluetooth scanners that act as keyboard input work out of the box — just plug in and scan. See the Docs for a tested-hardware list." },
    { q: "Can I connect a receipt printer?", a: "Yes. wePOS renders receipts fully before sending them to the printer, so you won't get blank pages. Both thermal and standard printers are supported." },
    { q: "Does it work offline?", a: "wePOS needs a connection to sync with WooCommerce, but the single-page cashier screen stays fast and responsive even on modest hardware." },
  ]},
  { cat: "Billing & Plans", qa: [
    { q: "How does Pro licensing work?", a: "Pro is a yearly license tied to your site. It includes updates and 24/7 support for the license term, and you can upgrade or downgrade anytime." },
    { q: "Can I get a refund?", a: "Yes — we offer a money-back guarantee within the refund window stated in our Refund Policy. Reach out to support and we'll take care of it." },
  ]},
  { cat: "Vendors & Marketplace", qa: [
    { q: "How does wePOS work with Dokan?", a: "Every vendor on your Dokan marketplace gets a fully independent POS with isolated data. Vendor staff are automatically assigned the right access the moment they're added — no site-admin involvement needed for daily sales." },
    { q: "Can each vendor customize their receipts?", a: "Yes, on Pro. Vendors can white-label invoices, set their own tax and currency, and tailor receipt fields per store." },
  ]},
];
function FAQ() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState("0-0");
  const g = GROUPS[active];
  return (<>
    <SiteHeader active="resource" />
    <section className="page-hero">
      <span className="page-eyebrow">FAQ</span>
      <h1 className="page-h1">Quick answers to common questions</h1>
      <p className="page-sub">Everything you might wonder about wePOS — setup, hardware, billing, and marketplaces.</p>
    </section>
    <section className="section">
      <div className="faq-layout">
        <div className="faq-side">
          {GROUPS.map((grp, i) => (
            <button key={grp.cat} className={active === i ? "active" : ""} onClick={() => { setActive(i); setOpen(i + "-0"); }}>{grp.cat}</button>
          ))}
        </div>
        <div>
          <h2 className="faq-cat-title">{g.cat}</h2>
          <div className="faq-list">
            {g.qa.map((item, j) => {
              const id = active + "-" + j;
              const isOpen = open === id;
              return (
                <div className={`faq-item ${isOpen ? "open" : ""}`} key={id}>
                  <button className="faq-q" onClick={() => setOpen(isOpen ? null : id)}>
                    {item.q}
                    <span className="ic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                  </button>
                  <div className="faq-a" style={{ maxHeight: isOpen ? "280px" : "0" }}>
                    <div className="faq-a-inner">{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="faq-help">
        <h3>Still have questions?</h3>
        <p>Our support team replies around the clock.</p>
        <a className="ds-btn with-arrow ds-btn-primary roll-btn" href="#" style={{ display: "inline-flex" }}><RollText>Contact Support</RollText> <span className="ds-circle"><RollIcon fill><Icon.ArrowRight size={23} stroke="currentColor" /></RollIcon></span></a>
      </div>
    </section>
    <DokanFooter />
  </>);
}
ReactDOM.createRoot(document.getElementById("app")).render(<FAQ />);
  