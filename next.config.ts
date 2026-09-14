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
    // Preserve fine textile patterns and small printing details. In Next 16,
    // this allowlist also becomes the effective default when no quality prop
    // is supplied because 90 is the only permitted value.
    qualities: [90],
  },
};

export default nextConfig;
