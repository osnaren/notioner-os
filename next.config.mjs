/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // Enable styled-components support
    styledComponents: true,
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'image.tmdb.org',
      'via.placeholder.com',
      'localhost',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Enable React Server Components
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
    // Enable concurrent features
    serverActions: true,
    // Enable optimized package imports
    optimizePackageImports: ['@heroicons/react', 'lodash-es'],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_BASE_URL || 'http://localhost:3000'}/api/:path*`,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Add custom webpack configurations here
    if (!isServer) {
      // Configure webpack for client-side only
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Add support for importing SVG as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
