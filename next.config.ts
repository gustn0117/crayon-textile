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
  // Two root layouts (ko/en) leave no single place for a 404; this routes
  // unmatched URLs to app/global-not-found.tsx instead.
  experimental: { globalNotFound: true },
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
