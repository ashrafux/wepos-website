import React from "react";
import { Icon } from "./icons.jsx";
import footerDokanLogoImg from "../assets/footer-dokan-logo.png";
import footerWedevsLogoImg from "../assets/footer-wedevs-logo.png";

/* Shared Dokan Plugin Footer — used on every page. New dark design. */

const DF_CSS = `
.df-footer{--df-purple:#7047EB;--df-purple-dark:#5B36D6;--df-divider:rgba(255,255,255,0.10);--df-muted:#6E6E78;width:100%;padding:144px 24px 37px;display:flex;justify-content:center;background:#0A0A0B;font-family:'Hanken Grotesk','Lato',-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased;color:#9C9CA4;}
.df-container{width:100%;max-width:1400px;}
.df-cols{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;}
.df-col{display:flex;flex-direction:column;}
.df-group{margin-top:52px;}
.df-group:first-child{margin-top:0;}
.df-group h3{font-family:'Poppins','Hanken Grotesk',sans-serif;font-size:18px;font-weight:600;color:#fff;line-height:1.3;margin:0 0 14px;letter-spacing:.1px;}
.df-links{display:flex;flex-direction:column;gap:0;}
.df-links a{position:relative;width:fit-content;color:rgba(255,255,255,0.6);text-decoration:none;font-family:'Lato','Hanken Grotesk',sans-serif;font-size:18px;font-weight:400;line-height:2;transition:color .22s ease,transform .22s ease;}
.df-links a::after{content:"";position:absolute;left:0;bottom:-3px;width:100%;height:1.5px;background:var(--df-purple);transform:scaleX(0);transform-origin:left;transition:transform .28s cubic-bezier(.2,.7,.3,1);}
.df-links a:hover{color:#fff;transform:translateX(5px);}
.df-links a:hover::after{transform:scaleX(1);}
.df-logo{display:flex;align-items:center;margin-bottom:41px;}
.df-logo img{height:46px;width:auto;display:block;}
.df-keep{margin-top:130px;display:flex;align-items:stretch;justify-content:space-between;gap:48px;flex-wrap:wrap;}
.df-keep-left{flex:1 1 461px;max-width:461px;}
.df-keep h2{font-family:'Poppins','Hanken Grotesk',sans-serif;font-size:24px;font-weight:600;line-height:1.3;color:#fff;margin:0 0 20px;}
.df-news{display:flex;align-items:center;width:100%;max-width:461px;height:66px;background:#fff;border-radius:85px;padding:8px 8px 8px 35px;box-shadow:0px 2px 5px rgba(0,0,0,0.06);transition:box-shadow .25s ease,transform .25s ease;}
.df-news:focus-within{box-shadow:0 0 0 3px rgba(112,71,235,0.30),0px 2px 5px rgba(0,0,0,0.06);transform:translateY(-2px);}
.df-news input{flex:1 1 auto;min-width:0;border:none;outline:none;background:transparent;font-family:'Lato','Hanken Grotesk',sans-serif;font-size:16px;line-height:1.5;color:#333;padding:0 12px 0 0;}
.df-news input::placeholder{color:#828282;}
.df-news button{flex:0 0 auto;width:133px;height:50px;border:none;cursor:pointer;font-family:'Lato','Hanken Grotesk',sans-serif;font-size:14px;font-weight:400;white-space:nowrap;color:#fff;background:#7047EB;border-radius:50px;display:flex;align-items:center;justify-content:center;transition:background .2s ease,transform .15s ease;}
.df-news button:hover{background:var(--df-purple-dark);transform:scale(1.04);}
.df-news button:active{transform:scale(0.98);}
.df-keep-right{display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;gap:28px;padding-top:4px;}
.df-socials{display:flex;gap:10.75px;}
.df-socials a{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;transition:transform .25s cubic-bezier(.2,.7,.3,1),box-shadow .25s ease,filter .25s ease;}
.df-socials a:hover{transform:translateY(-5px) scale(1.08);box-shadow:0 10px 22px rgba(0,0,0,0.4);filter:brightness(1.08);}
.df-socials svg{display:block;}
.df-s-fb{background:linear-gradient(180deg,#00B2FF,#006AFF);}
.df-s-x{background:#fff;}
.df-s-yt{background:#FF0000;}
.df-s-in{background:linear-gradient(135deg,#2489BE,#0575B3);}
.df-s-mu{background:#fff;}
.df-payments{display:flex;align-items:center;gap:18px;}
.df-payments .df-sep{width:1px;height:26px;background:rgba(255,255,255,0.18);}
.df-badge{display:inline-flex;align-items:center;gap:8px;transition:transform .2s ease,opacity .2s ease;opacity:.92;}
.df-badge:hover{transform:translateY(-2px);opacity:1;}
.df-badge.df-gdpr{background:linear-gradient(135deg,#3A2BD8,#5B36D6);border-radius:7px;padding:8px 12px;color:#fff;}
.df-badge.df-gdpr .df-stars{width:26px;height:26px;border-radius:50%;background:#1B1F9C;display:flex;align-items:center;justify-content:center;font-size:8px;color:#FFD43B;letter-spacing:-1px;}
.df-badge.df-gdpr .df-t{font-size:11px;font-weight:700;line-height:1.05;}
.df-badge .df-lbl{color:#C9C9D2;font-size:15px;font-weight:500;}
.df-badge .df-wm{font-size:19px;font-weight:700;letter-spacing:-0.02em;}
.df-badge .df-wm.df-stripe{color:#fff;}
.df-wm .df-paypal-a{color:#009CDE;}
.df-wm .df-paypal-b{color:#003087;}
.df-rule{border:0;border-top:1px solid var(--df-divider);margin:90px 0 37px;}
.df-bottom{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;}
.df-by{display:flex;align-items:center;gap:11px;color:var(--df-muted);font-size:16px;}
.df-by img{height:26px;width:auto;display:block;}
.df-copyright{color:#B5B5BE;font-size:16px;}
.df-lang{display:inline-flex;align-items:center;gap:9px;color:#C9C9D2;font-size:16px;cursor:pointer;padding:8px 12px;border-radius:8px;transition:background .2s ease,color .2s ease;}
.df-lang:hover{background:rgba(255,255,255,0.06);color:#fff;}
.df-lang svg{transition:transform .25s ease;}
.df-lang:hover svg{transform:translateY(2px);}
@media (max-width:1080px){.df-cols{grid-template-columns:repeat(2,1fr);gap:56px 40px;}}
@media (max-width:880px){.df-footer{padding:96px 24px;}.df-keep{margin-top:90px;flex-direction:column;align-items:stretch;}.df-keep-right{align-items:flex-start;}}
@media (max-width:560px){.df-footer{padding:72px 20px;}.df-cols{grid-template-columns:1fr;gap:48px;}.df-news{padding-left:22px;}.df-news button{padding:15px 22px;}.df-bottom{flex-direction:column;align-items:flex-start;gap:18px;}.df-payments{flex-wrap:wrap;}}
`;

const DF_COLUMNS = [
  [
    { items: ["About Us", "Brand Assets", "Changelog", "Contact Us", "Career"] },
    { title: "Use Cases", items: ["Fashion", "Furniture", "Print on demand", "Electronics", "Auction", "Booking", "View All"] },
    { title: "Demo's", items: ["Dokan WordPress Plugin", "Dokan Mobile App", "Delivery Driver App", "Otel Theme"] },
  ],
  [
    { title: "Resources", items: ["Blogs", "Documentation", "FAQs", "Video Tutorials", "Webinars"] },
    { title: "Policies", items: ["Privacy Policy", "Terms of Sevice", "Support Policy", "Affiliate Policy", "Refund Policy"] },
    { title: "Support &<br/>Success Stories", items: ["Success Stories", "Testimonials", "Support"] },
  ],
  [
    { title: "Important Links", items: ["Modules", "Features", "Payment Integrations", "Compatible Plugins", "Compatible Themes", "Compare"] },
    { title: "Solutions", items: ["Marketplace (Hosted by you)", "eCommerce Shop (Hosted by us)", "Marketplace (Hosted by us)", "Mobile App", "Delivery Driver App", "Otel Theme", "Dokan Care", "wePOS", "StoreGrowth", "weLab"] },
  ],
  [
    { title: "Partnership<br/>& Affiliate", items: ["Partner with Us", "Join Our Affiliate Program", "Affiliate Policy", "Affiliate", "Influencer Program"] },
    { title: "Guide to Build a<br/>Marketplace Like", items: ["Etsy", "Amazon", "eBay", "Alibaba", "Airbnb", "More Examples"] },
  ],
];

function DfGroup({ title, items }) {
  return (
    <div className="df-group">
      {title ? <h3 dangerouslySetInnerHTML={{ __html: title }} /> : null}
      <div className="df-links">{items.map((it) => <a href="#" key={it}>{it}</a>)}</div>
    </div>
  );
}

function DokanFooter() {
  return (
    <footer className="df-footer" data-screen-label="Footer">
      <style dangerouslySetInnerHTML={{ __html: DF_CSS }} />
      <div className="df-container">
        <div className="df-cols">
          <div className="df-col">
            <div className="df-logo">
              <img src={footerDokanLogoImg} alt="dokan" />
            </div>
            {DF_COLUMNS[0].map((g, i) => <DfGroup key={i} {...g} />)}
          </div>
          {DF_COLUMNS.slice(1).map((groups, c) => (
            <div className="df-col" key={c}>
              {groups.map((g, i) => <DfGroup key={i} {...g} />)}
            </div>
          ))}
        </div>

        <div className="df-keep">
          <div className="df-keep-left">
            <h2>Keep Updated</h2>
            <form className="df-news" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" aria-label="Your email address" />
              <button type="submit">Stay Updated</button>
            </form>
          </div>

          <div className="df-keep-right">
            <div className="df-socials">
              <a className="df-s-fb" href="#" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff"><path d="M14 8.5h2.5V5.5H14c-2 0-3.5 1.5-3.5 3.6v1.9H8.5v3h2V21h3v-6.9h2.3l.4-3H13.5V9.3c0-.5.3-.8.5-.8z" /></svg>
              </a>
              <a className="df-s-x" href="#" aria-label="X">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#000"><path d="M18 3h3l-7 8 8 10h-6l-5-6-5 6H3l8-9L3 3h6l4 5z" /></svg>
              </a>
              <a className="df-s-yt" href="#" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M21.5 8.2c-.2-1-.9-1.7-1.9-1.9C17.8 6 12 6 12 6s-5.8 0-7.6.3c-1 .2-1.7.9-1.9 1.9C2.2 10 2.2 12 2.2 12s0 2 .3 3.8c.2 1 .9 1.7 1.9 1.9C6.2 18 12 18 12 18s5.8 0 7.6-.3c1-.2 1.7-.9 1.9-1.9.3-1.8.3-3.8.3-3.8s0-2-.3-3.8zM9.8 15.3v-6.6l5.7 3.3z" /></svg>
              </a>
              <a className="df-s-in" href="#" aria-label="LinkedIn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff"><path d="M6.5 8.5h-3V20h3zM5 4.2c-1 0-1.7.7-1.7 1.6S4 7.5 5 7.5s1.7-.7 1.7-1.7S6 4.2 5 4.2zM20.5 20v-6.3c0-3-1.6-4.4-3.8-4.4-1.7 0-2.5.9-2.9 1.6V8.5h-3V20h3v-6c0-1.4.8-2.1 1.8-2.1s1.6.7 1.6 2.1V20z" /></svg>
              </a>
              <a className="df-s-mu" href="#" aria-label="Medium">
                <svg width="22" height="14" viewBox="0 0 44 24" fill="#000"><ellipse cx="10" cy="12" rx="9.5" ry="9" /><ellipse cx="26.5" cy="12" rx="3.4" ry="8.4" /><ellipse cx="37" cy="12" rx="1.5" ry="7.6" /></svg>
              </a>
            </div>

            <div className="df-payments">
              <div className="df-badge df-gdpr">
                <span className="df-stars">★</span>
                <span className="df-t">GDPR<br/>COMPLIANT</span>
              </div>
              <span className="df-sep" />
              <div className="df-badge">
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none"><path d="M11 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" fill="#1E7F46" /><path d="M7.5 12l2.5 2.5L15 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="df-lbl">Secure Payment</span>
              </div>
              <span className="df-sep" />
              <div className="df-badge"><span className="df-wm df-stripe">stripe</span></div>
              <span className="df-sep" />
              <div className="df-badge"><span className="df-wm"><span className="df-paypal-a">Pay</span><span className="df-paypal-b">Pal</span></span></div>
            </div>
          </div>
        </div>

        <hr className="df-rule" />

        <div className="df-bottom">
          <div className="df-by">
            <span>A</span>
            <img src={footerWedevsLogoImg} alt="weDevs" />
            <span>Product</span>
          </div>
          <div className="df-copyright">© 2025, Dokan. All Rights Reserved.</div>
          <div className="df-lang">
            English
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

const RESOURCE_LINKS = [
  {
    title: "Blog",
    desc: "Guides, updates, and growth tips.",
    href: "blog.html",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h11a2 2 0 0 1 2 2v14a1 1 0 0 1-1 1H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M17 7h2a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3" />
        <line x1="6" y1="8" x2="13" y2="8" /><line x1="6" y1="12" x2="13" y2="12" /><line x1="6" y1="16" x2="10" y2="16" />
      </svg>
    ),
  },
  {
    title: "Docs",
    desc: "Setup, configuration, and reference.",
    href: "docs.html",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" /><line x1="8" y1="9" x2="10" y2="9" />
      </svg>
    ),
  },
  {
    title: "FAQ",
    desc: "Quick answers to common questions.",
    href: "faq.html",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: "About Us",
    desc: "Our mission and the team behind wePOS.",
    href: "about.html",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

function ResourceMenu({ active }) {
  return (
    <div className="nav-mega">
      <a className={`nav-link nav-mega-trigger ${active ? "active" : ""}`} href="#" onClick={(e) => e.preventDefault()}>
        Resource
        <span className="nav-mega-chev"><Icon.ChevDown /></span>
      </a>
      <div className="nav-mega-panel">
        <div className="nav-mega-arrow" />
        <div className="nav-mega-grid">
          {RESOURCE_LINKS.map((l) => (
            <a className="nav-mega-item" href={l.href} key={l.title}>
              <span className="nav-mega-icon">{l.icon}</span>
              <span className="nav-mega-text">
                <span className="nav-mega-title">{l.title}</span>
                <span className="nav-mega-desc">{l.desc}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export { DokanFooter, ResourceMenu, RESOURCE_LINKS };
