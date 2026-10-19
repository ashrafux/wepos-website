import React from "react";
import ReactDOM from "react-dom/client";
import { RollText, RollIcon } from "../components/roll.jsx";
import { Icon } from "../components/icons.jsx";
import { DokanFooter, ResourceMenu } from "../components/dokan-footer.jsx";
import "../styles/features.css";
import { NavBrand } from "../components/brand.jsx";
import { useScrollReveal } from "../components/scroll-reveal.js";

/* Features page app — all sections, illustrations, data */


/* ════════════════════════════════════════
   ILLUSTRATIONS
════════════════════════════════════════ */
const Illus = {
  SearchFast: () => (
    <div className="illus-search">
      <div className="search-bar">
        <span className="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <span className="search-text">Coffee</span>
        <span className="search-cursor" />
      </div>
      <div className="results">
        <div className="result-row highlight">
          <span className="thumb b"><Icon.Cart /></span>
          <span className="result-text">
            <span className="result-name">Cold Brew Bottle</span>
            <span className="result-sku">SKU · CB-330</span>
          </span>
          <span className="price">$5.00</span>
        </div>
        <div className="result-row">
          <span className="thumb p"><Icon.Tag /></span>
          <span className="result-text">
            <span className="result-name">Coffee Beans 1kg</span>
            <span className="result-sku">SKU · CFB-1K</span>
          </span>
          <span className="price">$18.00</span>
        </div>
      </div>
    </div>
  ),

  ThemePicker: () => (
    <div className="illus-theme">
      <div className="theme-pill">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </div>
      <div className="theme-pill dark">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
      </div>
      <div className="theme-pill auto">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </div>
    </div>
  ),

  Keyboard: () => (
    <div className="illus-keys">
      <div className="key-row"><div className="key">↑</div></div>
      <div className="key-row">
        <div className="key">←</div>
        <div className="key">↓</div>
        <div className="key">→</div>
      </div>
      <div className="key-row"><div className="key wide pressed">Enter</div></div>
    </div>
  ),

  CartVoidConfirm: () => (
    <div className="illus-confirm">
      <div className="confirm-card">
        <div className="confirm-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="confirm-title">Clear current cart?</div>
        <div className="confirm-sub">4 items will be removed. This can't be undone.</div>
        <div className="confirm-actions">
          <div className="confirm-btn ghost">Keep</div>
          <div className="confirm-btn danger">Clear cart</div>
        </div>
      </div>
    </div>
  ),

  Barcode: () => (
    <div className="illus-barcode">
      <div className="scanner">
        <div className="barcode-bars">
          {Array.from({ length: 22 }).map((_, i) => <span key={i} />)}
        </div>
        <div className="barcode-num">8 901 234 567 890</div>
      </div>
      <div className="scan-laser" />
    </div>
  ),

  Fractional: () => (
    <div className="illus-qty">
      <div className="qty-label">QUANTITY</div>
      <div className="qty-input">
        <div>
          <span className="qty-num">1.5</span>
          <span className="qty-unit"> kg</span>
        </div>
        <div className="qty-controls">
          <div className="qty-btn">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="1 5 5 1 9 5" /></svg>
          </div>
          <div className="qty-btn">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="1 1 5 5 9 1" /></svg>
          </div>
        </div>
      </div>
      <div className="qty-chips">
        <span className="qty-chip">kg</span>
        <span className="qty-chip">g</span>
        <span className="qty-chip active">m</span>
        <span className="qty-chip">pcs</span>
      </div>
    </div>
  ),

  HidePhone: () => (
    <div className="illus-hide-phone">
      <div className="hide-list">
        <div className="hide-row">
          <span className="hide-thumb b"><Icon.Cart /></span>
          <span className="hide-info">
            <span className="hide-name">Cold Brew Bottle</span>
            <span className="hide-tags">
              <span className="hide-tag on">POS</span>
              <span className="hide-tag online">ONLINE</span>
            </span>
          </span>
          <span className="hide-eye on">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
          </span>
        </div>
        <div className="hide-row dim">
          <span className="hide-thumb p"><Icon.Tag /></span>
          <span className="hide-info">
            <span className="hide-name">Limited Edition Mug</span>
            <span className="hide-tags">
              <span className="hide-tag off">POS</span>
              <span className="hide-tag online">ONLINE</span>
            </span>
          </span>
          <span className="hide-eye off">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          </span>
        </div>
        <div className="hide-row">
          <span className="hide-thumb g"><Icon.Cart /></span>
          <span className="hide-info">
            <span className="hide-name">Croissant</span>
            <span className="hide-tags">
              <span className="hide-tag on">POS</span>
              <span className="hide-tag off">ONLINE</span>
            </span>
          </span>
          <span className="hide-eye on">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  ),

  LowStock: () => (
    <div className="illus-stock">
      <div className="stock-card">
        <div className="stock-icon red">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="stock-info">
          <div className="stock-name">Espresso Beans</div>
          <div className="stock-status">Out of stock</div>
        </div>
        <div className="stock-count red">0</div>
      </div>
      <div className="stock-card">
        <div className="stock-icon amber">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        </div>
        <div className="stock-info">
          <div className="stock-name">Oat Milk 1L</div>
          <div className="stock-status">Low stock</div>
        </div>
        <div className="stock-count amber">3</div>
      </div>
    </div>
  ),

  CustomerSearch: () => (
    <div className="illus-customer">
      <div className="customer-bar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--c-slate-400)" }}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="ph">Search by phone, name…</span>
      </div>
      <div className="customer-card">
        <div className="customer-av">MS</div>
        <div className="customer-info">
          <div className="customer-name">Maya Santos</div>
          <div className="customer-meta">+1 415 555 0142</div>
        </div>
        <div className="customer-check">
          <Icon.Check size={16} stroke="white" />
        </div>
      </div>
    </div>
  ),

  Payment: () => (
    <div className="illus-payment">
      <div className="pay-tile tl">
        <div className="pay-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" />
          </svg>
        </div>
        <span className="pay-label">Cash</span>
      </div>
      <div className="pay-tile tr active">
        <div className="pay-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </div>
        <span className="pay-label">Card</span>
      </div>
      <div className="pay-tile bl">
        <div className="pay-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        </div>
        <span className="pay-label">Mobile</span>
      </div>
      <div className="pay-tile br">
        <div className="pay-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <span className="pay-label">Online</span>
      </div>
    </div>
  ),

  Receipt: () => (
    <div className="illus-receipt">
      <div className="receipt-card">
        <div className="receipt-store">BLUE BEAN CAFÉ</div>
        <div className="receipt-sub">724 Market St · Receipt #2841</div>
        <div className="receipt-divider" />
        <div className="receipt-line"><span>Cold Brew × 2</span><span>$10.00</span></div>
        <div className="receipt-line"><span>Croissant</span><span>$4.50</span></div>
        <div className="receipt-divider" />
        <div className="receipt-line"><span>Subtotal</span><span>$14.50</span></div>
        <div className="receipt-line"><span>Tax (8.5%)</span><span>$1.23</span></div>
        <div className="receipt-line"><span>Shipping</span><span>$0.00</span></div>
        <div className="receipt-divider" />
        <div className="receipt-line bold"><span>Total</span><span>$15.73</span></div>
      </div>
    </div>
  ),

  Currency: () => (
    <div className="illus-currency">
      <div className="cur-card active">
        <span className="cur-label">USD</span>
        <span className="cur-value">$1,234.56</span>
      </div>
      <div className="cur-card">
        <span className="cur-label">EUR</span>
        <span className="cur-value">€1.234,56</span>
      </div>
      <div className="cur-card">
        <span className="cur-label">INR</span>
        <span className="cur-value">₹1,23,456</span>
      </div>
      <div className="cur-card">
        <span className="cur-label">CHF</span>
        <span className="cur-value">1'234.56</span>
      </div>
    </div>
  ),

  ReceiptBuilder: () => (
    <div className="illus-builder">
      {[
        { label: "Store header & logo", meta: "Header" },
        { label: "Line items & totals", meta: "Body", active: true },
        { label: "Tax & payment info", meta: "Body" },
        { label: "Thank-you note", meta: "Footer" },
      ].map((b, i) => (
        <div className={`builder-block ${b.active ? "active" : ""}`} key={i}>
          <span className="builder-handle">
            <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor"><circle cx="2" cy="2" r="1.2" /><circle cx="8" cy="2" r="1.2" /><circle cx="2" cy="7" r="1.2" /><circle cx="8" cy="7" r="1.2" /><circle cx="2" cy="12" r="1.2" /><circle cx="8" cy="12" r="1.2" /></svg>
          </span>
          <span className="builder-label">{b.label}</span>
          <span className="builder-meta">{b.meta}</span>
        </div>
      ))}
      <div className="builder-add">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add field
      </div>
    </div>
  ),

  Whitelabel: () => (
    <div className="illus-wl">
      <div className="wl-card">
        <div className="wl-logo we">we</div>
        <div className="wl-line" />
        <div className="wl-line short" />
        <div className="wl-line" />
      </div>
      <div className="wl-swap">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      </div>
      <div className="wl-card">
        <div className="wl-logo b">B</div>
        <div className="wl-line" />
        <div className="wl-line short" />
        <div className="wl-line" />
      </div>
    </div>
  ),

  ShippingReceipt: () => (
    <div className="illus-ship-receipt">
      <div className="ship-receipt-card">
        <div className="ship-receipt-title">ORDER #2841</div>
        <div className="ship-receipt-divider" />
        <div className="ship-receipt-line"><span>Items</span><span>$48.00</span></div>
        <div className="ship-receipt-line"><span>Tax</span><span>$4.08</span></div>
        <div className="ship-receipt-line" style={{ background: "rgba(42,90,250,0.08)", padding: "5px 6px", borderRadius: 4, marginLeft: -6, marginRight: -6, marginTop: 4 }}>
          <span>Shipping</span><span>$6.00</span>
        </div>
        <div className="ship-receipt-line" style={{ background: "rgba(42,90,250,0.08)", padding: "5px 6px", borderRadius: 4, marginLeft: -6, marginRight: -6, marginTop: 2 }}>
          <span>Shipping tax</span><span>$0.51</span>
        </div>
        <div className="ship-receipt-divider" />
        <div className="ship-receipt-line bold"><span>Total</span><span>$58.59</span></div>
      </div>
    </div>
  ),

  Printer: () => (
    <div className="illus-printer">
      <div className="printer-screen">
        <div className="printer-screen-inner">
          <span className="printer-status" />
          <span className="printer-label">Ready · 1 job printed</span>
        </div>
      </div>
      <div className="printer-paper">
        <div className="mock-pill dark" style={{ width: "100%" }} />
        <div className="mock-pill" style={{ width: "70%" }} />
        <div className="mock-pill" style={{ width: "85%" }} />
        <div className="mock-pill" style={{ width: "50%" }} />
      </div>
    </div>
  ),

  Outlets: () => (
    <div className="illus-outlets">
      <div className="outlet-row active">
        <div className="outlet-icon"><Icon.Building /></div>
        <div className="outlet-info">
          <div className="outlet-name">Main Store</div>
          <div className="outlet-meta">2 counters · Bob, Maya</div>
        </div>
        <span className="outlet-dot" />
      </div>
      <div className="outlet-row">
        <div className="outlet-icon"><Icon.Building /></div>
        <div className="outlet-info">
          <div className="outlet-name">Downtown Kiosk</div>
          <div className="outlet-meta">1 counter · Jin</div>
        </div>
        <span className="outlet-dot" />
      </div>
      <div className="outlet-row">
        <div className="outlet-icon"><Icon.Building /></div>
        <div className="outlet-info">
          <div className="outlet-name">Airport · T2</div>
          <div className="outlet-meta">3 counters · Team B</div>
        </div>
        <span className="outlet-dot" />
      </div>
    </div>
  ),

  CashierRole: () => (
    <div className="illus-cashier">
      <div className="cashier-card-box">
        <div className="cashier-av">BC</div>
        <div className="cashier-name">Bob Chen</div>
        <div className="cashier-role-tag">CASHIER · OUTLET 1</div>
        <div className="cashier-perms">
          <div className="cashier-perm"><span className="ck"><Icon.Check size={10} stroke="white" /></span> Take payments</div>
          <div className="cashier-perm"><span className="ck"><Icon.Check size={10} stroke="white" /></span> Apply discounts</div>
          <div className="cashier-perm off"><span className="ck" /> Edit products</div>
        </div>
      </div>
    </div>
  ),

  CashierAssign: () => (
    <div className="illus-assign">
      <div className="assign-row">
        <span className="assign-av" style={{ background: "linear-gradient(135deg, #A78BFA, #6366F1)" }}>BC</span>
        <span className="assign-name">Bob</span>
        <span className="assign-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </span>
        <span className="assign-counter">Counter 1</span>
      </div>
      <div className="assign-row">
        <span className="assign-av" style={{ background: "linear-gradient(135deg, #F472B6, #DC2626)" }}>MS</span>
        <span className="assign-name">Maya</span>
        <span className="assign-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </span>
        <span className="assign-counter">Counter 2</span>
      </div>
      <div className="assign-row">
        <span className="assign-av" style={{ background: "linear-gradient(135deg, #34D399, #0891B2)" }}>JN</span>
        <span className="assign-name">Jin</span>
        <span className="assign-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </span>
        <span className="assign-counter">Kiosk</span>
      </div>
    </div>
  ),

  SecureLogin: () => (
    <div className="illus-login">
      <div className="login-card">
        <div className="login-lock">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="login-title">wePOS Login</div>
        <div className="login-sub">Cashier access only</div>
        <div className="login-field">cashier@store.com</div>
        <div className="login-field dots">••••••••</div>
        <div className="login-btn">Sign in</div>
        <div className="login-scope">
          <span className="green-dot" />
          POS access only · No admin
        </div>
      </div>
    </div>
  ),

  GranularAccess: () => (
    <div className="illus-access">
      <div className="access-head">
        <div className="access-head-icon"><Icon.Settings /></div>
        <div className="access-head-info">
          <div className="access-head-name">Cashier Role · Pro</div>
          <div className="access-head-meta">12 of 18 permissions enabled</div>
        </div>
      </div>
      <div className="access-list">
        <div className="access-item">
          <span className="access-label">Refund orders</span>
          <span className="access-toggle on" />
        </div>
        <div className="access-item">
          <span className="access-label">Create products</span>
          <span className="access-toggle off" />
        </div>
        <div className="access-item">
          <span className="access-label">View reports</span>
          <span className="access-toggle on" />
        </div>
        <div className="access-item">
          <span className="access-label">Manage cashiers</span>
          <span className="access-toggle off" />
        </div>
      </div>
    </div>
  ),

  Chart: () => (
    <div className="illus-chart">
      <div className="chart-card">
        <div className="chart-head">
          <div>
            <div className="chart-title">This week's sales</div>
            <div className="chart-amount">$12,480 <span className="delta">+18%</span></div>
          </div>
          <div className="chart-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
          </div>
        </div>
        <div className="chart-bars">
          <div /><div /><div /><div /><div className="tall" /><div /><div className="tall" />
        </div>
        <div className="chart-days">
          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
        </div>
      </div>
    </div>
  ),

  Filters: () => (
    <div className="illus-filters">
      <div className="filter-grid">
        <span className="chip active">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          This week
        </span>
        <span className="chip active">Outlet · Main <span className="chip-x">×</span></span>
        <span className="chip">Cashier</span>
        <span className="chip active">Card payments <span className="chip-x">×</span></span>
        <span className="chip">Status</span>
        <span className="chip">Customer</span>
      </div>
      <div className="filter-summary">
        <div className="filter-summary-text">SHOWING 348 OF 1,204 ORDERS</div>
        <div className="filter-summary-row">
          <span className="filter-dot" />
          <span className="filter-line" />
        </div>
      </div>
    </div>
  ),

  Csv: () => (
    <div className="illus-csv">
      <div className="csv-card">
        <div className="csv-icon">
          <span className="csv-tag">CSV</span>
        </div>
        <div className="csv-name">orders-may-2026.csv</div>
      </div>
    </div>
  ),

  PrintReport: () => (
    <div className="illus-print">
      <div className="print-card">
        <div className="print-head">
          <span className="print-title-mini">Sales — May 2026</span>
          <span className="print-date">22/05/26</span>
        </div>
        <div className="print-table">
          <div className="print-row"><span>Card</span><span>$8,420.00</span></div>
          <div className="print-row"><span>Cash</span><span>$2,840.50</span></div>
          <div className="print-row"><span>Tax</span><span>$1,219.50</span></div>
          <div className="print-row bold"><span>Total</span><span>$12,480.00</span></div>
        </div>
        <div className="print-mini-bars">
          <div /><div /><div /><div /><div className="tall" /><div /><div className="tall" />
        </div>
      </div>
      <div className="print-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      </div>
    </div>
  ),

  Code: () => (
    <div className="illus-code">
      <div className="code-card">
        <div className="code-head">
          <span /><span /><span />
        </div>
        <div className="code-body">
          <div><span className="c-comment">// Add a panel to the POS screen</span></div>
          <div><span className="c-keyword">addAction</span>(<span className="c-string">'wepos_cart_after'</span>,</div>
          <div>&nbsp;&nbsp;<span className="c-function">renderLoyaltyWidget</span>);</div>
          <div>&nbsp;</div>
          <div><span className="c-keyword">function</span> <span className="c-function">renderLoyaltyWidget</span>() &#123;</div>
          <div>&nbsp;&nbsp;<span className="c-keyword">return</span> <span className="c-string">'Earn 10 points'</span>;</div>
          <div>&#125;</div>
        </div>
      </div>
    </div>
  ),

  Api: () => (
    <div className="illus-api">
      <div className="api-row">
        <span className="api-method get">GET</span>
        <span className="api-path">/wc/v3/products</span>
        <span className="api-status">200</span>
      </div>
      <div className="api-row">
        <span className="api-method post">POST</span>
        <span className="api-path">/wepos/v1/orders</span>
        <span className="api-status">201</span>
      </div>
      <div className="api-row">
        <span className="api-method put">PUT</span>
        <span className="api-path">/wepos/v1/cart/3</span>
        <span className="api-status">200</span>
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════
   COMPONENTS
════════════════════════════════════════ */
function Header({ active }) {
  const items = [
    { label: "Features", href: "features.html", key: "features" },
    { label: "For Dokan", href: "wepos-for-dokan.html", key: "dokan" },
    { label: "Pricing", href: "pricing.html", key: "pricing" },
    { label: "Try Demo", href: "try-demo.html", key: "demo" },
    { label: "Resource", href: "#", dropdown: true },
  ];
  return (
    <header className="nav">
      <NavBrand />
      <nav className="nav-center">
        {items.map((it) => (
          it.dropdown
            ? <ResourceMenu key={it.label} active={active === it.key} />
            : <a key={it.label} className={`nav-link ${active === it.key ? "active" : ""}`} href={it.href}>
                {it.label}
              </a>
        ))}
      </nav>
      <div className="nav-right">
        <a className="nav-link" href="#">Login</a>
        <button className="ds-btn-small roll-btn"><RollText>Get Dokan</RollText></button>
      </div>
    </header>
  );
}

function HeroDashboard() {
  return (
    <div className="hero-mock">
      <div className="hero-mock-inner" />
    </div>
  );
}

function Hero({ data }) {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="hero-title">{data.title}</h1>
        <p className="hero-lead">{data.lead}</p>
        <a className="ds-btn with-arrow ds-btn-primary roll-btn" href="#">
          <RollText>{data.cta}</RollText>
          <span className="ds-circle"><RollIcon fill><Icon.ArrowRight size={23} stroke="currentColor" /></RollIcon></span>
        </a>
      </div>
      <HeroDashboard />
    </section>
  );
}

/** Card with text top-left and illustration bottom-right (default) */
function FeatCard({ card, illusStyle }) {
  return (
    <div className="feat-card">
      <div className={`feat-card-text ${card.wideText ? "wide" : ""}`}>
        <h3 className="feat-card-name">
          <span>{card.name}</span>
          {card.pro && <span className="feat-pro">PRO</span>}
        </h3>
        <p className="feat-card-desc">{card.desc}</p>
      </div>
      <div className="feat-card-illus" style={illusStyle}>
        {React.createElement(Illus[card.illus])}
      </div>
    </div>
  );
}

/** Wide card (1400×400) — text left, illustration right */
function FeatCardWide({ card, illusStyle }) {
  return (
    <div className="feat-card-wide">
      <div className="feat-card-wide-text">
        <h3 className="feat-card-name">
          <span>{card.name}</span>
          {card.pro && <span className="feat-pro">PRO</span>}
        </h3>
        <p className="feat-card-desc">{card.desc}</p>
      </div>
      <div className="feat-card-wide-illus" style={illusStyle}>
        {React.createElement(Illus[card.illus])}
      </div>
    </div>
  );
}

/** Image-top card (448×582) — illustration on top, text centered below */
function FeatCardTall({ card }) {
  return (
    <div className="feat-card-tall">
      <div className="image-card">
        {React.createElement(Illus[card.illus])}
      </div>
      <div className="text-block">
        <h3 className="feat-card-name">
          <span>{card.name}</span>
          {card.pro && <span className="feat-pro">PRO</span>}
        </h3>
        <p className="feat-card-desc">{card.desc}</p>
      </div>
    </div>
  );
}

function SectionHead({ title, lead }) {
  return (
    <div className="section-head">
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

/** Section: 2×2 grid of standard cards */
function Section2x2({ title, lead, cards }) {
  return (
    <section className="section">
      <SectionHead title={title} lead={lead} />
      <div className="card-grid-2">
        {cards.map((c, i) => <FeatCard card={c} key={i} illusStyle={c.illusStyle} />)}
      </div>
    </section>
  );
}

/** Section: 1 wide card on top + 3 image-top cards */
function SectionWide3({ title, lead, wide, cards }) {
  return (
    <section className="section">
      <SectionHead title={title} lead={lead} />
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <FeatCardWide card={wide} illusStyle={wide.illusStyle} />
        <div className="card-grid-3">
          {cards.map((c, i) => <FeatCardTall card={c} key={i} />)}
        </div>
      </div>
    </section>
  );
}

/** Section: 2 wide cards stacked + 3 image-top cards */
function SectionWide2Plus3({ title, lead, wides, cards }) {
  return (
    <section className="section">
      <SectionHead title={title} lead={lead} />
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {wides.map((w, i) => <FeatCardWide card={w} key={i} illusStyle={w.illusStyle} />)}
        <div className="card-grid-3">
          {cards.map((c, i) => <FeatCardTall card={c} key={i} />)}
        </div>
      </div>
    </section>
  );
}

/** Section: 2-col with sticky text on left, 4 cards stacked on right */
function Section2Col({ title, lead, cards }) {
  return (
    <section className="two-col-section">
      <div className="two-col-head">
        <h2 className="section-title">{title}</h2>
        <p className="section-lead">{lead}</p>
      </div>
      <div className="two-col-cards">
        {cards.map((c, i) => <FeatCard card={c} key={i} illusStyle={c.illusStyle} />)}
      </div>
    </section>
  );
}

/** Section: 2 wide cards (Developer Tools) */
function SectionWide({ title, lead, cards }) {
  return (
    <section className="section">
      <SectionHead title={title} lead={lead} />
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {cards.map((c, i) => <FeatCardWide card={c} key={i} illusStyle={c.illusStyle} />)}
      </div>
    </section>
  );
}

function VendorSpotlight({ data }) {
  return (
    <section className="vendor-section">
      <div className="vendor-inner">
        <h2 className="vendor-h">{data.title}</h2>
        <p className="vendor-lead">{data.lead}</p>
        <div className="vendor-grid">
          {data.items.map((it, i) => (
            <div className="vendor-item" key={i}>
              <span className="vendor-check"><Icon.Check size={14} stroke="currentColor" /></span>
              <span className="vendor-label">
                {it.label}
                {it.pro && <span className="feat-pro">PRO</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlueCta({ data }) {
  return (
    <section className="blue-cta">
      <div>
        <h2 className="blue-cta-h">{data.title}</h2>
        <p className="blue-cta-p">{data.lead}</p>
      </div>
      <div className="blue-cta-buttons">
        <a className="ds-btn with-arrow ds-btn-dark roll-btn" href="#">
          <RollText>{data.primary}</RollText>
          <span className="ds-circle"><RollIcon fill><Icon.ArrowRight size={23} stroke="currentColor" /></RollIcon></span>
        </a>
        <a className="ds-btn plain ds-btn-secondary-trans" href="#">{data.secondary}</a>
      </div>
    </section>
  );
}

function FooterGroupLocalUnused() { return null; }


/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
const DATA = {
  hero: {
    title: "Every Feature Your Counter Needs",
    lead: "Fast, flexible, and built for everything from a single store to a full marketplace.",
    cta: "Try the Demo",
  },
  speed: {
    title: "Built for speed at the counter",
    lead: "Every interaction at the cashier screen is tuned for one thing — getting the next customer through, fast.",
    cards: [
      { illus: "SearchFast",  name: "Single-page app speed", desc: "Search, add, discount, checkout, all instant, no reloads.", illusStyle: { right: 50, bottom: 50, width: 280, height: "auto" } },
      { illus: "ThemePicker", name: "Light, dark & system modes", desc: "Your cashiers pick what suits them. Switches with a smooth fade.", illusStyle: { right: 80, bottom: 70, width: 194, height: "auto" } },
      { illus: "Keyboard",    name: "Keyboard shortcuts", desc: "Arrow keys for customer selection. Faster than clicking.", illusStyle: { right: 62, top: 181, bottom: "auto", width: 210, height: "auto" } },
      { illus: "CartVoidConfirm", name: "Cart void confirmation", desc: "Confirms before clearing, no sale lost by accident.", illusStyle: { right: 50, bottom: 50, width: 320, height: "auto" } },
    ],
  },
  find: {
    title: "Find it fast. Sell it right.",
    lead: "Inventory that mirrors WooCommerce — searchable, scannable, decimal-precise.",
    wide: { illus: "Barcode", name: "Search by name, SKU, ID or barcode", desc: "Filter by category or scan to pull it up instantly.", illusStyle: { right: 95, top: 89, transform: "none" } },
    cards: [
      { illus: "Fractional", name: "Fractional quantities", desc: "1.5 kg, 0.25 m, any decimal unit." },
      { illus: "HidePhone",  name: "Hide products from POS", desc: "Keep a product visible on your online store while hiding it from the counter." },
      { illus: "LowStock",   name: "Low-stock alerts (Pro)", desc: "See which products are running low or out of stock at a glance." },
    ],
  },
  checkout: {
    title: "Faster checkout, fewer errors",
    lead: "Pull up a customer, take any payment, let WooCommerce handle the math.",
    cards: [
      { illus: "CustomerSearch", name: "Customer search", desc: "Search by name, phone, or company name instantly.", illusStyle: { right: 53, bottom: 53, width: 302, height: "auto" } },
      { illus: "Payment",        name: "Multiple payment gateways", desc: "Cash, card, and more. Configured from WooCommerce.", illusStyle: { right: 56, top: 188, bottom: "auto", width: 240, height: 214 }, wideText: true },
      { illus: "Receipt",        name: "Tax & shipping on receipts", desc: "Auto-calculated. Shown as separate line items.", illusStyle: { right: 70, top: 90, bottom: "auto", width: 208, height: "auto" } },
      { illus: "Currency",       name: "WooCommerce currency formatting", desc: "Follows your store's thousand-separator exactly.", illusStyle: { right: 50, bottom: 50, top: "auto", width: 280, height: "auto" }, wideText: true },
    ],
  },
  brand: {
    title: "Your brand, your receipt",
    lead: "Customize every line of the receipt — and print without surprises.",
    cards: [
      { illus: "ReceiptBuilder", name: "Advanced receipt builder", desc: "Header, footer, every field you want to display.", illusStyle: { right: 41, top: 180, bottom: "auto", width: 276, height: "auto" } },
      { illus: "Whitelabel",     name: "White-label invoices", desc: "Remove all wePOS branding. Make the receipt entirely your own.", illusStyle: { right: 40, bottom: 60, width: 380, height: "auto" } },
      { illus: "ShippingReceipt", name: "Shipping as a separate line", desc: "Shipping and shipping tax shown as their own rows.", illusStyle: { right: 50, top: 100, bottom: "auto", width: 228, height: "auto" } },
      { illus: "Printer",        name: "Reliable printing", desc: "Receipts fully rendered before sending to the printer. No blank pages.", illusStyle: { right: 50, bottom: 50, width: 276, height: "auto" } },
    ],
  },
  ops: {
    title: "Run your whole operation from one place",
    lead: "Unlimited outlets, dedicated cashiers, scoped permissions — all from one screen.",
    wides: [
      { illus: "Outlets",     name: "Unlimited outlets & counters", desc: "As many physical locations as your business needs.", illusStyle: { right: 75, top: 67, transform: "none" } },
      { illus: "CashierRole", name: "Dedicated cashier role (Pro)", desc: "Pre-configured with the right permissions out of the box.", illusStyle: { right: 65, top: 48, transform: "none" } },
    ],
    cards: [
      { illus: "CashierAssign",  name: "Cashier assignment", desc: "Each cashier sees only their assigned counter." },
      { illus: "SecureLogin",    name: "Secure login panel", desc: "Cashiers access only the POS, not WooCommerce admin." },
      { illus: "GranularAccess", name: "Granular access control (Pro)", desc: "Control which pages and actions each cashier can use." },
    ],
  },
  vendor: {
    title: "A full POS for every vendor on your marketplace.",
    lead: "Each vendor gets their own fully independent POS — isolated data, automatic staff permissions, and per-vendor settings.",
    items: [
      { label: "Each vendor sees only their own data" },
      { label: "Vendor staff auto-assigned the right access" },
      { label: "Per-vendor settings, tax & currency", pro: true },
      { label: "Vendor reports & receipt customization", pro: true },
      { label: "Admin controls which sections each vendor sees" },
      { label: "Outlet-to-vendor assignment", pro: true },
    ],
  },
  reports: {
    title: "Reports & Analytics (Pro)",
    lead: "Know your store without digging through WooCommerce — dashboards, filters, and exports built for the way retailers actually look at numbers.",
    cards: [
      { illus: "Chart",       name: "Reports dashboard", desc: "Summary cards, sales charts, top products, payment summaries, and low-stock alerts in one page.", illusStyle: { right: 50, top: 201, bottom: "auto", width: 260, height: "auto" } },
      { illus: "Filters",     name: "Powerful filtering", desc: "Filter by date, status, cashier, outlet, and customer.", illusStyle: { right: 50, top: 199, bottom: "auto", width: 291, height: "auto" } },
      { illus: "Csv",         name: "CSV export", desc: "Export orders directly from the Orders page.", illusStyle: { right: 50, top: 176, bottom: "auto", width: 220, height: "auto" } },
      { illus: "PrintReport", name: "Printable reports", desc: "Clean print layouts with proper currency formatting.", illusStyle: { right: 60, top: 168, bottom: "auto", width: 220, height: "auto" } },
    ],
  },
  dev: {
    title: "Developer Tools",
    lead: "Build on top without forking — every action is an API call, every UI surface has a hook.",
    cards: [
      { illus: "Code", name: "Extension points", desc: "Add buttons and panels to the POS screen without modifying core files.", illusStyle: { right: 105, top: 67, transform: "none" } },
      { illus: "Api",  name: "REST API foundation", desc: "Every POS action runs through the WooCommerce REST API.", illusStyle: { right: 105, top: 67, transform: "none" } },
    ],
  },
  blueCta: {
    title: "Ready to put the right POS at every counter?",
    lead: "Free to start. Scales with your store.",
    primary: "Get wePOS Now",
    secondary: "Try the Demo",
  },
};

function App() {
  useScrollReveal();
  return (
    <>
      <Header active="features" />
      <Hero data={DATA.hero} />
      <Section2x2 title={DATA.speed.title} lead={DATA.speed.lead} cards={DATA.speed.cards} />
      <SectionWide3 title={DATA.find.title} lead={DATA.find.lead} wide={DATA.find.wide} cards={DATA.find.cards} />
      <Section2Col title={DATA.checkout.title} lead={DATA.checkout.lead} cards={DATA.checkout.cards} />
      <Section2x2 title={DATA.brand.title} lead={DATA.brand.lead} cards={DATA.brand.cards} />
      <SectionWide2Plus3 title={DATA.ops.title} lead={DATA.ops.lead} wides={DATA.ops.wides} cards={DATA.ops.cards} />
      <VendorSpotlight data={DATA.vendor} />
      <Section2x2 title={DATA.reports.title} lead={DATA.reports.lead} cards={DATA.reports.cards} />
      <SectionWide title={DATA.dev.title} lead={DATA.dev.lead} cards={DATA.dev.cards} />
      <BlueCta data={DATA.blueCta} />
      <DokanFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

/* ── Lock the page to its 1920 design width and scale to fit the viewport ── */
(function () {
  const app = document.getElementById("app");
  function fit() {
    const s = window.innerWidth / 1920;
    app.style.transform = "scale(" + s + ")";
    document.body.style.height = app.scrollHeight * s + "px";
  }
  window.addEventListener("resize", fit);
  if (window.ResizeObserver) new ResizeObserver(fit).observe(app);
  setTimeout(fit, 80);
  setTimeout(fit, 400);
  window.addEventListener("load", fit);
})();
