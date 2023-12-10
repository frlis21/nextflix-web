import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  base: "/nextflix-web/",
  plugins: [solid()],
});
