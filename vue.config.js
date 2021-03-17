const path = require("path");
module.exports = {
  chainWebpack: (config) => {
    // lazyload 한번에 리소스를 다운받기보다는 해당라우터에서 필요한 리로스만 다운받을수있도록
    config.plugins.delete("prefetch");
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
    resolve: {
      alias: {
        "@": path.join(__dirname, "src/"),
      },
    },
  },
};
