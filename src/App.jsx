import { createSignal } from "solid-js";
import { Route } from "@solidjs/router";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { useUser } from "./store";

function App() {
  const [user] = useUser();

  return (
  <>
    <Route path="/" component={user.isLoggedIn ? Home : Landing} />
  </>
  );
}

export default App;
