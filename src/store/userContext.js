import { createContextProvider } from "@solid-primitives/context";
import { createStore } from "solid-js/store";

export const [UserProvider, useUser] = createContextProvider(() => {
  const [user, setUser] = createStore({
    name: null,
    token: null,
    get isLoggedIn() {
      return false;
      //return this.token !== null;
    },
  });

  return [
    user,
    {
      login: (username, password) => {},
    },
  ];
});
