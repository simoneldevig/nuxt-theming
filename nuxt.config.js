const path = require('path')
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');
const postcssNested = require('postcss-nested');
const postcssCalc = require('postcss-calc');
const purgecss = require('@fullhuman/postcss-purgecss');
const combineSelectors = require('postcss-combine-duplicated-selectors');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-theming',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],
  buildModules: [
    // Simple usage
    ['nuxt-purgecss', {
      enabled: true
    }]
  ],

  // css: [
  //   // CSS file in the project
  //   '@/assets/nuxt-logo-base.css',
  //   // SCSS file in the project
  //   '@/assets/nuxt-logo-overwrite.css'
  // ],

  // Auto import components (https://go.nuxtjs.dev/config-components)

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  components: [
    { path: '~/theme/components', level: 0 },
    { path: 'node_modules/spa-boilerplate/components/atoms', level: 1 }
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    optimizeCSS: true,
    postcss: {
      plugins: [
        postcssImport(),
        postcssPresetEnv({
          stage: 2, // default stage is 2
          preserve: false,
          autoprefixer: {
            grid: true,
          },
          features: {
            'color-mod-function': { unresolved: 'warn' },
            'custom-media-queries': {},
          },
          browsers: ['>= 5% in DK', 'ie 11'],
        }),
        postcssNested(),
        postcssCalc(),
        postcssReporter({
          clearReportedMessages: true,
        }),
        purgecss({
          content: ['./pages/**/*.vue', './layouts/**/*.vue', './components/**/*.vue', './theme/**/*.vue'],
          whitelist: ['html', 'body']
        }),
        combineSelectors({removeDuplicatedProperties: true})
      ],
    }
  }
}
