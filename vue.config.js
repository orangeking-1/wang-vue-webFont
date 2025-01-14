// 使用webpack-bundle-analyzer进行bundle分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  devServer: {
    port: 8888,
    open: false
  },

  // 引入百度地图
  configureWebpack: {
    externals: {
      'BMap': 'BMap'
    }
  },

  // 配置pwa
  pwa: {
    name: 'orangeking',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#ffffff',

    // 配置 workbox 插件
    workboxPluginMode: 'InjectManifest',
    // workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // InjectManifest 模式下 swSrc 是必填的。
      swSrc: 'src/sw.js', // 本地sw.js相对路径
      // importWorkboxFrom: 'disabled', // 决定是否引入workbox
      exclude: [/\.html$/, /\.css.map$/, /sw.js$/] // 缓存列表排除的文件，可以是文件名或正则
    },
    // 配置icon
    iconPaths: {
      favicon32: 'ifavicon.ico',
      favicon16: 'ifavicon.ico',
      appleTouchIcon: 'ifavicon.ico',
      maskIcon: 'img/icons/gen.svg',
      msTileImage: 'ifavicon.ico'
    }
  },




 /* webpack相关配置   *该对象将会被 webpack-merge 合并入最终的 webpack 配置   */
//   configureWebpack: (config) => {
//     config.plugins.push(new BundleAnalyzerPlugin());
//  }


}
