import { createResource } from "solid-js";
import { fetchMovie } from "../api";

function createMovie(id) {
  return createResource(id, fetchMovie)[0];
}

export default createMovie;
