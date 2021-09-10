module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://localhost:5000',
        target: 'https://batcave.wzmxx.com',
        ws: true,
        changeOrigin: true,
      }
    }
  }
};
