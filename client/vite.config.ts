import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  return {
    base: isProd ? "/ERP-CRM-Portal/" : "/",
    plugins: [react()],
  };
});