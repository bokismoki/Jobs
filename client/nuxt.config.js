require('dotenv').config()
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '</Jobs> - %s',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'If you are a company and you want to find employees as soon as possible then we are the right place for you. Create job offers and connect them with your company\'s site, your potential emloyee will easily hear about you and start applying for the job.' },
      { hid: 'og:title', name: 'og:title', content: '</Jobs>' },
      { hid: 'og:locale', name: 'og:locale', content: 'en_EU' },
      { hid: 'og:url', name: 'og:url', content: 'https://jobs-it.herokuapp.com' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:image', name: 'og:image', content: 'https://images.pexels.com/photos/830891/pexels-photo-830891.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
      { hid: 'og:description', name: 'og:description', content: 'If you are a company and you want to find employees as soon as possible then we are the right place for you. Create job offers and connect them with your company\'s site, your potential emloyee will easily hear about you and start applying for the job.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700;900&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-awesome-swiper', mode: 'client' },
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/axios' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-svg-loader',
    '@nuxtjs/recaptcha'
  ],

  /*
  ** Google Recaptcha
  */
  recaptcha: {
    size: 'normal',
    version: 2,
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    language: 'v2',
    hideBadge: false
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://jobs-it-server.herokuapp.com/api'
  },

  router: {
    middleware: [
      'burger-nav-middleware'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
