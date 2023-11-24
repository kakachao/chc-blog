const withNextra = require('nextra')({
  theme: './theme.tsx',
  themeConfig: './theme.config.js',
  // optional: add `unstable_staticImage: true` to enable Nextra's auto image import
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // any configs you need
}

module.exports = withNextra(nextConfig)
