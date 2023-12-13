import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import InputField from "../components/InputField";
import FlyingNavbar from "../components/FlyingNavbar";
import { SkipForwardCircle } from "phosphor-solid";

function Login() {
  return (
    <div class="flex flex-col min-h-screen bg-feelsgood bg-no-repeat bg-right-bottom">
      <FlyingNavbar />
      <div class="absolute inset-0 pointer-events-none flex grow justify-center items-center">
        <div class="flex flex-col max-w-lg gap-4 pointer-events-auto">
          <div class="flex gap-2">
            <div class="space-y-2">
              <InputField label="E-mail" />
              <InputField label="Password" />
            </div>
            <A
              href="/"
              class="rounded-lg bg-turquoise hover:bg-turquoise-light p-4 transition"
            >
              <SkipForwardCircle weight="duotone" color="white" size={64} />
            </A>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
