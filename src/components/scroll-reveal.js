import { useLayoutEffect } from "react";
import "../styles/scroll-reveal.css";

/* Site-wide scroll reveal, matching the "Default loading site animation"
   reference: each block fades in from soft and slightly blurred to sharp
   while rising a little, one block after another. It replays on every
   scroll: once a block has fully left the screen it resets, so it animates
   again when it comes back, scrolling down or up.

   Call useScrollReveal() once in a page's root component. It walks every
   <section> and <footer>, unwraps single-child wrappers, and reveals each
   block; card grids and rows of 3+ items reveal item by item. Pages can
   steer it with classes: .dk-reveal / .td-reveal mark a block that reveals
   as one, .dk-stagger marks a list whose items reveal one by one.

   Left alone: the page heroes (they have their own GSAP intro), the pinned
   WooCommerce carousel, and anything marked data-no-reveal. Off for
   visitors who prefer reduced motion. */

const SKIP_REGIONS = ".dk-hero, .dk-woo, .p-hero, .td-hero, [data-no-reveal]";
const BLOCK = ".dk-reveal, .td-reveal";
const LIST = ".dk-stagger";
const ATOMIC = "a, button, form, label, input, select, textarea, img, picture, video, table";
const IGNORE_TAGS = new Set(["SCRIPT", "STYLE", "LINK", "TEMPLATE", "BR", "svg"]);

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
  if (el.closest(SKIP_REGIONS)) return;
  const kids = kidsOf(el);
  const push = (x) => { if (isVisible(x)) out.push(x); };
  const dive = () => kids.forEach((k) => collect(k, out, depth + 1));
  // Page-marked blocks and lists come first
  if (depth > 0 && el.matches(BLOCK)) return push(el);
  if (el.matches(LIST)) return kids.forEach(push);
  // Buttons, links, forms and media are always one block, never split up
  if (depth > 5 || (depth > 0 && el.matches(ATOMIC))) return push(el);
  // A skipped region or a marked block/list sits inside: go one level deeper
  if (el.querySelector(SKIP_REGIONS + ", " + BLOCK + ", " + LIST)) return dive();
  // Section roots and single-child wrappers are just wrappers
  if (depth === 0 || kids.length === 1) return dive();
  if (isGroup(el, kids)) {
    // A short row of simple cells (table row, logo strip, icon row) reveals as one row
    if (el.getBoundingClientRect().height < 96 && !kids.some(isContainer)) return push(el);
    return kids.forEach(push);
  }
  // A wrapper around other layout boxes (e.g. heading block + grid): go inside
  if (kids.some(isContainer)) return dive();
  // A leaf block (heading, paragraph, button row...): reveal as one
  push(el);
}

function init() {
  if (typeof IntersectionObserver === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const roots = [...document.querySelectorAll("section, footer")].filter((r) => !r.parentElement.closest("section, footer"));
  const items = [];
  roots.forEach((r) => {
    if (r.matches(SKIP_REGIONS)) return;
    if (!kidsOf(r).length) { if (isVisible(r)) items.push(r); return; }
    collect(r, items);
  });
  const unique = [...new Set(items)].filter((el) => !items.some((o) => o !== el && o.contains(el)));
  unique.forEach((el) => el.classList.add("rv-pending"));

  const timers = new Map();
  const show = (list) => {
    // Blocks entering together follow one another top-to-bottom, left-to-right
    list.sort((a, b) => {
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      return Math.abs(ra.top - rb.top) > 8 ? ra.top - rb.top : ra.left - rb.left;
    });
    list.filter((el) => el.classList.contains("rv-pending")).forEach((el, i) => {
      const delay = Math.min(i, 8) * 90;
      el.style.setProperty("--rv-delay", delay + "ms");
      el.classList.add("rv-anim");
      el.classList.remove("rv-pending");
      // Drop the reveal transition afterwards so the element's own transitions work again
      clearTimeout(timers.get(el));
      timers.set(el, setTimeout(() => { el.classList.remove("rv-anim"); el.style.removeProperty("--rv-delay"); }, 950 + delay));
    });
  };
  const hide = (el) => {
    // Fully off screen: reset instantly, with no transition, so it plays again on the way back
    clearTimeout(timers.get(el));
    el.classList.remove("rv-anim");
    el.style.removeProperty("--rv-delay");
    el.classList.add("rv-pending");
  };

  // Reveal once a block is a little way up from the bottom edge...
  const showIO = new IntersectionObserver((entries) => {
    show(entries.filter((e) => e.isIntersecting).map((e) => e.target));
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });
  // ...and reset it only when it is completely out of view
  const hideIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (!e.isIntersecting) hide(e.target); });
  }, { rootMargin: "0px", threshold: 0 });
  unique.forEach((el) => { showIO.observe(el); hideIO.observe(el); });

  // At the very end of the page, blocks in the last 8% of the screen can never
  // cross the reveal line, so show whatever is still waiting on screen.
  const onScroll = () => {
    const doc = document.documentElement;
    if (window.scrollY + window.innerHeight < doc.scrollHeight - 4) return;
    show(unique.filter((el) => el.classList.contains("rv-pending") && el.getBoundingClientRect().top < window.innerHeight));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    showIO.disconnect(); hideIO.disconnect();
    window.removeEventListener("scroll", onScroll);
    timers.forEach(clearTimeout);
  };
}

export function useScrollReveal() {
  useLayoutEffect(() => init(), []);
}
