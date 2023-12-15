import { MultiProvider } from "@solid-primitives/context";
import { UserProvider, useUser } from "./userContext";
import { GenresProvider, useGenres } from "./genresContext";

export function StoreProvider(props) {
  return (
    <MultiProvider values={[UserProvider, GenresProvider]}>{props.children}</MultiProvider>
  );
}

export { useUser, useGenres };
