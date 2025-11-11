import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://ecovest-api.onrender.com/:path*", 
      },
    ];
  },
};

export default nextConfig;
