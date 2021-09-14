const pxtorem = require('postcss-pxtorem')
const path = require('path')
const fs = require('fs')

module.exports = {
  devServer: {
    https: true,
    proxy: {
      '/api': {
        // target: 'http://localhost:5000',
        target: 'https://batcave.wzmxx.com',
        ws: true,
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            exclude: 'node_modules'
          })
        ]
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
  }
}
