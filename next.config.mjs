/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site (no server-side code) — exported to ./out for Netlify.
  output: "export",
  images: {
    // next/image optimization isn't available in static export
    unoptimized: true,
  },
};

export default nextConfig;
