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
  /* config options here */
};



export default nextConfig;
