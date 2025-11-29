import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.cnn.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  }
};

export default nextConfig;
