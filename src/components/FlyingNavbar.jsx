import { Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import useBasedMatch from "../common/useBasedMatch";
import Nextflix from "./Nextflix";

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

function FlyingNavbar() {
  const isLoggingIn = useBasedMatch(() => "/login");

  return (
    <nav class="flex justify-between content-center items-center p-4">
      <Nextflix />
      <div class="grow flex items-center justify-center gap-16">
        <NavLink href="/about">ABOUT</NavLink>
        <NavLink href="/movies">MOVIES</NavLink>
        <NavLink href="/movies">TV SHOWS</NavLink>
      </div>
      <A
        href={isLoggingIn() ? "/" : "/login"}
        class="text-center border-2 border-black h-fit
        hover:border-turquoise hover:bg-turquoise hover:text-white 
        transition font-bold text-xs rounded-lg px-4 py-2"
      >
        {isLoggingIn() ? "REGISTER" : "LOG IN"}
      </A>
    </nav>
  );
}

export default FlyingNavbar;
