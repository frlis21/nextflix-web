import { createSignal, Show } from "solid-js";
import { Route } from "@solidjs/router";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Setup from "./pages/Setup";
import { useUser } from "./store";

function App() {
  const [user] = useUser();

  return (
    <>
      <Route path="/setup" component={Setup} />
      <Route path="/" component={user.isLoggedIn ? Home : Landing} />
      <Show when={!user.isLoggedIn}>
        <Route path="/login" component={Login} />
      </Show>
    </>
  );
}

export default App;
