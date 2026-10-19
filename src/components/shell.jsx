import React from "react";
import { RollText, RollIcon } from "./roll.jsx";
import { ResourceMenu } from "./dokan-footer.jsx";
import { NavBrand } from "./brand.jsx";

/* Shared site header + page footer wrapper for Resource pages */

function SiteHeader({ active }) {
  const items = [
    { label: "Features", href: "features.html", key: "features" },
    { label: "For Dokan", href: "wepos-for-dokan.html", key: "dokan" },
    { label: "Pricing", href: "pricing.html", key: "pricing" },
    { label: "Try Demo", href: "try-demo.html", key: "demo" },
    { label: "Resource", dropdown: true, key: "resource" },
  ];
  return (
    <header className="nav">
      <NavBrand />
      <nav className="nav-center">
        {items.map((it) => (
          it.dropdown
            ? <ResourceMenu key={it.label} active={active === it.key} />
            : <a key={it.label} className={`nav-link ${active === it.key ? "active" : ""}`} href={it.href}>{it.label}</a>
        ))}
      </nav>
      <div className="nav-right">
        <a className="nav-link" href="#">Login</a>
        <button className="ds-btn-small roll-btn"><RollText>Get Dokan</RollText></button>
      </div>
    </header>
  );
}

export { SiteHeader };
