/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public", // Stores the service worker & manifest
  register: true,
  skipWaiting: true,
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withPWA(withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"], // ✅ Allows external images from TMDb
    formats: ["image/avif", "image/webp"], // ✅ Enables optimized formats
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
  experimental: {
    images: {
      allowFutureImage: true, // ✅ (Optional) Allows `next/future/image`
    },
    modern: true, // Enable modern JavaScript output
  },
}));

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
};
