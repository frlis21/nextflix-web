import { createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import { SkipForwardCircle } from "phosphor-solid";
import { useUser } from "../store";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal();
  const [password, setPassword] = createSignal();
  const [user, { login }] = useUser();

  return (
    <div class="flex flex-col min-h-screen bg-feelsgood bg-no-repeat bg-right-bottom">
      <Navbar />
      <div class="absolute inset-0 pointer-events-none flex grow justify-center items-center">
        <div class="flex flex-col max-w-lg gap-4 pointer-events-auto">
          <div class="flex gap-2">
            <div class="space-y-2">
              <InputField update={setEmail} label="E-mail" />
              <InputField update={setPassword} label="Password" type="password" />
            </div>
            <button
              onClick={async () => {
                await login(email(), password())
                if (user.isLoggedIn) {
                  navigate("/")
                }
              }}
              class="rounded-lg bg-turquoise hover:bg-turquoise-light p-4 transition"
            >
              <SkipForwardCircle weight="duotone" color="white" size={64} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
