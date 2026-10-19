import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Icon } from "../components/icons.jsx";
import { DokanFooter } from "../components/dokan-footer.jsx";
import { SiteHeader } from "../components/shell.jsx";
import "../styles/site.css";
import "../styles/blog.css";

const CATS = ["All", "Product", "Tutorials", "Retail", "WooCommerce", "Company"];
const GRAD = ["linear-gradient(135deg,#10B981,#0891B2)","linear-gradient(135deg,#F59E0B,#DC2626)","linear-gradient(135deg,#765FF0,#2A5AFA)","linear-gradient(135deg,#EC4899,#8B5CF6)","linear-gradient(135deg,#0EA5E9,#6366F1)","linear-gradient(135deg,#14B8A6,#22C55E)"];
const POSTS = [
  { tag: "Product", title: "Introducing multi-outlet reporting in wePOS", excerpt: "See sales across every counter and location in one dashboard — with filters retailers actually use.", date: "May 28, 2026", read: "5 min read", g: 2 },
  { tag: "Tutorials", title: "Set up a barcode scanner in under 5 minutes", excerpt: "A step-by-step guide to connecting popular USB and Bluetooth scanners to your POS.", date: "May 21, 2026", read: "4 min read", g: 0 },
  { tag: "Retail", title: "7 checkout habits that speed up your busiest hours", excerpt: "Small workflow tweaks that shave seconds off every sale when the queue is long.", date: "May 14, 2026", read: "6 min read", g: 1 },
  { tag: "WooCommerce", title: "Keeping POS and online stock perfectly in sync", excerpt: "How wePOS mirrors your WooCommerce inventory in real time, and what to watch for.", date: "May 7, 2026", read: "7 min read", g: 4 },
  { tag: "Company", title: "What's new in wePOS — spring 2026 roundup", excerpt: "Receipt builder, dark mode, and a faster cashier screen. Here's everything we shipped.", date: "Apr 30, 2026", read: "3 min read", g: 3 },
  { tag: "Tutorials", title: "White-label your receipts for every vendor", excerpt: "Make each marketplace vendor's receipt feel like their own brand, end to end.", date: "Apr 23, 2026", read: "5 min read", g: 5 },
];
function Blog() {
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? POSTS : POSTS.filter(p => p.tag === cat);
  return (<>
    <SiteHeader active="resource" />
    <section className="page-hero">
      <span className="page-eyebrow">BLOG</span>
      <h1 className="page-h1">Guides, updates, and growth tips</h1>
      <p className="page-sub">Practical advice for running a faster counter and a smarter store — straight from the wePOS team.</p>
    </section>
    <section className="section">
      <div className="blog-featured">
        <div className="blog-featured-img" style={{ background: GRAD[2] }}><span className="tag">FEATURED</span></div>
        <div className="blog-featured-body">
          <div className="blog-meta"><span>Product</span><span className="dot"></span><span>May 28, 2026</span><span className="dot"></span><span>5 min read</span></div>
          <h2 className="blog-featured-title">Introducing multi-outlet reporting in wePOS</h2>
          <p className="blog-featured-excerpt">See sales across every counter and location in one dashboard — with the filters retailers actually use, plus CSV export and printable summaries.</p>
          <a className="blog-read" href="#">Read article <Icon.ArrowRight size={16} stroke="currentColor" /></a>
        </div>
      </div>
      <div className="blog-cats">
        {CATS.map(c => <span key={c} className={`blog-cat ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</span>)}
      </div>
      <div className="blog-grid">
        {shown.map((p, i) => (
          <a className="blog-card" href="#" key={i}>
            <div className="blog-card-img" style={{ background: GRAD[p.g] }}><span className="tag">{p.tag}</span></div>
            <div className="blog-card-body">
              <h3 className="blog-card-title">{p.title}</h3>
              <p className="blog-card-excerpt">{p.excerpt}</p>
              <div className="blog-card-foot"><span>{p.date}</span><span className="dot" style={{width:4,height:4,borderRadius:999,background:'var(--c-slate-300)'}}></span><span>{p.read}</span></div>
            </div>
          </a>
        ))}
      </div>
    </section>
    <DokanFooter />
  </>);
}
ReactDOM.createRoot(document.getElementById("app")).render(<Blog />);
  