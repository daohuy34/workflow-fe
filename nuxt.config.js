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
    generate: {
        fallback: true
    },
    target: 'static',
    srcDir: 'source/client/',
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~plugins/vuex-persisted.js', ssr: false }
        // {
        //     src: '~plugins/auth',
        //     ssr: false
        // }
        // { src: '~plugins/auth-redirect.js', ssr: false }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        // 'nuxt-vite',
        [
            'nuxt-fontawesome',
            {
                component: 'fa',
                imports: [
                    {
                        set: '@fortawesome/free-solid-svg-icons',
                        icons: [
                            'faHome',
                            'faHeart',
                            'faSearch',
                            'faPlus',
                            'faCog',
                            'faBars',
                            'faChevronDown',
                            'faArchive',
                            'faShoppingCart',
                            'faUserFriends',
                            'faProjectDiagram',
                            'faBookmark'
                        ]
                    },
                    {
                        set: '@fortawesome/free-regular-svg-icons',
                        icons: []
                    },
                    {
                        set: '@fortawesome/free-brands-svg-icons',
                        icons: []
                    }
                ]
            }
        ]
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        ['@nuxtjs/router', { fileName: 'router.js' }],
        [
            '@nuxtjs/firebase',
            {
                config: {
                    apiKey: 'AIzaSyBe-BBXuUzVIXXDl2MVGLBQ7THstM3h2D0',
                    authDomain: 'test-8613b.firebaseapp.com',
                    projectId: 'test-8613b',
                    storageBucket: 'test-8613b.appspot.com',
                    messagingSenderId: '876651344560',
                    appId: '1:876651344560:web:a919fa2aceb4cad27cc175',
                    measurementId: 'G-XM1M208BG3'
                },
                services: {
                    auth: {
                        persistence: 'local', // default
                        initialize: {
                            onAuthStateChangedMutation:
                                'ON_AUTH_STATE_CHANGED_MUTATION',
                            onAuthStateChangedAction: 'auth/onAuthStateChanged',
                            subscribeManually: false
                        },
                        ssr: false // default
                    },
                    firestore: false,
                    functions: false,
                    storage: false,
                    database: false,
                    messaging: true,
                    performance: false,
                    analytics: false,
                    remoteConfig: true
                }
            }
        ]
    ],

    router: {
        middleware: ['auth']
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: {
            // Add plugin names as key and arguments as value
            // Install them before as dependencies with npm or yarn
            plugins: {
                // Disable a plugin by passing false as value
                // 'postcss-url': false,
                // 'postcss-nested': {},
                // 'postcss-responsive-type': {},
                // 'postcss-hexrgba': {}
            },
            preset: {
                // Change the postcss-preset-env settings
                autoprefixer: {
                    grid: true
                }
            }
        }
    },
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
