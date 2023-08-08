/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "apis.news.newton.ac.th",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
