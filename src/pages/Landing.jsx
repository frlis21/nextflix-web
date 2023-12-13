import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import InputField from "../components/InputField";
import Nextflix from "../components/Nextflix";
import FlyingNavbar from "../components/FlyingNavbar";
import { SkipForwardCircle, ArrowCircleDown } from "phosphor-solid";

function FirstScreen(props) {
  return (
    <div class="relative min-h-screen bg-feelsgood bg-no-repeat bg-fixed bg-right-bottom">
      <FlyingNavbar />
      <div class="flex flex-col p-8 gap-6">
        <h1 class="text-5xl font-bold">
          Many hours spent <br />
          Looking for the right movie. <br />
          Ah, never again.
        </h1>
        <h2 class="text-2xl text-neutral-500">Sign up today!</h2>
        <div class="max-w-lg flex gap-4">
          <div class="grow grid grid-cols-1 gap-6">
            <InputField label="Name" />
            <InputField label="E-mail" />
            <InputField label="Password" type="password" />
          </div>
          <A href="/setup" class="flex items-center rounded-lg bg-turquoise hover:bg-turquoise-light p-4 transition">
            <SkipForwardCircle weight="duotone" color="white" size={64} />
          </A>
        </div>
      </div>
      <div class="flex absolute bottom-4 left-4 items-center">
        <ArrowCircleDown size={64} />
        <p class="text-neutral-400">Read more below!</p>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <>
      <FirstScreen />
      <div class="h-96 bg-gray-200">hi</div>
    </>
  );
}

export default Landing;
