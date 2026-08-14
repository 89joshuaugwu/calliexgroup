import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // three.js ships as an ES module tree that Next needs to transpile
  // (required for @react-three/fiber / @react-three/drei on the App Router).
  transpilePackages: ["three"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dgxxhrwxm/**",
      },
      // Left in ONLY so old blordgroup.ng-hotlinked seed content still
      // renders while real assets are migrated into Cloudinary. Remove
      // this block once every field in Callie X CMS points at a real
      // Cloudinary URL — see README "Media migration" section.
      {
        protocol: "https",
        hostname: "blordgroup.ng",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
