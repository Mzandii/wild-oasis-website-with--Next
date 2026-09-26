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
    ],
  },
};

export default nextConfig;
