import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /collection shipped before the fabric taxonomy replaced it.
  async redirects() {
    return [
      { source: "/collection", destination: "/fabrics/design", permanent: true },
      { source: "/en/collection", destination: "/en/fabrics/design", permanent: true },
    ];
  },
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
