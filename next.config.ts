import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⛔ disables linting during build
  },
  /* config options here */
};

export default nextConfig;
