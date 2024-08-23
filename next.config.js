/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: 'https://debug-api.tscircuit.com/api/:path*',
        },
      ]
    }
  }
}

export default nextConfig
