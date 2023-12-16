import { createSignal, untrack } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchRecommendations } from "../api";

export function createRecommendations() {
  const [store, setStore] = createStore({
    fetching: false,
    page: 0,
    pages: 1,
    movies: [],
  });

  async function loadMore() {
    setStore({ fetching: true, page: untrack(() => store.page + 1) });
    const response = await fetchRecommendations(store.page);
    setStore({
      fetching: false,
      pages: response.pages,
      movies: untrack(() => [...store.movies, ...response.movies]),
    });
  }

  // Load first batch of recommendations
  loadMore();

  return [store, loadMore];
}
