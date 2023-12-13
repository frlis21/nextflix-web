import { useMatch } from "@solidjs/router";
import { BASE } from "./constants";

function useBasedMatch(path) {
  return useMatch(() => BASE + path());
}

export default useBasedMatch;
