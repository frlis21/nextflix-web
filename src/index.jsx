/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { StoreProvider } from "./store";
import { BASE } from "./common/constants";

import "./index.css";
import App from "./App";

const root = document.getElementById("root");

async function enableMocking() {
  //if (import.meta.env.MODE !== "development") {
  //  return;
  //}

  const { worker } = await import("./mocks/browser");

  return worker.start({
    onUnhandledRequest(request, print) {
      if (
        request.url.includes("nextflix-web") ||
        request.url.includes("image.tmdb.org")
      ) {
        return;
      }

      print.warning();
    },
    serviceWorker: {
      url: "/nextflix-web/mockServiceWorker.js",
    },
  });
}

enableMocking().then(() =>
  render(
    () => (
      <StoreProvider>
        <Router base={BASE}>
          <App />
        </Router>
      </StoreProvider>
    ),
    root,
  ),
);
