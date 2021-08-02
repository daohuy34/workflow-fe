export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'workflow-front-end',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    srcDir: 'source/client/',
    // layouts: 'layouts/',
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        'nuxt-vite'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [['@nuxtjs/router', { fileName: 'router.js' }]],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    vite: {
        ssr: true,
        /* options for vite */
        // ssr: true // enable unstable server-side rendering for development (false by default)
        // experimentWarning: false // hide experimental warning message (disabled by default for tests)
        vue: {
            /* options for vite-plugin-vue2 */
        }
    }
}
