/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "rx-db.rxserver.net" }],
  },
};

export default nextConfig;
