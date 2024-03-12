export default {

  env: {
    api_endpoint: 'https://areaclientiback.evaenergyservice.it',
    api_endpoint2: 'https://areaclienti.uniongaseluce.it/ubik',
    pay_success_url: window.location.hostname + '/payments/success',
    pay_failure_url: window.location.hostname + '/payments/failure'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      translate:"no"
    },
    title: 'Barocco',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: "L'app ufficiale per gestire le tue utenze gas e luce" }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;800&display=swap' }

    ]
  },
  loading: false,
  // loading: {
  //   color: '#63B32E',
  //   height: '3px'
  // },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    //{ src: '@/assets/css-mint.min.css' },
    { src: '@/assets/vant.less' },
    { src: '@/assets/main.scss' }

  ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
      'cookie-universal-nuxt',

      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      // https://go.nuxtjs.dev/pwa
      '@nuxtjs/pwa',

      ['nuxt-twa-module', {
        /* module options */
        defaultUrl: 'https://appbarocco.evaenergyservice.it',
        hostName: 'appbarocco.evaenergyservice.it',
        applicationId: 'com.baroccolucegas.app',
        launcherName: 'Barocco Luce e Gas',
        versionCode: 10305,
        versionName: '1.3.5',
        statusBarColor: '#009fe2',
        compileSdkVersion: 29,
        targetSdkVersion: 29,

        // The sha256Fingerprints by is an array with one SHA-256 key string.
        // But if you haven multiple you can add them to the array. More information about the website asociation:
        // https://developer.android.comCONS/training/app-links/verify-site-associations#web-assoc
        sha256Fingerprints: ['E4:1A:3A:BD:34:62:4D:18:65:0D:15:04:5E:8A:E9:43:14:0C:B0:61:D4:67:54:8A:C9:05:B4:0C:D4:2F:18:AB'],
        /* optional */
        /* overwrite default location for icon */
        iconPath: '/static/app-icon.png',
        /* Overwrite folder where to put .wellknown */
        distFolder: '.nuxt/dist/client',
      }],


    ],


  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/axios.js', ssr:true },
    { src: '~/plugins/vant.js', ssr:true },
    { src: '~/plugins/notify.js', ssr:true },
    { src: '~/plugins/utility.js', ssr:true},
    { src: '~/plugins/vue-apexcharts', ssr:false},
  ],
  axios: {
    baseURL: 'https://areaclienti.uniongaseluce.it/ubik/'
   // proxyHeaders: true
  },
  pwa: {
    meta: {
      mobileAppIOS: true,
      appleStatusBarStyle: 'black-translucent'
    },
    icon: {
      fileName: 'app-icon.png',
    },
    manifest: {
      name: 'App Barocco',
      short_name: 'Barocco',
      description: "L'App per gestire le tue utenze gas e luce",
      lang: 'it',
      useWebmanifestExtension: false
    },
    workbox: {
      cacheAssets: false,
      offline: false
      //dev: process.env.NODE_ENV !== 'production' ? true : false // or use a global variable to track the current NODE_ENV, etc to determine dev mode
    }
  },
    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,
    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
    ],
  

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  server: {
    port: 4000, // default: 3000
    // host: '192.168.1.55'
  }
}
