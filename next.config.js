/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: process.env.DEV_MODE ? undefined : "export",
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false }
    return config
  },
}

export default nextConfig
