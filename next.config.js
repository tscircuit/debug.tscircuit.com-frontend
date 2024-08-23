/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: process.env.DEV_MODE ? undefined : "export",
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false }
    return config
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://debug-api.tscircuit.com/api/:path*',
      },
    ];
  },
}

export default nextConfig
