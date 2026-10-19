import React from "react";
import ReactDOM from "react-dom/client";
import { DokanFooter } from "../components/dokan-footer.jsx";
import { Header, Hero, EverythingSection, DokanSection, GlanceSection, Testimonials, CtaPair } from "../components/sections.jsx";
import cashierImg from "../assets/cashier.jpg";
import vendorAdminImg from "../assets/vendor-admin.jpg";
import avatar1Img from "../assets/avatar-1.png";
import avatar2Img from "../assets/avatar-2.jpg";
import avatar3Img from "../assets/avatar-3.jpg";
import testimonialNinzasImg from "../assets/testimonial-ninzas.png";
import testimonialOursellingImg from "../assets/testimonial-ourselling.png";
import "../styles/home.css";

/* App entry — composes all sections with dynamic data */


const DATA = {
  nav: {
    items: [
      { label: "Features", href: "features.html" },
      { label: "For Dokan", href: "wepos-for-dokan.html" },
      { label: "Pricing", href: "pricing.html" },
      { label: "Try Demo", href: "try-demo.html" },
      { label: "Resource", dropdown: true },
    ],
    login: "Login",
    primary: "Get Dokan",
  },
  hero: {
    headline: [
      [
        { kind: "text", text: "One Pos." },
        { kind: "image", image: "pos", label: "POS terminal" },
      ],
      [
        { kind: "image", image: "store", label: "Storefront" },
        { kind: "text", text: "Every Store." },
      ],
      [
        { kind: "text", text: "Every" },
        { kind: "image", image: "vendor", label: "Vendor" },
        { kind: "text", text: "Vendor." },
      ],
    ],
    card: {
      tag: "#NEW_FEATURE",
      heading: "wePOS connects your physical counter",
      rows: [
        { name: "Cashier Profile", session: "Active Session", outlet: "OUTLET 1 / Main Register", avatar: cashierImg },
        { name: "Vendor Admin", session: "Dokan Sync", outlet: "VENDOR A / Independent POS", avatar: vendorAdminImg },
      ],
      description: "wePOS connects your physical counter to WooCommerce, and if you run a Dokan marketplace, every vendor gets their own fully independent POS.",
      primaryCta: "Get wePOS Now",
      secondaryCta: "Try the Demo",
    },
  },
  everything: {
    title: "Everything You Need at the Counter",
    lead: "A POS system that keeps up with your store, however busy, however complex.",
    features: [
      { title: "Speed at Every\nStep", body: "wePOS runs as a single-page application powered by the REST API. Searching products, adding items, and processing payments." },
      { title: "Outlet & Counter\nManagement", body: "Run unlimited outlets and counters at the same time. Assign dedicated cashiers to each counter and manage everything from one admin screen." },
      { title: "Multiple Live Carts", body: "Tab-style cart management lets you keep several customer transactions open simultaneously." },
      { title: "Your Theme Can't Break It", body: "wePOS keeps its own styling completely separate from your WordPress theme and other plugins." },
      { title: "Light, Dark & System Modes", body: "Switch between light, dark, or system-matched display with a smooth transition." },
    ],
    demo: {
      outlets: [
        { outlet: "Store", cashier: "Bob", status: "$120.00", active: true, avatar: avatar1Img },
        { outlet: "Kiosk 1", cashier: "Bob", status: "$0.00", active: false, avatar: avatar2Img },
      ],
      carts: [
        { name: "Customer 1", meta: "3 items \u2022 Cart", status: "Active", avatar: avatar2Img, muted: false },
        { name: "Customer 2", meta: "1 item \u2022 Hold", status: "12m ago", avatar: avatar3Img, muted: true },
      ],
    },
    modes: [
      { key: "light", cls: "light" },
      { key: "dark", cls: "dark" },
      { key: "auto", cls: "auto" },
    ],
  },
  dokan: {
    heading: "Built for Dokan\nMultivendor Marketplace",
    body: "If your store runs on Dokan, wePOS gives each vendor a fully independent counter. Vendor staff is automatically assigned the right access the moment they're added. No site admin involvement needed for daily sales.",
    cta: "See How It Works",
  },
  glance: {
    title: "wePOS at a Glance",
    cta: "Get wePOS Now",
    items: [
      { icon: "Filter", label: "Filter products by category" },
      { icon: "Barcode", label: "Barcode scanner support" },
      { icon: "Printer", label: "Print receipts" },
      { icon: "Tag", label: "White-label invoices" },
      { icon: "Percent", label: "Apply discounts" },
      { icon: "Calculator", label: "Tax calculated from store settings" },
      { icon: "Hash", label: "Fractional quantities" },
      { icon: "Cart", label: "Multiple live carts" },
      { icon: "UserGroup", label: "Capture customer data" },
      { icon: "Keyboard", label: "Keyboard shortcuts" },
      { icon: "Sun", label: "Light / Dark / System modes" },
      { icon: "Hardware", label: "Works with popular POS hardware" },
      { icon: "Bell", label: "Low-stock alerts" },
      { icon: "Save", label: "Save carts across devices" },
      { icon: "Download", label: "CSV export" },
    ],
  },
  testimonials: {
    title: "What Our\nUsers Say",
    hero: {
      quote: "This plugin is amazing! I have tested and worked with other POS plugins and I decided to keep using wePOS, it works great, has a bunch of features that others don't.",
      name: "ninzas",
      role: "VERIFIED USER",
      avatar: testimonialNinzasImg,
    },
    cards: [
      {
        text: "I was using a POS Plug-In that has been around a long time before trying this one. All I can say is WOW! Why in the world didn't I find wePOS sooner? I love it!",
        name: "thebarkacademy",
        role: "Verified User",
        avatar: testimonialNinzasImg,
      },
      {
        text: "Wonderful and excellent work and we hope to develop this project and it needs some additions to complete the points of sale in it — thanks, thanks, thanks.",
        name: "ourselling",
        role: "Verified User",
        avatar: testimonialOursellingImg,
      },
    ],
  },
  cta: {
    help: {
      title: "We're Here When\nYou Need Us",
      body: "Our support team is available 24/7. Tell us what's not working, what's missing, or what could be better. We test, fix, and ship. Your store shouldn't have to wait.",
      cta: "Contact Support",
    },
    ready: {
      title: "Ready to Bring Your\nWooCommerce Store/\nMarketplace to the Counter?",
      body: "wePOS is free to start and built to grow with your business.",
      primaryCta: "Get wePOS Now",
      secondaryCta: "Try Demo",
    },
  },
  footer: {
    about: ["About Us", "Brand Assets", "Changelog", "Contact Us", "Career"],
    useCases: ["Fashion", "Furniture", "Pets on demand", "Electronics", "Auction", "Booking", "View All"],
    demos: ["Dokan WordPress Plugin", "Dokan Mobile App", "Delivery Driver App", "OlaThuara"],
    columns: [
      { title: "Resources", items: ["Blogs", "Documentation", "FAQs", "Video Tutorials", "Webinars"], subTitle: "Policies", subItems: ["Privacy Policy", "Terms of Service", "Support Policy", "Affiliate Policy", "Refund Policy"] },
      { title: "Important Links", items: ["Modules", "Features", "Payment Integrations", "Compatible Plugins", "Compatible Themes", "Compare"], subTitle: "Support & Success Stories", subItems: ["Success Stories", "Testimonials", "Support"] },
      { title: "Solutions", items: ["Marketplaces Hosted by us", "eCommerce Shop Hosted by us", "Marketplace Hosted by us", "Mobile App", "Delivery Driver App", "OlaTheme", "Dokan Core", "wePOS", "StoreGrowth", "ecoLab"] },
      { title: "Partnership & Affiliate", items: ["Partner with Us", "Join Our Affiliate Program", "Affiliate Policy", "Affilery", "Software Program"], subTitle: "Guide to Build a Marketplace Like", subItems: ["Etsy", "Amazon", "eBay", "Aliexpress", "Airbnb", "More Examples"] },
    ],
  },
};

function App() {
  return (
    <>
      <Header navItems={DATA.nav.items} ctas={{ login: DATA.nav.login, primary: DATA.nav.primary }} />
      <Hero headline={DATA.hero.headline} card={DATA.hero.card} />
      <EverythingSection {...DATA.everything} />
      <DokanSection {...DATA.dokan} />
      <GlanceSection {...DATA.glance} />
      <Testimonials {...DATA.testimonials} />
      <CtaPair {...DATA.cta} />
      <DokanFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
