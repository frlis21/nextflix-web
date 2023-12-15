import { createContextProvider } from "@solid-primitives/context";
import { createStore } from "solid-js/store";
import { API_BASE } from "../common/constants";
import { makePersisted } from "@solid-primitives/storage";

export const [UserProvider, useUser] = createContextProvider(() => {
  const [user, setUser] = makePersisted(createStore({
    name: null,
    token: null,
    get isLoggedIn() {
      return this.token !== null;
    },
    ratings: {},
  }));

  return [
    user,
    {
      login: (email, password) => {},
      register: async (name, email, password) => {
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        const response = await fetch(API_BASE + "/register", {
          method: "POST",
          body: formData,
        });
      },
      like: (id) =>
        setUser("ratings", id, user.ratings[id] === true ? undefined : true),
      dislike: (id) =>
        setUser("ratings", id, user.ratings[id] === false ? undefined : false),
    },
  ];
});
