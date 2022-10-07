import { defineConfig } from "astro/config";
import Windicss from "vite-plugin-windicss";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://qterr.netlify.app",
  vite: {
    plugins: [Windicss()],
  },
  integrations: [solidJs()],
});
