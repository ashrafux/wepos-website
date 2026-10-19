import React, { useState } from "react";
import { RollText, RollIcon } from "./roll.jsx";
import { Icon } from "./icons.jsx";
import { ResourceMenu } from "./dokan-footer.jsx";
import speedometerImg from "../assets/speedometer.png";
import shieldImg from "../assets/shield.png";
import { NavBrand } from "./brand.jsx";

/* Page sections — Nav, Hero, Everything, Dokan, Glance, Testimonials, CTA pair, Footer */


/* ───────── HEADER ───────── */
function Header({ navItems, ctas }) {
  return (
    <header className="nav">
      <NavBrand />

      <nav className="nav-center">
        {navItems.map((item) => (
          item.dropdown
            ? <ResourceMenu key={item.label} />
            : <a key={item.label} className="nav-link" href={item.href || "#"}>
                {item.label}
              </a>
        ))}
      </nav>

      <div className="nav-right">
        <a className="nav-link" href="#">{ctas.login}</a>
        <button className="btn-purple-pill roll-btn"><RollText>{ctas.primary}</RollText></button>
      </div>
    </header>
  );
}

/* ───────── HERO ───────── */
function Hero({ headline, card }) {
  return (
    <section className="hero">
      <div className="hero-curves">
        <svg width="1994" height="586" viewBox="0 0 1994 586" style={{ left: -73, top: 0 }}>
          <path d="M 0 586 L 0.35 587 C 100 550 237 543 396 541.5 C 555 540 736 544 922.7 528.8 C 1296 498 1695 389 1995 0.6 L 1994.5 0 L 1993.7 -0.6 C 1694 387 1296 496 922 527 C 736 542 555 538 396 539.5 C 237 541 99.8 548 -0.35 586 L 0 586 Z" fill="rgba(0,0,0,0.07)" />
        </svg>
        <svg width="1986" height="250" viewBox="0 0 1986 250" style={{ left: -73, top: 948 }}>
          <path d="M0 250 C 300 100 700 50 1000 80 C 1400 110 1700 150 1986 0 L 1986 250 Z" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
        </svg>
      </div>

      <h1 className="hero-headline">
        {headline.map((line, li) => (
          <span className="hero-line" key={li}>
            {line.map((part, pi) => (
              part.kind === "text"
                ? <span key={pi}>{part.text}</span>
                : <span key={pi} className={`hero-circle ${part.image}`} aria-label={part.label} />
            ))}
          </span>
        ))}
      </h1>

      <div className="hero-card">
        <div className="hero-card-left">
          <div className="hero-card-top">
            <span className="chip-new">
              <span className="chip-dot" />
              {card.tag}
            </span>
            <h2 className="hero-card-h">{card.heading}</h2>
          </div>
          <div className="row-list">
            {card.rows.map((r, i) => (
              <div className="row-item" key={i}>
                <div className="row-person">
                  <div className="row-avatar" style={{ backgroundImage: `url(${r.avatar})` }} />
                  <div>
                    <div className="row-name">{r.name}</div>
                    <div className="row-sub">{r.session}</div>
                  </div>
                </div>
                <div className="row-mid">{r.outlet}</div>
                <div className="row-arrow"><Icon.ArrowRightSm /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-card-right">
          <p className="hero-card-desc">{card.description}</p>
          <button className="btn-blue roll-btn">
            <RollText>{card.primaryCta}</RollText>
            <span className="arr"><RollIcon fill><Icon.ArrowRight size={16} stroke="white" /></RollIcon></span>
          </button>
          <button className="btn-outline">
            <span>{card.secondaryCta}</span>
            <span className="arr"><Icon.ArrowRight size={16} stroke="black" /></span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───────── EVERYTHING YOU NEED ───────── */
function EverythingSection({ title, lead, features, demo, modes }) {
  const [activeMode, setActiveMode] = useState("auto");
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <p className="section-lead">{lead}</p>

      <div className="everything-grid">
        {/* Speed at Every Step */}
        <div className="ev-card mint">
          <h3 className="ev-title">{features[0].title}</h3>
          <p className="ev-body">{features[0].body}</p>
          <div className="ev-speed-img">
            <img src={speedometerImg} alt="" />
          </div>
        </div>

        {/* Outlet & Counter Management */}
        <div className="ev-card">
          <h3 className="ev-title">{features[1].title}</h3>
          <p className="ev-body">{features[1].body}</p>
          <div className="embed-card">
            <div className="embed-th">
              <div>Outlet</div>
              <div>Cashier</div>
              <div>Status</div>
            </div>
            {demo.outlets.map((o, i) => (
              <div className="embed-row" key={i} style={{ background: i === 0 ? "rgba(42,90,250,0.04)" : "transparent" }}>
                <div className="embed-cell">
                  <span className={`embed-check ${o.active ? "" : "empty"}`}>
                    {o.active && <Icon.Check size={12} />}
                  </span>
                  <span style={{ fontWeight: 500, color: "var(--c-ink)" }}>{o.outlet}</span>
                </div>
                <div className="embed-cell">
                  <span className="embed-avatar" style={{ backgroundImage: `url(${o.avatar})` }} />
                  <span style={{ color: "var(--c-slate-500)" }}>{o.cashier}</span>
                </div>
                <div className="embed-price">{o.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ev-row2">
        {/* Multiple Live Carts */}
        <div className="ev-card-sm">
          <h3 className="ev-sm-title">{features[2].title}</h3>
          <p className="ev-sm-body">{features[2].body}</p>
          <div className="carts-stack">
            {demo.carts.map((c, i) => (
              <div className={`cart-row ${c.muted ? "muted" : ""}`} key={i}>
                <div className="cart-person">
                  <span className="cart-avatar" style={{ backgroundImage: `url(${c.avatar})` }} />
                  <div>
                    <div className="cart-name">{c.name}</div>
                    <div className="cart-meta">{c.meta}</div>
                  </div>
                </div>
                <span className="cart-status">{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Your Theme Can't Break It */}
        <div className="ev-card-sm">
          <h3 className="ev-sm-title">{features[3].title}</h3>
          <p className="ev-sm-body">{features[3].body}</p>
          <div className="shield-wrap">
            <img src={shieldImg} alt="" />
          </div>
        </div>

        {/* Light/Dark/System */}
        <div className="ev-card-sm">
          <h3 className="ev-sm-title">{features[4].title}</h3>
          <p className="ev-sm-body">{features[4].body}</p>
          <div className="modes-row">
            {modes.map((m) => (
              <button
                key={m.key}
                className={`mode-pill ${m.cls}`}
                onClick={() => setActiveMode(m.key)}
                style={{
                  background: activeMode === m.key ? (m.key === "light" ? "#F8FAFF" : m.key === "dark" ? "#1F2937" : "var(--c-blue)") : (m.key === "light" ? "#EEF2F8" : m.key === "dark" ? "#3F4858" : "rgba(42,90,250,0.55)"),
                  cursor: "pointer",
                  transition: "background .2s",
                  color: m.key === "light" ? "#F59E0B" : "#fff"
                }}
              >
                {m.key === "light" && <Icon.Sun />}
                {m.key === "dark" && <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>}
                {m.key === "auto" && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── BUILT FOR DOKAN ───────── */
function DokanSection({ heading, body, cta }) {
  return (
    <section className="section">
      <div className="dokan-section">
        <div className="dokan-mock">
          <div className="browser-card">
            <div className="browser-bar">
              <div className="dots">
                <span className="dot r" /><span className="dot y" /><span className="dot g" />
              </div>
              <div className="urlbar"><span /></div>
              <div className="browser-icon"><Icon.Person size={14} /></div>
            </div>
            <div className="browser-body">
              <div className="browser-sidebar">
                <div className="sb-icon active"><Icon.Layout /></div>
                <div className="sb-icon"><Icon.Cart /></div>
                <div className="sb-icon"><Icon.UserGroup /></div>
                <div className="sb-icon"><Icon.Settings /></div>
              </div>
              <div className="browser-main">
                <div className="pill dark w160" style={{ height: 20 }} />
                <div className="mock-cards">
                  <div className="mock-card">
                    <div className="mock-card-head">
                      <div className="mock-card-icon blue"><Icon.Cart /></div>
                      <div className="mock-card-text">
                        <div className="pill dark w80 h12" />
                        <div className="pill w60 h10" />
                      </div>
                    </div>
                    <div className="mock-card-foot">
                      <div className="pill w60 h10" />
                      <div className="mock-toggle" />
                    </div>
                  </div>
                  <div className="mock-card">
                    <div className="mock-card-head">
                      <div className="mock-card-icon purple"><Icon.UserGroup /></div>
                      <div className="mock-card-text">
                        <div className="pill dark w120 h12" />
                        <div className="pill w60 h10" />
                      </div>
                    </div>
                    <div className="mock-card-foot">
                      <div className="pill w60 h10" />
                      <div className="mock-toggle" />
                    </div>
                  </div>
                </div>
                <div className="mock-row">
                  <div className="mock-row-line">
                    <div className="pill w120 h12" />
                    <div className="pill w60" style={{ height: 12 }} />
                  </div>
                  <div className="mock-row-line">
                    <div className="pill w160 h12" />
                    <div className="pill w60" style={{ height: 12 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="toast">
            <div className="toast-head">
              <div className="toast-icon"><Icon.Check size={14} /></div>
              <div className="toast-lines">
                <div className="pill w120 h12" />
                <div className="pill dim w80 h10" />
              </div>
            </div>
            <div className="progress"><div className="progress-bar" /></div>
          </div>
        </div>

        <div className="dokan-text">
          <h2 className="dokan-h">{heading}</h2>
          <p className="dokan-p">{body}</p>
          <button className="btn-white roll-btn"><RollText>{cta}</RollText> <RollIcon><Icon.ArrowRight size={16} /></RollIcon></button>
        </div>
      </div>
    </section>
  );
}

/* ───────── GLANCE ───────── */
function GlanceSection({ title, items, cta }) {
  return (
    <section className="glance">
      <div className="glance-inner">
        <h2 className="section-title">{title}</h2>
        <div className="glance-grid">
          {items.map((item, i) => (
            <div className="glance-cell" key={i}>
              <div className="glance-icon">
                {React.createElement(Icon[item.icon] || Icon.Check, { size: 22 })}
              </div>
              <div className="glance-text">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="glance-cta">
          <button className="btn-blue-pill roll-btn">
            <RollText>{cta}</RollText>
            <span className="arr-c"><RollIcon fill><Icon.ArrowRight size={14} stroke="white" /></RollIcon></span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───────── TESTIMONIALS ───────── */
function Testimonials({ title, hero, cards }) {
  return (
    <section className="testimonials">
      <h2 className="test-title">{title}</h2>
      <div className="test-hero">
        <span className="test-rating-pill">
          {Array.from({ length: 5 }).map((_, i) => <Icon.Star key={i} size={14} />)}
        </span>
        <div className="test-body">
          <p className="test-quote">"{hero.quote}"</p>
          <div className="test-author">
            <div className="test-avatar" style={{ backgroundImage: `url(${hero.avatar})` }} />
            <div>
              <div className="test-name">{hero.name}</div>
              <div className="test-role">{hero.role}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="test-side">
        {cards.map((c, i) => (
          <div className="test-card" key={i}>
            <p className="test-card-text">{c.text}</p>
            <div className="test-card-rating">
              {Array.from({ length: 5 }).map((_, j) => <Icon.Star key={j} size={14} />)}
            </div>
            <div className="test-card-foot">
              <div className="test-card-author">
                <div className="test-card-avatar" style={{ backgroundImage: `url(${c.avatar})` }} />
                <div>
                  <div className="test-card-name">{c.name}</div>
                  <div className="test-card-role">{c.role}</div>
                </div>
              </div>
              <div className="test-card-quote"><Icon.Quote /></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────── CTA PAIR ───────── */
function CtaPair({ help, ready }) {
  return (
    <section className="cta-pair">
      <div className="cta-card help">
        <h3 className="cta-h">{help.title}</h3>
        <p className="cta-p">{help.body}</p>
        <div className="cta-buttons">
          <button className="btn-blue-pill roll-btn">
            <RollText>{help.cta}</RollText>
            <span className="arr-c"><RollIcon fill><Icon.ArrowRight size={14} stroke="white" /></RollIcon></span>
          </button>
        </div>
        <div className="help-illus">
          <div className="toast-2">
            <div className="toast-2-head">
              <div className="green-circle"><Icon.Check size={10} /></div>
              <div className="pill" style={{ width: 50, height: 6 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
              <div className="pill" style={{ width: 100, height: 10 }} />
              <div className="pill" style={{ width: 60, height: 8 }} />
            </div>
          </div>
          <div className="chat-card">
            <div className="chat-head">
              <div className="chat-head-icon"><Icon.Headset size={18} /></div>
              <div className="chat-head-text">
                <div className="pill" style={{ width: 80, height: 10, background: "rgba(43,43,43,0.8)" }} />
                <div className="chat-online">
                  <span className="green" />
                  <div className="pill" style={{ width: 48, height: 6, background: "rgba(138,138,138,0.5)" }} />
                </div>
              </div>
            </div>
            <div className="chat-bubbles">
              <div className="bubble-in">
                <div className="pill" style={{ width: 100, height: 8 }} />
                <div className="pill" style={{ width: 140, height: 8 }} />
                <div className="pill" style={{ width: 60, height: 8 }} />
              </div>
              <div className="bubble-out">
                <div className="pill" style={{ width: 120, height: 8 }} />
                <div className="pill" style={{ width: 80, height: 8 }} />
                <div className="pill" style={{ width: 100, height: 8 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-card ready">
        <h3 className="cta-h">{ready.title}</h3>
        <p className="cta-p">{ready.body}</p>
        <div className="cta-buttons">
          <button className="btn-blue-pill roll-btn">
            <RollText>{ready.primaryCta}</RollText>
            <span className="arr-c"><RollIcon fill><Icon.ArrowRight size={14} stroke="white" /></RollIcon></span>
          </button>
          <a className="cta-link" href="#">{ready.secondaryCta}</a>
        </div>
        <div className="ready-illus">
          <div className="credit-mock">
            <div className="credit-top">
              <div className="credit-chip"><div className="credit-chip-inner" /></div>
            </div>
            <div className="credit-lines">
              <div className="pill" style={{ height: 10 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="pill dim" style={{ width: 64, height: 8 }} />
                <div className="pill dim" style={{ width: 32, height: 8 }} />
              </div>
            </div>
          </div>
          <div className="ready-card">
            <div className="ready-card-top">
              <div className="card-pill" />
              <div className="card-tag" />
            </div>
            <div className="ready-card-rows">
              {[Icon.Cart, Icon.UserGroup, Icon.Calculator].map((Ico, i) => (
                <div className="ready-row" key={i}>
                  <div className="ready-row-icon"><Ico /></div>
                  <div className="lines">
                    <div className="pill" style={{ width: 100, height: 10 }} />
                    <div className="pill" style={{ width: 60, height: 6 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── FOOTER ───────── */
function Footer({ footer }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-cols">
          <div className="footer-col">
            <div className="footer-brand">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(180deg, #FF7D92 0%, #800CD2 100%)", display: "grid", placeItems: "center", color: "#fff", fontFamily: "Poppins", fontWeight: 700 }}>d</div>
              <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 22, color: "#fff" }}>dokan</span>
            </div>
            <h4 className="section-h">About Us</h4>
            <ul>
              {footer.about.map((it) => <li key={it}><a href="#">{it}</a></li>)}
            </ul>
            <h4 className="section-h">Use Cases</h4>
            <ul>
              {footer.useCases.map((it) => <li key={it}><a href="#">{it}</a></li>)}
            </ul>
            <h4 className="section-h">Demo's</h4>
            <ul>
              {footer.demos.map((it) => <li key={it}><a href="#">{it}</a></li>)}
            </ul>
          </div>

          {footer.columns.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4 className="section-h" style={{ marginTop: 0 }}>{col.title}</h4>
              <ul>
                {col.items.map((it) => <li key={it}><a href="#">{it}</a></li>)}
              </ul>
              {col.subTitle && (
                <>
                  <h4 className="section-h">{col.subTitle}</h4>
                  <ul>
                    {col.subItems.map((it) => <li key={it}><a href="#">{it}</a></li>)}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="footer-update">
          <div className="footer-update-left">
            <h5>Keep Updated</h5>
            <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Stay Updated</button>
            </form>
          </div>
          <div className="footer-update-right">
            <div className="social">
              <a className="fb" href="#"><Icon.Facebook /></a>
              <a className="x" href="#"><Icon.X /></a>
              <a className="yt" href="#"><Icon.YouTube /></a>
              <a className="in" href="#"><Icon.LinkedIn /></a>
              <a className="pi" href="#"><Icon.Pinterest /></a>
            </div>
            <div className="wedevs-mark" style={{ fontSize: 13 }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Made by</span>
              <span style={{ color: "#fff", fontWeight: 700 }}>weDevs</span>
              <span style={{ background: "var(--c-purple)", color: "#fff", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>Premium</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2025 Dokan. All Rights Reserved.</div>
          <div className="footer-bottom-left" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Icon.Globe />
            <span>English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Header, Hero, EverythingSection, DokanSection, GlanceSection, Testimonials, CtaPair, Footer };
