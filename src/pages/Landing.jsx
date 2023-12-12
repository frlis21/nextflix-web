import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { SkipForwardCircle } from "phosphor-solid";

function NavLink(props) {
  return (
    <A class="text-neutral-400 hover:text-neutral-300 transition" href={props.href}>
      {props.children}
    </A>
  );
}

function TopBar() {
  return (
    <nav class="flex justify-between content-center p-4">
      <A class="text-transparent bg-clip-text bg-gradient-to-br from-turquoise to-black font-black text-5xl" href="/">
        NEXTFLIX
      </A>
      <div class="grow flex items-center justify-center gap-16">
        <NavLink href="/">ABOUT</NavLink>
        <NavLink href="/">MOVIES</NavLink>
        <NavLink href="/">TV SHOWS</NavLink>
        <NavLink href="/"></NavLink>
      </div>
      <button class="border-2 border-black hover:border-turquoise hover:bg-turquoise hover:text-white transition font-bold text-xs rounded-lg px-4">
        LOG IN
      </button>
    </nav>
  );
}

function Field(props) {
  return (
    <div class="relative">
      <label class="absolute text-xs bottom-full">{props.label}</label>
      <input
        class="p-2 bg-gray-200 rounded-lg w-full"
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
}

function Template() {
  return (
    <>
      <div class={"min-h-screen bg-feelsgood bg-no-repeat bg-fixed bg-right-bottom"}>
        <TopBar />
        <div class="flex flex-col justify-items-center justify-center p-8 gap-6">
          <h1 class="text-5xl font-bold relative left-0 top-0">
            Many hours spent <br />
            Looking for the right movie. <br />
            Ah, never again.
          </h1>
          <h2 class="text-2xl text-neutral-500">Sign up today!</h2>
          <div class="max-w-lg flex gap-4">
            <div class="grow grid grid-cols-1 gap-6">
              <Field label="Name:" placeholder="Billy Bumpkins" />
              <Field label="E-mail:" placeholder="bbumpkins@gmail.com" />
              <Field label="Password:" type="password" placeholder="Password" />
            </div>
            <button class="rounded-lg bg-turquoise hover:bg-turquoise-light p-4 transition">
              <SkipForwardCircle weight="duotone" color="white" size={64} />
            </button>
          </div>
        </div>
      </div>
      <div class="h-96 bg-gray-200">hi</div>
    </>
  );
}

export default Template;
