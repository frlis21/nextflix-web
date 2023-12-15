import { http, HttpResponse } from "msw";
import { API_BASE } from "../common/constants";
import data from "./data";

const PAGE_SIZE = 20;
const moviesById = Object.fromEntries(
  data.movies.map((movie) => [movie.id, movie]),
);

const users = {
  admin: {
    name: "Administrator",
    password: "password",
  },
};

export const handlers = [
  http.get(API_BASE + "/movies", ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const filters = [];
    if (searchParams.has("search") && searchParams.get("search") !== "") {
      filters.push((movie) =>
        movie.name
          .toLowerCase()
          .includes(searchParams.get("search").toLowerCase()),
      );
    }
    if (searchParams.has("director")) {
      const directors = new Set(searchParams.getAll("director"));
      filters.push((movie) =>
        movie.directors.some((director) => directors.has(director)),
      );
    }
    if (searchParams.has("actor")) {
      const actors = new Set(searchParams.getAll("actor"));
      filters.push((movie) =>
        movie.starring.some((actor) => actors.has(actor)),
      );
    }
    if (searchParams.has("genre")) {
      const genres = new Set(searchParams.getAll("genre"));
      filters.push((movie) => movie.genres.some((genre) => genres.has(genre)));
    }
    const primary = new Set(),
      secondary = new Set(data.movies.map((movie) => movie.id));
    for (const filter of filters) {
      for (const movie of data.movies) {
        if (filter(movie)) {
          primary.add(movie.id);
          secondary.delete(movie.id);
        }
      }
    }
    const movies = [...primary.values(), ...secondary.values()].map(
      (id) => moviesById[id],
    );
    const pages = Math.ceil(movies.length / PAGE_SIZE);
    const page =
      (searchParams.has("page") && Math.min(searchParams.get("page"), pages)) ||
      1;
    return HttpResponse.json({
      page,
      pages,
      movies: movies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    });
  }),

  http.get(API_BASE + "/movies/:id", ({ params }) => {
    return HttpResponse.json({
      movie: data.movies.find((movie) => movie.id === params.id),
    });
  }),

  http.get(API_BASE + "/actors", ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const actors =
      (searchParams.has("search") &&
        data.stars.filter((actor) =>
          actor
            .toLowerCase()
            .includes(searchParams.get("search").toLowerCase()),
        )) ||
      data.stars;
    const pages = Math.ceil(actors.length / PAGE_SIZE);
    const page =
      (searchParams.has("page") && Math.min(searchParams.get("page"), pages)) ||
      1;
    return HttpResponse.json({
      page,
      pages,
      actors: actors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    });
  }),

  http.get(API_BASE + "/directors", ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const directors =
      (searchParams.has("search") &&
        data.directors.filter((director) =>
          director
            .toLowerCase()
            .includes(searchParams.get("search").toLowerCase()),
        )) ||
      data.directors;
    const pages = Math.ceil(directors.length / PAGE_SIZE);
    const page =
      (searchParams.has("page") && Math.min(searchParams.get("page"), pages)) ||
      1;
    return HttpResponse.json({
      page,
      pages,
      directors: directors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    });
  }),

  http.get(API_BASE + "/genres", () => {
    return HttpResponse.json({ genres: data.genres });
  }),

  http.post(API_BASE + "/authenticate", async ({ request }) => {
    const info = await request.formData();
    const email = info.get("email");
    const password = info.get("password");
    return users[email].password === password
      ? HttpResponse.json({
          token: "dummy",
        })
      : new HttpResponse(null, {
          status: 418,
        });
  }),

  http.post(API_BASE + "/register", async ({ request }) => {
    const info = await request.formData();
    const name = info.get("name");
    const email = info.get("email");
    const password = info.get("password");

    if (email in users) {
      new HttpResponse(null, {
        status: 418,
      });
    }

    users[email] = {
      name,
      password,
    };

    return HttpResponse.json({
      token: "dummy",
    });
  }),
];
