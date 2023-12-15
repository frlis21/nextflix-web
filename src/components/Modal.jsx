import { createSignal, splitProps } from "solid-js";
import { Portal } from "solid-js/web";

function Modal(props) {
  const [local, others] = splitProps(props, [
    "children",
    "onClickOutside",
    "class",
  ]);

  return (
      <div
        {...others}
        onClick={(e) =>
          e.currentTarget === e.target && local.onClickOutside?.()
        }
        class={`fixed inset-0 bg-black/80 z-50 ${local.class}`}
      >
        <div {...others}>{local.children}</div>
      </div>
  );
}

export default Modal;
