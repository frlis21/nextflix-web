import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/posts", () => {
    console.log('Captured a "GET /posts" request');
  }),
];
