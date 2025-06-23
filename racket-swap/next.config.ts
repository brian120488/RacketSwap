import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Correct protocol format
        hostname: 'racket-swap.s3.us-east-2.amazonaws.com', // Hostname without a trailing slash
        pathname: '/listings/**', // Use double asterisk for wildcard
      },
    ]
  },
};

export default nextConfig;
