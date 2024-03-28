/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: process.env.DEV_MODE ? undefined : "export"
}

export default nextConfig