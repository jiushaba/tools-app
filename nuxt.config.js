const pkg = require('./package')



module.exports = {
  mode: 'universal',
  // mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
      // ,{
      //   "http-equiv":"Content-Security-Policy",
      //   content:"upgrade-insecure-requests"
      // }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [{
      src: "http://pv.sohu.com/cityjson?ie=utf-8"
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: 'blue'
  },

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/main.css',
    './static/font/iconfont.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
   '~plugins/axios',
   '~/plugins/route'
  ],
  router: {
    mode: 'history',
    isAddDynamicMenuRoutes:false   //// 是否已经添加动态(菜单)路由
  },

  modules: [
    '@nuxtjs/axios'
  ],
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {

    },

  },
  cache: false
}
