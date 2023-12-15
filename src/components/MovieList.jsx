import {
  Show,
  createSignal,
  createEffect,
  createResource,
  createMemo,
  onMount,
  splitProps,
} from "solid-js";
import { createStore } from "solid-js/store";
import {
  DotsThreeOutline,
  MagnifyingGlass,
  X,
  ThumbsUp,
  ThumbsDown,
} from "phosphor-solid";
import { createEventProps } from "@solid-primitives/event-props";
import Modal from "../components/Modal";
import { useUser, useGenres } from "../store";
import { Transition } from "solid-transition-group";
import { API_BASE } from "../common/constants";
import { moviesById } from "../common/createMovies";
import { useWindowScrollPosition } from "@solid-primitives/scroll";

function MovieInfo(props) {
  const movie = () => moviesById[props.id];
  const [user, { like, dislike }] = useUser();

  const likes = () => props.id in user.ratings && user.ratings[props.id];
  const dislikes = () => props.id in user.ratings && !user.ratings[props.id];

  return (
    <div class="max-w-5xl rounded-lg overflow-hidden">
      <div
        class="bg-cover bg-center"
        style={{
          "background-image": `url("${movie().backdrop}")`,
        }}
      >
        <div class="flex justify-between items-center p-4 bg-black/80">
          <h1 class="text-white font-black text-5xl">{movie().name}</h1>
          <button
            onClick={props.onExit}
            class="aspect-square rounded-full hover:bg-red-500 p-2 transition"
          >
            <X color="white" weight="bold" size={32} />
          </button>
        </div>
      </div>
      <div class="bg-white p-4 flex gap-4">
        <p class="">{movie().synopsis}</p>
        <div class="space-y-4">
          <button
            onClick={() => like(props.id)}
            classList={{
              "bg-neutral-300": !likes(),
              "bg-green-500": likes(),
            }}
            class="aspect-square p-4 rounded-full group hover:bg-green-300 transition"
          >
            <ThumbsUp
              class="m-auto group-hover:-rotate-6 group-active:-rotate-12 transition"
              weight="duotone"
              color="white"
              size={32}
            />
          </button>
          <button
            onClick={() => dislike(props.id)}
            classList={{
              "bg-neutral-300": !dislikes(),
              "bg-red-500": dislikes(),
            }}
            class="aspect-square p-4 rounded-full group hover:bg-red-300 transition"
          >
            <ThumbsDown
              class="m-auto group-hover:rotate-6 group-active:rotate-12 transition"
              weight="duotone"
              color="white"
              size={32}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function Movie(props) {
  const [user] = useUser();
  const [showMovie, setShowMovie] = createSignal(false);
  const movie = () => moviesById[props.id];
  const thumbClass = "absolute inset-0 pointer-events-none";

  // TODO: make modal less terrible :T
  return (
    <>
      <Transition
        enterActiveClass="transition"
        exitActiveClass="transition"
        enterClass="opacity-0"
        exitToClass="opacity-0"
      >
        <Show when={showMovie()}>
          <Modal
            onClickOutside={() => setShowMovie(false)}
            class="flex items-center justify-center"
          >
            <MovieInfo onExit={() => setShowMovie(false)} id={props.id} />
          </Modal>
        </Show>
      </Transition>
      <div
        classList={{
          grayscale: props.id in user.ratings,
        }}
        class="relative aspect-[2/3] group"
      >
        <img
          onClick={() => setShowMovie(true)}
          class="w-full h-full bg-cover shadow-black shadow-lg cursor-pointer
        group-hover:shadow-2xl group-hover:shadow-black group-hover:scale-110 transition"
          src={movie().poster}
        />
        <Show when={props.id in user.ratings}>
          <Show
            when={user.ratings[props.id]}
            fallback={
              <ThumbsDown class={thumbClass} size="100%" color="white" />
            }
          >
            <ThumbsUp class={thumbClass} size="100%" color="white" />
          </Show>
        </Show>
      </div>
    </>
  );
}

function Indicator(props) {
  return (
    <div
      ref={props.ref}
      class="flex p-4 aspect-[2/3] bg-neutral-500 h-full w-full shadow-black shadow-lg animate-pulse"
    >
      <DotsThreeOutline class="w-full h-full" />
    </div>
  );
}

function MovieList(props) {
  return (
    <div class="grid grid-cols-5 max-w-6xl gap-8">
      <For each={props.movies}>{(movie) => <Movie id={movie} />}</For>
      <Show when={true}>
        <Indicator />
        <Indicator />
        <Indicator />
        <Indicator />
        <Indicator />
        <Indicator />
        <Indicator />
      </Show>
    </div>
  );
}

export default MovieList;
