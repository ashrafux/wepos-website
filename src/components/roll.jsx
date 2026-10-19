import React from "react";
import "../styles/roll.css";

/* Primary-button hover from the Dokan CTA: the label rolls up while a copy
   rises from below, and the arrow slides out to the right while a copy enters
   from the left. Put `roll-btn` on the button, wrap its label in <RollText>
   and its arrow in <RollIcon>. Inside a circle, pass `fill` so the arrow
   travels across the whole circle. Pure CSS; see roll.css. */

export function RollText({ children }) {
  return (
    <span className="roll-text">
      <span className="roll-t">{children}</span>
      <span className="roll-t roll-clone" aria-hidden="true">{children}</span>
    </span>
  );
}

export function RollIcon({ children, fill = false }) {
  return (
    <span className={"roll-icon" + (fill ? " roll-fill" : "")}>
      <span className="roll-i">{children}</span>
      <span className="roll-i roll-clone" aria-hidden="true">{children}</span>
    </span>
  );
}
