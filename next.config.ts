import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A package-lock.json in the home directory can otherwise make Turbopack
  // treat the whole home directory as this app's workspace during `next dev`.
  // Keep its file watcher and cache scoped to this repository.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
