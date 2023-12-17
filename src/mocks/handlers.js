import { http, HttpResponse } from "msw";
import { API_BASE } from "../common/constants";
import data from "./data";

const PAGE_SIZE = 20;
const moviesById = Object.fromEntries(
  data.movies.map((movie) => [movie.id, movie]),
);

function recommend(ratings) {
  // Just shuffle movies
  return data.movies
    .filter((movie) => !(movie.id in ratings))
    .map((value) => ({ value, key: Math.random() }))
    .sort((a, b) => a.key - b.key)
    .map(({ value }) => value);
}

const users = {
  admin: {
    name: "Administrator",
    password: "password",
    ratings: {},
    recommendations: recommend({}),
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
    if (!(email in users) || users[email].password !== password) {
      return new HttpResponse(null, { status: 418 });
    }
    users[email].recommendations = recommend(users[email].ratings);
    return HttpResponse.json({
      token: "dummy",
    });
  }),

  http.get(API_BASE + "/users/:email", async ({ params }) => {
    if (params.email in users) {
      return HttpResponse.json(users[params.email]);
    }
    return new HttpResponse(null, { status: 418 });
  }),

  http.post(API_BASE + "/register", async ({ request }) => {
    const info = await request.formData();
    const name = info.get("name");
    const email = info.get("email");
    const password = info.get("password");

    if (email in users || email === "" || password === "") {
      return new HttpResponse(null, { status: 418 });
    }

    users[email] = {
      name,
      password,
      ratings: {},
    };

    users[email].recommendations = recommend({});

    return HttpResponse.json({
      token: "dummy",
    });
  }),

  http.post(API_BASE + "/users/:email/movies/:id/like", async ({ params }) => {
    if (params.email in users) {
      if (users[params.email].ratings[params.id] === true) {
        delete users[params.email].ratings[params.id];
      } else {
        users[params.email].ratings[params.id] = true;
      }
      users[params.email].recommendations = recommend(
        users[params.email].ratings,
      );
      return new HttpResponse(null, { status: 200 });
    }
    return new HttpResponse(null, { status: 418 });
  }),

  http.post(
    API_BASE + "/users/:email/movies/:id/dislike",
    async ({ params }) => {
      if (params.email in users) {
        if (users[params.email].ratings[params.id] === false) {
          delete users[params.email].ratings[params.id];
        } else {
          users[params.email].ratings[params.id] = false;
        }
        users[params.email].recommendations = recommend(
          users[params.email].ratings,
        );
        return new HttpResponse(null, { status: 200 });
      }
      return new HttpResponse(null, { status: 418 });
    },
  ),

  http.get(
    API_BASE + "/users/:email/recommendations",
    ({ request, params }) => {
      const recommendations = users[params.email].recommendations;
      const searchParams = new URL(request.url).searchParams;
      const pages = Math.ceil(recommendations.length / PAGE_SIZE);
      const page =
        (searchParams.has("page") &&
          Math.min(searchParams.get("page"), pages)) ||
        1;
      return HttpResponse.json({
        page,
        pages,
        movies: recommendations.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
      });
    },
  ),
];
