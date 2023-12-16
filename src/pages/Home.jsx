import {
  Show,
  createEffect,
  createSignal,
  createMemo,
  createResource,
} from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useUser } from "../store";
import { IMG_BASE } from "../common/constants";
import { createRecommendations } from "../common/createRecommendations";
import Navbar from "../components/Navbar";
import createLikePair from "../common/createLikePair";
import createHovering from "../common/createHovering";

function Home() {
  const [list, loadMore] = createRecommendations();
  const [topRec] = createResource(
    () => list.movies[0],
    (movie) => movie,
  );
  const [runnerUps] = createResource(
    () => list.movies.slice(2, 5),
    (movies) => movies,
  );
  const [Like, Dislike] = createLikePair(() => topRec()?.id);
  const [hovering, hoveringDirective] = createHovering();
  const navigate = useNavigate()

  return (
    <div class="min-h-screen overflow-hidden">
      <Navbar />
      <div class="grid grid-cols-2 p-4 gap-4">
        <div
          class="bg-neutral-200 rounded-xl overflow-hidden shadow-xl shadow-black/70"
          style={{
            "background-image":
              topRec() && `url("${IMG_BASE}w1280${topRec().backdrop}")`,
          }}
        >
          <div class="flex flex-col items-center gap-4 backdrop-blur-lg p-4 bg-black/50 text-white">
            <h1 class="text-3xl font-thin">Our top recommendation for you:</h1>
            <div class="grid grid-cols-2 justify-items-center gap-4">
              <img
                class="aspect-[2/3] shadow-black shadow-lg"
                src={IMG_BASE + "w342" + topRec()?.poster}
              />
              <div class="flex flex-col justify-between">
                <div>
                  <h2 class="text-4xl font-black">{topRec()?.name}</h2>
                  <p>{topRec()?.synopsis}</p>
                </div>
                <div class="flex justify-around">
                  <Like size={64} />
                  <Dislike size={64} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <h1 class="text-center text-3xl font-thin">Your queue:</h1>
          <div class="relative flex place-content-center">
            <img
              class="absolute aspect-[2/3] transition"
              style={{
                transform: hovering()
                  ? "scale(55%) perspective(20cm) translateX(55%) rotateY(-30deg) "
                  : "scale(60%) perspective(20cm) translateX(50%) rotateY(-30deg) ",
              }}
              src={IMG_BASE + "w342" + runnerUps()?.[2]?.poster}
            />
            <img
              class="aspect-[2/3]"
              style={{
                transform: "scale(70%) perspective(20cm) rotateY(-30deg)",
              }}
              src={IMG_BASE + "w342" + runnerUps()?.[1]?.poster}
            />
            <img
              class="absolute aspect-[2/3] transition"
              style={{
                transform: hovering()
                  ? "scale(85%) perspective(20cm) translateX(-55%) rotateY(-30deg) "
                  : "scale(80%) perspective(20cm) translateX(-50%) rotateY(-30deg) ",
              }}
              src={IMG_BASE + "w342" + runnerUps()?.[0]?.poster}
            />
            <button
              use:hoveringDirective
              onClick={() => navigate("/queue")}
              classList={{
                "opacity-0": !hovering(),
              }}
              class="absolute transition text-5xl text-white font-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 w-full bg-white/30 backdrop-blur-md"
            >
              START
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
