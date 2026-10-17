import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: { input: ["index.html", "question-option-sizes.html", "dropdown-review.html", "navigation-v042-consumer.html", "navigation-v042-w3-consumer.html", "navigation-v042-w6-consumer.html"] },
  },
});
