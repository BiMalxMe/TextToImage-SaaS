import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dvb8lhl7t/image/upload/**',
      },
    ],
  },
  experimental: {
    nodeMiddleware: true, // Enable Node.js middleware support
  },};



export default nextConfig;
