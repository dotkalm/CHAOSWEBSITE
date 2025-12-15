/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? '/CHAOSWEBSITE' : '')

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  reactStrictMode: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
