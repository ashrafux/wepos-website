import React from "react";
import dokanLogoImg from "../assets/Dokan Logo menu.svg";
import weposLogoImg from "../assets/Lite Logo.svg";
import "../styles/brand.css";

/* Header logos: Dokan mark | wePOS wordmark (light-background version) */
function NavBrand() {
  return (
    <div className="nav-left">
      <a href="index.html" className="nav-brand-mark">
        <img src={dokanLogoImg} width="52" height="52" alt="Dokan" />
      </a>
      <div className="nav-divider" />
      <a href="index.html" className="nav-brand-wordmark">
        <img src={weposLogoImg} width="96" height="42" alt="wePOS" />
      </a>
    </div>
  );
}

export { NavBrand };
