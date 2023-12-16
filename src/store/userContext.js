import { createEffect, on, batch } from "solid-js";
import { createContextProvider } from "@solid-primitives/context";
import { createStore, reconcile } from "solid-js/store";
import { API_BASE } from "../common/constants";
import { makePersisted } from "@solid-primitives/storage";

export const [UserProvider, useUser] = createContextProvider(() => {
  const [user, setUser] = createStore({
    name: null,
    email: null,
    token: null,
    get isLoggedIn() {
      return this.token !== null;
    },
    ratings: {},
  });

  // Update info when email/token changes
  // TODO: this is terrible
  createEffect(
    on(
      () => [user.email, user.token],
      async ([email, token]) => {
        if (!email || !token) {
          return;
        }
        const response = await fetch(`${API_BASE}/users/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser({ name: data.name, ratings: data.ratings });
        }
      },
    ),
  );

  function postLike(id) {
    return fetch(`${API_BASE}/users/${user.email}/movies/${id}/like`, {
      method: "POST",
    });
  }

  function postDislike(id) {
    return fetch(`${API_BASE}/users/${user.email}/movies/${id}/dislike`, {
      method: "POST",
    });
  }

  return [
    user,
    {
      login: async (email, password) => {
        const formData = new FormData();
        formData.set("email", email);
        formData.set("password", password);
        const response = await fetch(API_BASE + "/authenticate", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setUser({ email, token: data.token });
        }
      },
      logout: () => {
        setUser({
          name: null,
          email: null,
          token: null,
          ratings: reconcile({}),
        })
      },
      register: async (name, email, password) => {
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        const response = await fetch(API_BASE + "/register", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setUser({ name, email, token: data.token });
        }
      },
      like: async (id) => {
        const response = await postLike(id);
        if (response.ok) {
          setUser("ratings", id, user.ratings[id] === true ? undefined : true);
        }
      },
      dislike: async (id) => {
        const response = await postDislike(id);
        if (response.ok) {
          setUser(
            "ratings",
            id,
            user.ratings[id] === false ? undefined : false,
          );
        }
      },
    },
  ];
});
