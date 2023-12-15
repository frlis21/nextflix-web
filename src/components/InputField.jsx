import { createEffect, createMemo, createSignal } from "solid-js";

const TEXT_SIZE = "text-base";

function InputField(props) {
  const [isFocused, setFocused] = createSignal(false);
  const [value, setValue] = createSignal("");
  const shouldYeet = createMemo(() => isFocused() || value() !== "");
  const onInput = (e) => {
    setValue(e.target.value)
    props.update?.(e.target.value)
  }

  return (
    <div class="py-2 px-3 bg-gray-200 rounded-lg w-full">
      <div class="relative">
        <label
          classList={{
            absolute: true,
            transition: true,
            "bottom-0": true,
            "pointer-events-none": true,
            "origin-bottom-left": true,
            "scale-50": shouldYeet(),
            "-translate-y-[90%]": shouldYeet(),
            "text-neutral-400": !shouldYeet(),
          }}
        >
          {props.label}
        </label>
        <input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onInput={onInput}
          class="bg-transparent focus:outline-none h-full w-full pt-2"
          type={props.type}
        />
      </div>
    </div>
  );
}

export default InputField;
