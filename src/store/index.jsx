import { MultiProvider } from "@solid-primitives/context";
import { UserProvider, useUser } from "./userContext";

export function StoreProvider(props) {
  return (
    <MultiProvider values={[UserProvider]}>{props.children}</MultiProvider>
  );
}

export { useUser };
