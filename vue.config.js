const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

// 빌드할때 [mini-css-extract-plugin] Conflicting order 경고(각컴포넌트에서 다른컴포넌트를 가져올때 template에 작성된순서로 component import 하기)
module.exports = {
  chainWebpack: (config) => {
    // lazyload 한번에 리소스를 다운받기보다는 해당라우터에서 필요한 리로스만 다운받을수있도록
    config.plugins.delete("prefetch");
  },
  configureWebpack: {
    // 배포를 할때 여러개의 chunk css와js로 split되는것을 막아줌, 빌드된 js의 용량크기를 줄여줌
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      // 번들된 파일들을 보여주는 ui 플러그인
      new BundleAnalyzerPlugin(),
    ],
    // 웹펙이 추천해주는 힌트 제거
    performance: {
      hints: false,
    },
    resolve: {
      alias: {
        "@": path.join(__dirname, "src/"),
      },
    },
  },
  filenameHashing: false,
  productionSourceMap: false,
};
