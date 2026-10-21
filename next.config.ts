import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [1, 25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sbvmobypcvhkfwkczejn.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ],
  },
  cacheComponents: true,
  experimental: {
    webpackMemoryOptimizations: true,
  },
  reactCompiler: true,
  allowedDevOrigins: ["192.168.1.4"],
};

export default nextConfig;
