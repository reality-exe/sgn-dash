import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["./assets/css/main.css"],
  plugins: [
    "./plugins/pocketbase.ts"
  ],
  modules: [
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "nuxt-particles",
    "@nuxt/icon",
    "@nuxt/image",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  colorMode: {
    classSuffix: "",
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});