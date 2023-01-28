const webpack = require('webpack')
const { parsed: env } = require('dotenv').config()

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(env))
    return config
}
}
