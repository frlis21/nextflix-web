import { Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import useBasedMatch from "../common/useBasedMatch";
import Nextflix from "./Nextflix";
import { useUser } from "../store";

function NavLink(props) {
  return (
    <A
      class="text-neutral-400 hover:text-neutral-300 transition"
      href={props.href}
    >
      {props.children}
    </A>
  );
}

function Navbar() {
  const [user, { logout }] = useUser();
  const navigate = useNavigate();
  const isLoggingIn = useBasedMatch(() => "/login");

  const buttonText = () => {
    if (user.isLoggedIn) {
      return "LOG OUT";
    } else if (isLoggingIn()) {
      return "REGISTER";
    } else {
      return "LOG IN";
    }
  };

  return (
    <nav class="flex justify-between content-center items-center p-4">
      <Nextflix />
      <div class="grow flex items-center justify-center gap-16">
        <NavLink href="/about">ABOUT</NavLink>
        <NavLink href="/movies">MOVIES</NavLink>
        <NavLink href="/movies">TV SHOWS</NavLink>
        <NavLink href="/community">COMMUNITY</NavLink>
      </div>
      <button
        onClick={() => {
          if (user.isLoggedIn) {
            logout();
            navigate("/");
          } else if (isLoggingIn()) {
            navigate("/");
          } else {
            navigate("/login");
          }
        }}
        class="text-center border-2 border-black h-fit
        hover:border-turquoise hover:bg-turquoise hover:text-white 
        transition font-bold text-xs rounded-lg px-4 py-2"
      >
        {buttonText()}
      </button>
    </nav>
  );
}

export default Navbar;
