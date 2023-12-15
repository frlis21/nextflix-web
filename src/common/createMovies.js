import {
  createSignal,
  untrack,
} from "solid-js";
import { createStore } from "solid-js/store";
import { API_BASE } from "./constants";

// Movies cache
// TODO: do this the real way :T
export const moviesById = {};

async function fetchMovies(searchParams) {
  const response = await fetch(
    API_BASE + "/movies?" + (searchParams || ""),
  );
  return await response.json();
}

export function createMovies(params) {
  const [store, setStore] = createStore({
    fetching: false,
    page: 0,
    pages: 1,
    movies: [],
  });

  async function loadMore() {
    setStore({ fetching: true });
    const response = await fetchMovies(new URLSearchParams([
      ["search", params.search],
      ...params.genres.map((genre) => ["genre", genre]),
      ...params.actors.map((actor) => ["actor", actor]),
      ...params.directors.map((director)=> ["director", director]),
      ["page", untrack(() => store.page + 1)],
    ]));
    for (const movie of response.movies) {
      // Cache the movies
      moviesById[movie.id] = movie;
    }
    setStore({
      fetching: false,
      page: response.page,
      pages: response.pages,
      movies: untrack(() => [...store.movies, ...response.movies]),
    });
  }

  // Load first batch of movies
  loadMore()

  return [store, loadMore];
}

