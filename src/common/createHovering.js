import { createSignal } from "solid-js";
import createToggle from "./createToggle";

function createHovering() {
  const [hovering, setHovering] = createSignal(false);

  const onMouseEnter = () => setHovering(true);
  const onMouseLeave = () => setHovering(false);
  const directive = (el) => {
    setHovering(el.matches(":hover"));
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    // Do I cleanup here?
  };

  return [hovering, directive];
}

export default createHovering;
