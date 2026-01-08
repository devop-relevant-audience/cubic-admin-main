/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
  env: {
    // declare here all your variables
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    R2_ENDPOINT: process.env.R2_ENDPOINT,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  reactStrictMode: false,
  images: {
    domains: [
      "d2bqflr8m8bwzk.cloudfront.net", // cloudfront
      "cubicadminddb288dae560483ca52316caecbc358fe16e9-dev.s3.ap-southeast-1.amazonaws.com", // s3
      "pub-4c959168d8674c2186033baca9574e4c.r2.dev",
      "celestial-storage.space"
    ],
  },
};

export default nextConfig;
