/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
  domains: ["localhost", "127.0.0.1"],
  remotePatterns: [
   {
    protocol: "http",
    hostname: "localhost",
    port: "3000",
   },
  ],
  dangerouslyAllowSVG: true,
 },
 env: {
  NEXT_PUBLIC_API_URL:
   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  NEXT_PUBLIC_APP_URL:
   process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
 },
};

module.exports = nextConfig;
