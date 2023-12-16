import {
  Show,
  createEffect,
  createSignal,
  createMemo,
  createResource,
  untrack,
} from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useUser } from "../store";
import { IMG_BASE } from "../common/constants";
import { createRecommendations } from "../common/createRecommendations";
import Navbar from "../components/Navbar";
import createLikePair from "../common/createLikePair";
import createHovering from "../common/createHovering";

function Queue() {
  const [num, setNum] = createSignal(0);
  const [list, loadMore] = createRecommendations();
  const [currentRec] = createResource(
    () => list.movies[num()],
    (movie) => movie,
  );
  const [nextRec] = createResource(
    () => list.movies[num() + 1],
    (movie) => movie,
  );
  const [Like, Dislike] = createLikePair(() => currentRec()?.id);
  const [hovering, hoveringDirective] = createHovering();
  const navigate = useNavigate();

  // Load more as we near the end
  createEffect(() => (num() > untrack(() => list.movies.length) - 5) && loadMore())

  return (
    <div class="min-h-screen flex flex-col">
      <Navbar />
      <div class="grow flex p-8 gap-8 justify-evenly items-stretch">
        <div class="grow flex justify-center items-center">
          <img
            style={{
              transform: "perspective(20cm) rotateY(30deg) ",
            }}
            class="aspect-[2/3] max-w-md"
            src={IMG_BASE + "w780" + currentRec()?.poster}
          />
        </div>
        <div class="flex flex-col max-w-xl justify-between">
          <div class="flex flex-col gap-4">
            <h1 class="text-5xl font-black">{currentRec()?.name}</h1>
            <p>{currentRec()?.synopsis}</p>
          </div>
          <div class="flex gap-2"><Like  size={64}/><Dislike  size={64}/></div>
        </div>
        <div class="grow flex justify-center items-center">
          <img
            use:hoveringDirective
            onClick={() => setNum((n) => n + 1)}
            style={{
              transform: hovering()
                ? "perspective(20cm) rotateY(-20deg)"
                : "perspective(20cm) rotateY(-60deg)",
            }}
            class="aspect-[2/3] max-w-md opacity-50 transition cursor-pointer"
            src={IMG_BASE + "w780" + nextRec()?.poster}
          />
        </div>
      </div>
    </div>
  );
}

export default Queue;
