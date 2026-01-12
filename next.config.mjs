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
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2bqflr8m8bwzk.cloudfront.net", // cloudfront (legacy)
      },
      {
        protocol: "https",
        hostname: "cubicadminddb288dae560483ca52316caecbc358fe16e9-dev.s3.ap-southeast-1.amazonaws.com", // s3 (legacy)
      },
      {
        protocol: "https",
        hostname: "pub-4c959168d8674c2186033baca9574e4c.r2.dev", // R2 (legacy)
      },
      {
        protocol: "https",
        hostname: "celestial-storage.space", // R2 custom domain (legacy)
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com", // Vercel Blob
      },
    ],
  },
};

export default nextConfig;
