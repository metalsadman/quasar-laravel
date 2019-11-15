// Configuration for your app
const path = require('path'),
  SymlinkWebpackPlugin = require('symlink-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    boot: ['i18n', 'axios'],
    css: ['app.sass'],
    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      // 'ionicons-v4',
      'mdi-v4'
      // 'mdi-v3'
      // 'fontawesome-v5',
      // 'eva-icons'
    ],
    supportIE: false,
    build: {
      distDir: 'public',
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })

        if (ctx.prod) {
          cfg.plugins.push(
            new CopyWebpackPlugin([
              {
                from: path.resolve(__dirname, 'public_files'),
                to: ''
              }
            ])
          )

          cfg.plugins.push(
            new SymlinkWebpackPlugin({
              origin: '../storage/app/public',
              symlink: 'storage'
            })
          )
        }
      }
      // env: {
      //   api: JSON.stringify(
      //     ctx.dev ? '/api' : 'http://some.endpoint/api' // production end-point
      //   )
      // }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
      proxy: [
        {
          context: ['/api', '/storage'],
          target: 'http://localhost:8000' // laravel end-point
        }
      ],
      historyApiFallback: true
    },
    framework: {
      all: 'auto',
      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'LocalStorage',
        'SessionStorage',
        'LoadingBar'
      ],

      // iconSet: 'material-icons',

      iconSet: 'material-icons',
      // lang: 'de' // Quasar language
      config: {
        // cordova: {
        //   backButtonExit: false
        // },
        loadingBar: {
          color: 'accent'
        }
      }
    },
    animations: 'all', // --- includes all animations
    // animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      }
    }
  }
}
