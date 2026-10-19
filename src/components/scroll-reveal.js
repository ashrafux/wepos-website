import { useLayoutEffect } from "react";
import "../styles/scroll-reveal.css";

/* Site-wide scroll reveal. Call useScrollReveal() once in a page's root
   component. It walks every <section> and <footer>, unwraps single-child
   wrappers, and fades each block up as it scrolls into view. Grids and
   flex rows of 3+ items reveal item by item. Blocks already on screen at
   load animate in straight away.

   It leaves alone anything GSAP already animates (the page heroes, the
   pinned WooCommerce carousel, .dk-reveal / .td-reveal blocks, the pricing
   table rows) and anything marked data-no-reveal. Off for reduced motion. */

const SKIP_REGIONS = ".dk-hero, .dk-woo, .p-hero, .td-hero, [data-no-reveal]";
const SKIP_ITEMS = ".dk-reveal, .dk-stagger, .td-reveal, .cmp-row, .cmp-secttl";
const SKIP = SKIP_REGIONS + ", " + SKIP_ITEMS;
const ATOMIC = "a, button, form, label, input, select, textarea, img, picture, video, table";
const IGNORE_TAGS =new Set(["SCRIPT", "STYLE", "LINK", "TEMPLATE", "BR", "svg"]);

const kidsOf = (el) => [...el.children].filter((k) => !IGNORE_TAGS.has(k.tagName));
const isVisible = (el) => el.getClientRects().length > 0;

// Card grids (2+ items) and flex rows (3+ items) reveal item by item
function isGroup(el, kids) {
  if (kids.length < 2 || kids.length > 24) return false;
  const d = getComputedStyle(el).display;
  return d.includes("grid") || (d.includes("flex") && kids.length >= 3);
}

// A child that is itself a layout box (2+ block children), not a run of text
const isContainer = (k) => !getComputedStyle(k).display.startsWith("inline") && kidsOf(k).length >= 2;

function collect(el, out, depth = 0) {
  if (el.matches(SKIP) || el.closest(SKIP_REGIONS)) return;
  const kids = kidsOf(el);
  const dive = () => kids.forEach((k) => collect(k, out, depth + 1));
  // Buttons, links, forms and media are always one block, never split up
  if (depth > 5 || (depth > 0 && el.matches(ATOMIC))) { if (isVisible(el)) out.push(el); return; }
  // Something inside is animated by GSAP: go one level deeper instead
  if (el.querySelector(SKIP)) return dive();
  // Section roots and single-child wrappers are just wrappers
  if (depth === 0 || kids.length === 1) return dive();
  if (isGroup(el, kids)) { kids.forEach((k) => { if (!k.matches(SKIP) && isVisible(k)) out.push(k); }); return; }
  // A wrapper around other layout boxes (e.g. heading block + grid): go inside
  if (kids.some(isContainer)) return dive();
  // A leaf block (heading, paragraph, button row...): reveal as one
  if (isVisible(el)) out.push(el);
}

function init() {
  if (typeof IntersectionObserver === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const roots = [...document.querySelectorAll("section, footer")].filter((r) => !r.parentElement.closest("section, footer"));
  const items = [];
  roots.forEach((r) => {
    if (r.matches(SKIP_REGIONS)) return;
    const kids = kidsOf(r);
    // A section that is itself one block (no inner structure) reveals as a whole
    if (!kids.length) { if (isVisible(r)) items.push(r); return; }
    collect(r, items);
  });
  const unique = [...new Set(items)].filter((el) => !items.some((o) => o !== el && o.contains(el)));
  unique.forEach((el) => el.classList.add("rv-pending"));

  const show = (list) => {
    // Everything entering together staggers top-to-bottom, left-to-right
    list.sort((a, b) => {
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      return Math.abs(ra.top - rb.top) > 8 ? ra.top - rb.top : ra.left - rb.left;
    });
    list.forEach((el, i) => {
      io.unobserve(el);
      const delay = Math.min(i, 8) * 70;
      el.style.setProperty("--rv-delay", delay + "ms");
      el.classList.add("rv-anim");
      el.classList.remove("rv-pending");
      // Drop the reveal transition afterwards so the element's own transitions work again
      setTimeout(() => { el.classList.remove("rv-anim"); el.style.removeProperty("--rv-delay"); }, 700 + delay);
    });
  };
  const io = new IntersectionObserver((entries) => {
    show(entries.filter((e) => e.isIntersecting).map((e) => e.target));
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });
  unique.forEach((el) => io.observe(el));

  // At the very end of the page, blocks in the last 8% of the screen can never
  // cross the trigger line, so reveal whatever is still waiting on screen.
  const onScroll = () => {
    const doc = document.documentElement;
    if (window.scrollY + window.innerHeight < doc.scrollHeight - 4) return;
    show([...document.querySelectorAll(".rv-pending")].filter((el) => el.getBoundingClientRect().top < window.innerHeight));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
}

export function useScrollReveal() {
  useLayoutEffect(() => init(), []);
}
