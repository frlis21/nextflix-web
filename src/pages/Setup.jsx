import {
  Show,
  createSignal,
  createEffect,
  createResource,
  createMemo,
  splitProps,
  onMount,
  untrack,
} from "solid-js";
import { createStore } from "solid-js/store";
import { A, useNavigate } from "@solidjs/router";
import { X, MagnifyingGlass, Eye, ThumbsDown, ThumbsUp } from "phosphor-solid";
import { createEventProps } from "@solid-primitives/event-props";
import Modal from "../components/Modal";
import MovieList from "../components/MovieList";
import createFilter from "../common/createFilter";
import { useGenres } from "../store";
import { Transition } from "solid-transition-group";
import { API_BASE } from "../common/constants";
import { createElementBounds } from "@solid-primitives/bounds";
import createMovies from "../common/createMovies";

// TODO: stop using globals.......
const [filters, setFilters] = createStore({
  actors: [],
  directors: [],
  genres: [],
});

const [selectedGenres, setSelectedGenres] = createSignal([]);
const [selectedActors, setSelectedActors] = createSignal([]);
const [selectedDirectors, setSelectedDirectors] = createSignal([]);

const [step, setStep] = createSignal(1);

function Bar(props) {
  const navigate = useNavigate();

  return (
    <div class="sticky bottom-0 flex flex-row-reverse py-2 px-8 justify-between items-center bg-white border-t-2 border-black">
      <div class="flex gap-4 items-center">
        <button
          onClick={() => {
            if (step() >= 2) {
              navigate("/")
            } else {
              setStep((v) => v + 1)}
            }
          }
          class="p-2 border-2 border-black rounded-lg font-black
        hover:text-white hover:border-turquoise hover:bg-turquoise transition"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}

async function fetchActors(query) {
  const searchParams = new URLSearchParams({ search: query });
  const url = API_BASE + "/actors?" + searchParams;
  const response = await fetch(url);
  const object = await response.json();
  return object.actors;
}

async function fetchDirectors(query) {
  const searchParams = new URLSearchParams({ search: query });
  const url = API_BASE + "/directors?" + searchParams;
  const response = await fetch(url);
  const object = await response.json();
  return object.directors;
}

function Faves(props) {
  // TODO: use the factory pattern
  const [genreSearch, setGenreSearch] = createSignal("");
  const genres = useGenres();

  const GenreFilter = createFilter(
    createMemo(() => {
      const query = genreSearch();
      if (query === "") {
        return genres();
      } else {
        return genres().filter((genre) =>
          genre.toLowerCase().includes(query.toLowerCase()),
        );
      }
    }),
    setSelectedGenres,
    setGenreSearch,
  );

  const [actorSearch, setActorSearch] = createSignal("");
  const [actors] = createResource(actorSearch, fetchActors, {
    initialValue: [],
  });
  const ActorFilter = createFilter(actors, setSelectedActors, setActorSearch);

  const [directorSearch, setDirectorSearch] = createSignal("");
  const [directors] = createResource(directorSearch, fetchDirectors, {
    initialValue: [],
  });
  const DirectorFilter = createFilter(
    directors,
    setSelectedDirectors,
    setDirectorSearch,
  );

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
          <GenreFilter label="Genres:" name="genres" />
          <ActorFilter label="Actors:" name="actors" />
          <DirectorFilter label="Directors:" name="directors" />
        </div>
      </div>
    </div>
  );
}

function Divider() {
  let ref;
  onMount(() =>
    setTimeout(() => ref.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    }, 200)),
  );
  return <hr ref={ref} />;
}

function Setup() {
  let inputRef;
  const [target, setTarget] = createSignal();
  const [query, setQuery] = createSignal("");

  const bounds = createElementBounds(target);
  const atBottom = createMemo(() => bounds.bottom - 512 < window.innerHeight);
  const movieLoader = createMemo(() =>
    createMovies({
      search: query(),
      directors: selectedDirectors(),
      actors: selectedActors(),
      genres: selectedGenres(),
    }),
  );
  const movieIds = createMemo(() =>
    movieLoader()[0].movies.map((movie) => movie.id),
  );

  // Load more movies at bottom of page
  createEffect(() => {
    const [movies, loadMovies] = movieLoader();
    if (
      step() >= 2 &&
      atBottom() &&
      untrack(() => !movies.fetching && movies.page < movies.pages)
    ) {
      loadMovies();
    }
  });

  return (
    <>
      <Faves />
      <Show when={step() >= 2}>
        <Divider />
        <div
          ref={setTarget}
          class="min-h-screen p-8 flex flex-col gap-8 items-center"
        >
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
              onInput={(e) => setQuery(e.target.value)}
              ref={inputRef}
            />
            <X
              onClick={() => {
                inputRef.value = "";
                setQuery("");
              }}
              size={32}
              class="aspect-square rounded-full hover:bg-neutral-200 p-2 transition cursor-pointer"
            />
          </div>
          <MovieList movies={movieIds()} />
        </div>
      </Show>
      <Bar />
    </>
  );
}

export default Setup;
