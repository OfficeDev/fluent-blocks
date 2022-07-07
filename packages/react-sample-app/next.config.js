const {join} = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@fluent-blocks/react'] = join(__dirname, '../react/esm')
    config.resolve.alias['@fluent-blocks/colors'] = join(__dirname, '../colors/esm')
    return config
  },
}

module.exports = nextConfig
