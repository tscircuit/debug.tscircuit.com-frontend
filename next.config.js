/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: process.env.DEV_MODE ? undefined : "export",
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/soup_group/:soup_group_name",
          destination: "/soup_group/[soup_group_name]",
        },
      ],
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
