
export default {
  mode: 'universal',
  server: {
    host: '0' // default: localhost
  },
  head: {
    title: 'Takipport',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      {rel:"stylesheet", type:"text/css", href:"https://s3.eu-central-1.amazonaws.com/shopier/static/css/shopiermodal.min.css"},
      {rel:"stylesheet", type:"text/css", href:"https://s3.eu-central-1.amazonaws.com/shopier/static/font-awesome/css/font-awesome.min.css"},
      { href: 'icon.png', rel: 'icon'},
      { href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;800&family=Roboto:wght@500&display=swap', rel: 'stylesheet'}   
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
    {src: '~/plugins/firebase.js'},
    {src: '~/plugins/vuePlugin.js', ssr: false},
    { src: '~plugins/ga.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-moment'
  ],
  /*
  ** Build configuration
  */
 build: {
  extend (config, { isDev, isClient }) {

     

     // ....
  }
}
}
