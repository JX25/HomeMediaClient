//const fs = require('fs')

module.exports = {
  "transpileDependencies": [
  ],
  devServer:{
    https: false
  },
  pwa: {
    name: 'Home Media Center',
    themeColor: '#5a32a8',
    msTileColor: '#000000',
    display: 'standalone',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW'    
  }
}