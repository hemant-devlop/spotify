/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pagalworld.is',
      },
      {
        protocol: 'https',
        hostname: '**.pagalworld.is',
      },
    ],
  },
};

export default nextConfig;
