import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // For testing, will be deleted in prod.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ],
  },
};

export default nextConfig;
