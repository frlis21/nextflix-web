import { createSignal, untrack } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchMovies } from "../api";

function createMovies(params) {
  const [store, setStore] = createStore({
    fetching: false,
    page: 0,
    pages: 1,
    movies: [],
  });

  async function loadMore() {
    setStore({ fetching: true });
    const data = await fetchMovies(
      new URLSearchParams([
        ["search", params.search],
        ...params.genres.map((genre) => ["genre", genre]),
        ...params.actors.map((actor) => ["actor", actor]),
        ...params.directors.map((director) => ["director", director]),
        ["page", untrack(() => store.page + 1)],
      ]),
    );
    setStore({
      fetching: false,
      page: data.page,
      pages: data.pages,
      movies: untrack(() => [...store.movies, ...data.movies]),
    });
  }

  // Load first batch of movies
  loadMore();

  return [store, loadMore];
}

export default createMovies;
