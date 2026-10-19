import React from "react";
import logoImg from "../assets/site-footer/dokan-logo-footer.svg";
import wordmarkImg from "../assets/site-footer/wordmark.svg";
import wedevsImg from "../assets/site-footer/wedevs-logo.png";
import paymentsImg from "../assets/site-footer/payments.png";
import fbImg from "../assets/site-footer/social-facebook.png";
import xImg from "../assets/site-footer/social-x.png";
import ytImg from "../assets/site-footer/social-youtube.png";
import inImg from "../assets/site-footer/social-linkedin.png";
import mediumImg from "../assets/site-footer/social-medium.png";
import "../styles/site-footer.css";

/* Dokan marketing-site footer (from dokan-footer.zip). Styles are scoped to
   .site-footer / .sf-*. Links without a page on this site stay "#". */

const L = (label, href = "#") => ({ label, href });

const COLUMNS = [
  [
    { title: null, links: [L("About Us", "about.html"), L("Brand Assets"), L("Changelog"), L("Contact Us"), L("Career")] },
    { title: "Use Cases", links: [L("Fashion"), L("Furniture"), L("Print on demand"), L("Electronics"), L("Auction"), L("Booking"), L("View All")] },
    { title: "Demo's", links: [L("Dokan WordPress Plugin"), L("Dokan Mobile App"), L("Delivery Driver App"), L("Otel Theme")] },
  ],
  [
    { title: "Resources", links: [L("Blogs", "blog.html"), L("Documentation", "docs.html"), L("FAQs", "faq.html"), L("Video Tutorials"), L("Webinars")] },
    { title: "Policies", links: [L("Privacy Policy"), L("Terms of Service"), L("Support Policy"), L("Affiliate Policy"), L("Refund Policy")] },
    { title: <>Support &amp;<br />Success Stories</>, links: [L("Success Stories"), L("Testimonials"), L("Support")] },
  ],
  [
    { title: "Important Links", links: [L("Modules"), L("Features", "features.html"), L("Payment Integrations"), L("Compatible Plugins"), L("Compatible Themes"), L("Compare")] },
    { title: "Solutions", links: [L("Marketplace (Hosted by you)"), L("eCommerce Shop (Hosted by us)"), L("Marketplace (Hosted by us)"), L("Mobile App"), L("Delivery Driver App"), L("Otel Theme"), L("Dokan Care"), L("wePOS", "index.html"), L("StoreGrowth"), L("weLab")] },
  ],
  [
    { title: <>Partnership<br />&amp; Affiliate</>, links: [L("Partner with Us"), L("Join Our Affiliate Program"), L("Affiliate Policy"), L("Affiliate"), L("Influencer Program")] },
    { title: <>Guide to Build a<br />Marketplace Like</>, links: [L("Etsy"), L("Amazon"), L("eBay"), L("Alibaba"), L("Airbnb"), L("More Examples")] },
  ],
];

const SOCIALS = [
  { img: fbImg, label: "Dokan on Facebook" },
  { img: xImg, label: "Dokan on X (Twitter)" },
  { img: ytImg, label: "Dokan on YouTube" },
  { img: inImg, label: "Dokan on LinkedIn" },
  { img: mediumImg, label: "Dokan on Medium" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" data-screen-label="Footer">
      <div className="sf-wrap sf-inner">
        <div className="sf-grid">
          {COLUMNS.map((groups, ci) => (
            <div className="sf-col" key={ci}>
              {ci === 0 && (
                <a href="#" className="sf-logo"><img src={logoImg} alt="Dokan" width="139" height="38" /></a>
              )}
              {groups.map((g, gi) => (
                <React.Fragment key={gi}>
                  {g.title && <h5 className="sf-h">{g.title}</h5>}
                  <ul className="sf-links">
                    {g.links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
                  </ul>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>

        <div className="sf-news">
          <div>
            <h5 className="sf-news-title">Keep Updated</h5>
            <div className="sf-ring">
              <form className="sf-form" onSubmit={(e) => e.preventDefault()} aria-label="Newsletter">
                <label className="sr-only" htmlFor="sf-email">Email address</label>
                <input id="sf-email" type="email" placeholder="Enter your email..." autoComplete="email" />
                <button type="submit">Stay Updated</button>
              </form>
            </div>
          </div>
          <div className="sf-trust">
            <div className="sf-social">
              {SOCIALS.map((s) => (
                <a href="#" aria-label={s.label} key={s.label}><img src={s.img} alt="" width="41" height="41" loading="lazy" /></a>
              ))}
            </div>
            <img className="sf-pay" src={paymentsImg} alt="GDPR compliant, secure payment with Stripe and PayPal" width="384" height="32" loading="lazy" />
          </div>
        </div>

        <img className="sf-wordmark" src={wordmarkImg} alt="" aria-hidden="true" />

        <div className="sf-bottom">
          <span className="sf-by">A <img src={wedevsImg} alt="weDevs" width="136" height="30" loading="lazy" /> Product</span>
          <span className="sf-copy">&copy; {new Date().getFullYear()}, Dokan. All Rights Reserved.</span>
          <button type="button" className="sf-lang">
            English
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
