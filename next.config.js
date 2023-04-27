/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@tremor/react", "mysql2"],
  },
  images: {
    domains: ["tailwindui.com", "images.unsplash.com", "lh3.googleusercontent.com"],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig
