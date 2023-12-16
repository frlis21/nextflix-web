import { createSignal, Show } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import Queue from "./pages/Queue";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Setup from "./pages/Setup";
import Layout from "./pages/Layout";
import { useUser } from "./store";
import { BASE } from "./common/constants";

function Root() {
  const [user] = useUser();

  return (
    <Show when={user.isLoggedIn} fallback={<Landing />}>
      <Home />
    </Show>
  );
}

function App() {
  const [user] = useUser();

  return (
    <Router base={BASE}>
      <Route path="/" component={Root} />
      <Show when={user.isLoggedIn}>
        <Route path="/queue" component={Queue} />
        <Route path="/setup" component={Setup} />
      </Show>
      <Show when={!user.isLoggedIn}>
        <Route path="/login" component={Login} />
      </Show>
    </Router>
  );
}

export default App;
