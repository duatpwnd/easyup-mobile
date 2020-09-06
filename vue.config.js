const path = require("path");
module.exports = {
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
