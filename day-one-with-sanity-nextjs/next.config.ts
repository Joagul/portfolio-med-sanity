import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Enable static export
  // output: "export",
};

export default nextConfig;
