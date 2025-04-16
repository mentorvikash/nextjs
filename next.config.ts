import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compilerOptions: {
    baseUrl: ".", // this is important
    paths: {
      "@/*": ["./*"],
    },
  },
};

export default nextConfig;
