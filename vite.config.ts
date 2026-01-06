import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
            "@components": fileURLToPath(
                new URL("./src/components", import.meta.url),
            ),
            "@composables": fileURLToPath(
                new URL("./src/composables", import.meta.url),
            ),
            "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
        },
    },
    build: {
        outDir: "dist",
        assetsDir: "assets",
        sourcemap: false,
        minify: "terser",
    },
});
