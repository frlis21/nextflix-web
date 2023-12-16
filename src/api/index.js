import { useUser } from "../store";
import { API_BASE } from "../common/constants";

// Cache
const moviesById = {};

export async function fetchMovies(searchParams) {
  const response = await fetch(API_BASE + "/movies?" + (searchParams || ""));
  const data = await response.json();
  for (const movie of data.movies) {
    moviesById[movie.id] = movie
  }
  return data
}

export async function fetchRecommendations(page) {
  const [user] = useUser();
  const response = await fetch(
    `${API_BASE}/users/${user.email}/recommendations?page=${page || 1}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  const data = await response.json();
  for (const movie of data.movies) {
    moviesById[movie.id] = movie
  }
  return data
}

export async function fetchMovie(id) {
  if (!(id in moviesById)) {
    const response = await fetch(`${API_BASE}/movies/${id}`);
    const data = await response.json();
    moviesById[id] = data.movie;
  }

  return moviesById[id];
}
