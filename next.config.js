/** @type {import('next').NextConfig} */
// Only use basePath for GitHub Pages, not for Vercel
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
const basePath = isGitHubPages ? '/CHAOSWEBSITE' : ''

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
