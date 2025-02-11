import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  };
  
  module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'openweathermap.org',
          port: '',
          pathname: 'img/wn/**',
          search: '',
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
};

export default nextConfig;
