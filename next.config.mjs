import { imageHosts } from './image-hosts.config.mjs';

// BUILD_TARGET=mobile produces a fully static export in ./out that Capacitor
// bundles into the Android / iOS apps (there is no Node server on a phone).
const isMobile = process.env.BUILD_TARGET === 'mobile';

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: !isMobile,
  distDir: process.env.DIST_DIR || '.next',
  ...(isMobile && {
    output: 'export',
    // Emit /route/index.html so every page resolves as a real file inside the app bundle.
    trailingSlash: true,
  }),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // The Next image optimizer needs a server, so it is disabled for the mobile build.
    unoptimized: isMobile,
    remotePatterns: imageHosts,
    minimumCacheTTL: 60,
    qualities: [75, 85, 100],
  },
  webpack(
    config,
    {
      dev: dev
    }
  ) {
    if (dev) {
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: '@dhiwise/component-tagger/nextLoader',
        }],
      });
      const ignoredPaths = (process.env.WATCH_IGNORED_PATHS || '')
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      config.watchOptions = {
        ignored: ignoredPaths.length
          ? ignoredPaths.map((p) => `**/${p.replace(/^\/+|\/+$/g, '')}/**`)
          : undefined,
      };
    }
    return config;
  },
};
export default nextConfig;