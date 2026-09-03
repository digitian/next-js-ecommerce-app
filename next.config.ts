import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Product images are served from picsum.photos (placeholder) and Unsplash (lifestyle/room-scene imagery).
  // These remote patterns are intentional and permanent for the current phase.
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
