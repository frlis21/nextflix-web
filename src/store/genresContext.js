import { createContextProvider } from "@solid-primitives/context";
import { createSignal } from "solid-js";
import { API_BASE } from "../common/constants";

async function fetchGenres() {
  const response = await fetch(API_BASE + "/genres");
  const object = await response.json();
  return object.genres;
}

export const [GenresProvider, useGenres] = createContextProvider(() => {
  const [genres, setGenres] = createSignal([]);
  fetchGenres().then((v) => {
    setGenres(v);
  });

  return genres;
});
