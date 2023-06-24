/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  experimental: { serverActions: true },
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "merakiui.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.dog.ceo",
        port: "",
        pathname: "/breeds/**",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
