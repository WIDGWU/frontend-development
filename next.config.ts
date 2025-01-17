import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_X_CSRFToken: process.env.NEXT_PUBLIC_X_CSRFToken,
    NEXT_PUBLIC_BASE_URL_PROD: process.env.NEXT_PUBLIC_BASE_URL_PROD,
  },
};

export default nextConfig;
