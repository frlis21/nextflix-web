import { useUser } from "../store";
import {
  ThumbsUp,
  ThumbsDown,
} from "phosphor-solid";

function createLikePair(id) {
  const [user, { like, dislike }] = useUser();

  const likes = () => id() in user.ratings && user.ratings[id()];
  const dislikes = () => id() in user.ratings && !user.ratings[id()];

  const Like = (props) => (
    <button
      onClick={() => like(id())}
      classList={{
        "bg-neutral-300": !likes(),
        "bg-green-500": likes(),
      }}
      class="aspect-square p-4 rounded-full group hover:bg-green-300 transition"
    >
      <ThumbsUp
        class="m-auto group-hover:-rotate-6 group-active:-rotate-12 transition"
        weight="duotone"
        color="white"
        size={props.size}
      />
    </button>
  );
  const Dislike = (props) => (
    <button
      onClick={() => dislike(id())}
      classList={{
        "bg-neutral-300": !dislikes(),
        "bg-red-500": dislikes(),
      }}
      class="aspect-square p-4 rounded-full group hover:bg-red-300 transition"
    >
      <ThumbsDown
        class="m-auto group-hover:rotate-6 group-active:rotate-12 transition"
        weight="duotone"
        color="white"
        size={props.size}
      />
    </button>
  );

  return [Like, Dislike]
}

export default createLikePair;
