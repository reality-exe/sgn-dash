/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ hostname: "rx-db.rxserver.net" }],
  },
};

export default nextConfig;
