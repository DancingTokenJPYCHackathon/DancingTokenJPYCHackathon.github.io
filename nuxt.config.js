import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
// export default defineNuxtConfig({

// })

export default {
    meta: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // { rel: 'stylesheet', href: "https://use.typekit.net/hkx4eig.css"},
        // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      ],
      script: [
        {src: 'https://cdn.ethers.io/lib/ethers-5.0.umd.min.js'},
        {src: '~/abi/abi_ThrowMoneyFactory.js'},
        {src: '~/abi/abi_ThrowMoneyPool.js'},
        {src: '~/Settings.js'}
      ]
  
    },
  
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
      '~/node_modules/ress/ress.css',
    //   '@fortawesome/fontawesome-free/css/all.min.css',
      '~/assets/css/style.css',
      '~/assets/css/style.scss',
    ],
  
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],
  
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
  
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
      '@nuxtjs/google-fonts',
      ['@nuxtjs/google-fonts',
      {
        display: 'swap'
      }]
    ],
  
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/axios
    //   'nuxt-material-design-icons-iconfont'
    ],
  
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
      // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
      baseURL: '/',
    },
  
    // Build Configuration: https://go.nuxtjs.dev/config-build
    pageTransition: {
      name: 'page',
      appear: true
    },
    nitro: {
      preset: 'server'
    }
  }

