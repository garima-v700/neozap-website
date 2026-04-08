/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/api/mcp/asset/**',
      },
    ],
  },
  // Suppress ESLint errors during build on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Allow builds to complete even with TypeScript warnings
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
