import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // ⛔ disables linting during build
  },
  /* config options here */
};

export default nextConfig;
