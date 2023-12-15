import {
  Show,
  createSignal,
  createMemo,
  createEffect,
  onMount,
  splitProps,
  Suspense,
} from "solid-js";
import { createStore } from "solid-js/store";
import { X } from "phosphor-solid";
import { createEventProps } from "@solid-primitives/event-props";
import { Transition } from "solid-transition-group";

function Tag(props) {
  return (
    <button
      onClick={props.onClick}
      class="flex gap-2 items-center text-xs rounded-full bg-gray-300 px-2 py-1 border-2 border-transparent hover:border-black transition"
    >
      <Show when={props.selected}>
        <X />
      </Show>
      {props.name}
    </button>
  );
}

function Filter(props) {
  // Props themselves never change so this is OK
  // Someday we will use contexts instead
  const choices = props.choices;
  const search = props.search;
  const [items, setItems] = props.signal;
  let inputRef;

  return (
    <div class="flex flex-col rounded-xl gap-4 p-4 bg-white border-2">
      <label class="text-2xl">{props.label}</label>
      <div
        onClick={() => inputRef.focus()}
        class="w-full p-4 flex flex-wrap gap-2 rounded-xl cursor-text border-2 border-black"
      >
        <For each={items()}>
          {(choice) => (
            <Tag
              name={choice}
              selected={true}
              onClick={() =>
                setItems((current) => current.filter((item) => item !== choice))
              }
            />
          )}
        </For>
        <input
          ref={inputRef}
          class="focus:outline-none grow select-all"
          placeholder={`Search for ${props.name}...`}
          onClick={(e) => {
            e.target.select();
            search(e.target.value);
          }}
          onInput={(e) => search(e.target.value)}
        />
      </div>
      <div class="flex flex-wrap gap-2">
        <Suspense fallback="loading...">
          <For each={choices().filter((choice) => !items().includes(choice))}>
            {(choice) => (
              <Tag
                name={choice}
                onClick={() => {
                  setItems((current) => [...current, choice]);
                  inputRef.select();
                  search("");
                }}
              />
            )}
          </For>
        </Suspense>
      </div>
    </div>
  );
}

function createFilter(choices, setSelected, search) {
  const [items, setItems] = createSignal([]);
  // TODO: use context
  return (props) => (
    <Filter
      {...props}
      search={search}
      choices={choices}
      signal={[
        items,
        (v) => {
          setItems(v);
          setSelected(v);
        },
      ]}
    />
  );
}

export default createFilter;
