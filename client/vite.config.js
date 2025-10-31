import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
// import { config } from "dotenv";

// // Load environment variables from .env file
// config();
export default defineConfig({
  plugins: [tailwindcss()],
});
