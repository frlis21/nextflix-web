import { createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import InputField from "../components/InputField";
import Nextflix from "../components/Nextflix";
import Navbar from "../components/Navbar";
import { useUser } from "../store";
import { SkipForwardCircle, ArrowCircleDown } from "phosphor-solid";

function Landing(props) {
  const navigate = useNavigate();
  const [user, { register }] = useUser();
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  return (
    <div class="min-h-screen bg-feelsgood bg-no-repeat bg-fixed bg-right-bottom">
      <Navbar />
      <div class="flex flex-col p-8 gap-6">
        <h1 class="text-5xl font-bold">
          Many hours spent <br />
          Looking for the right movie. <br />
          Ah, never again.
        </h1>
        <h2 class="text-2xl text-neutral-500">Sign up today!</h2>
        <div class="max-w-lg flex gap-4">
          <div class="grow grid grid-cols-1 gap-6">
            <InputField update={setName} label="Name" />
            <InputField update={setEmail} label="E-mail" />
            <InputField update={setPassword} label="Password" type="password" />
          </div>
          <button
            onClick={async () => {
              await register(name(), email(), password())
              if (user.isLoggedIn) {
                navigate("/setup");
              }
            }}
            class="flex items-center rounded-lg bg-turquoise hover:bg-turquoise-light p-4 transition"
          >
            <SkipForwardCircle weight="duotone" color="white" size={64} />
          </button>
        </div>
      </div>
      <div class="flex absolute bottom-4 left-4 items-center">
        <ArrowCircleDown size={64} />
        <p class="text-neutral-400">Read more below!</p>
      </div>
    </div>
  );
}

export default Landing;
