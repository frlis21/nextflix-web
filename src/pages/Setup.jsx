import { Show, createSignal, createEffect, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { X, MagnifyingGlass, Eye, ThumbsDown, ThumbsUp } from "phosphor-solid";
import { createEventProps } from "@solid-primitives/event-props";

function Bar(props) {
  return (
    <div class="sticky bottom-0 flex flex-row-reverse py-2 px-8 justify-between items-center bg-white border-t-2 border-black">
      <div class="flex gap-4 items-center">
        <p class="text-right">
          Please select at least one of each, or{" "}
          <A class="text-blue-600 hover:underline" href="/">
            skip this step
          </A>
          .
        </p>
        <button
          class="p-2 border-2 border-black rounded-lg font-black
        hover:text-white hover:border-turquoise hover:bg-turquoise transition"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}

function Tag(props) {
  return (
    <button class="flex gap-2 items-center text-xs rounded-full bg-gray-300 px-2 py-1 border-2 border-transparent hover:border-black transition">
      <Show when={props.selected}>
        <X />
      </Show>
      {props.name}
    </button>
  );
}

function Filter(props) {
  let inputRef;
  return (
    <div class="flex flex-col rounded-xl gap-4 p-4 bg-white border-2">
      <label class="text-2xl">{props.label}</label>
      <div
        onClick={() => inputRef.focus()}
        class="w-full p-4 flex flex-wrap gap-2 rounded-xl cursor-text border-2 border-black"
      >
        <Tag name="Jennifer Lawrence" selected />
        <Tag name="Jennifer Lawrence" selected />
        <Tag name="Jennifer Lawrence" selected />
        <input
          ref={inputRef}
          class="focus:outline-none grow"
          placeholder={`Search for ${props.name}...`}
        />
      </div>
      <div class="flex flex-wrap gap-2">
        <Tag name="Quentin Tarantino" />
        <Tag name="Billy Bananaface" />
        <Tag name="Billy Bananaface" />
        <Tag name="Billy Bananaface" />
        <Tag name="Billy Bananaface" />
      </div>
    </div>
  );
}

function Faves(props) {
  return (
    <div class="flex flex-col gap-4 items-center p-4">
      <div class="flex flex-col gap-4 max-w-3xl items-center">
        <h1 class="text-5xl font-bold text-center">
          Let&apos;s get you set up!
        </h1>
        <h3 class="text-3xl text-neutral-400 text-center">
          Choose your favorite
          <emph class="italic"> and least favorite </emph>
          genres, actors and directors.
        </h3>
        <div class="flex flex-col gap-8 max-w-lg pb-8">
          <Filter label="Genres:" name="genres" />
          <Filter label="Actors:" name="actors" />
          <Filter label="Directors:" name="directors" />
        </div>
      </div>
    </div>
  );
}

function Movie(props) {
  const [events, eventProps] = createEventProps("hover");
  return (
    <div class="aspect-[2/3] min-w-[12rem] group">
      <div
        class="w-full h-full bg-cover shadow-black shadow-lg group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-black transition"
        style={{ "background-image": `url("${props.thumbnail}")` }}
      >
        <div class="text-white w-full h-full bg-black/80 opacity-0 transition group-hover:opacity-100 flex flex-col p-4 justify-between">
          <h1 class="font-black text-3xl">{props.title}</h1>
          <div class="flex justify-between py-4">
            <div class="group/like cursor-pointer">
              <ThumbsUp class="group-hover/like:-translate-y-3 group-hover/like:-rotate-3 transition" size={64} />
            </div>
            <div class="group/dislike cursor-pointer">
            <ThumbsDown class="group-hover/dislike:translate-y-3 group-hover/dislike:rotate-3 transition" size={64} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Movies() {
  return (
    <div class="min-h-screen p-8 flex flex-col gap-8 items-center">
      <h3 class="text-3xl text-neutral-400 text-center">
        Which of these movies have you watched?
      </h3>
      <div class="flex border-2 border-black p-2 rounded-full gap-4 w-full max-w-lg items-center">
        <MagnifyingGlass
          size={32}
          class="aspect-square rounded-full hover:bg-neutral-200 p-2 transition cursor-pointer"
        />
        <input
          class="flex-1 bg-transparent focus:outline-none"
          placeholder="Search movies..."
        />
        <X
          size={32}
          class="aspect-square rounded-full hover:bg-neutral-200 p-2 transition cursor-pointer"
        />
      </div>
      <div class="flex flex-wrap max-w-4xl justify-center gap-8">
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
        <Movie
          title="Frozen"
          thumbnail="https://www.themoviedb.org/t/p/original/itAKcobTYGpYT8Phwjd8c9hleTo.jpg"
        />
      </div>
    </div>
  );
}

function Setup() {
  let target;
  const [favesSelected, setFavesSelected] = createSignal();

  return (
    <>
      <Faves
        onFinished={() => {
          setFavesSelected(true);
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }}
      />
      <Show when={true}>
        <hr ref={target} />
        <Movies />
      </Show>
      <Bar />
    </>
  );
}

export default Setup;
