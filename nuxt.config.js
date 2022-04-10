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
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'
            }
        ]
    },
    generate: {
        fallback: true
    },
    target: 'static',
    srcDir: 'source/client/',
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/css/global.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~plugins/axios' },
        { src: '~plugins/filter' },
        { src: '~plugins/vuex-persisted.js', ssr: false },
        { src: '~plugins/ant-design.js', ssr: false },
        { src: '~plugins/vue2-editor.js', ssr: false }
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
                            'faChevronUp',
                            'faArchive',
                            'faShoppingCart',
                            'faUserFriends',
                            'faProjectDiagram',
                            'faBookmark',
                            'faTimesCircle',
                            'faEllipsisV'
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
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        'vue2-editor/nuxt',
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
                    auth: true,
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
        },
        build: {
            extend(config, { isDev, isClient }) {
                // ..
                config.module.rules.push({
                    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    loader: 'file-loader'
                })
                // Sets webpack's mode to development if `isDev` is true.
                if (isDev) {
                    config.mode = 'development'
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
    },
    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: '$API_URL'
    },
    auth: {
        // Options
        // cookie: false,
        resetOnError: true,
        plugins: ['~plugins/auth-redirect.js', '~plugins/auto-auth.js'],
        redirect: {
            login: '/dang-nhap',
            logout: '/dang-nhap',
            callback: '/auth/handler',
            user: '/trang-chu',
            home: '/trang-chu'
        },
        redirectFrom: ['/dang-nhap', '/auth/handler'],
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/v1/auth/login',
                        method: 'post',
                        propertyName: 'token.accessToken',
                        refreshTokenPropertyName: 'token.refreshToken',
                        expiredAtPropertyName: 'token.expiredAt'
                    },
                    refresh: {
                        url: '/v1/auth/refresh-token/web',
                        method: 'post',
                        propertyName: 'accessToken',
                        refreshTokenPropertyName: 'refreshToken',
                        expiredAtPropertyName: 'expiredAt'
                    },
                    logout: { url: '/v1/auth/logout', method: 'post' },
                    user: {
                        url: '/v1/users/profile',
                        method: 'get',
                        propertyName: null
                    }
                },
                tokenRequired: true,
                tokenType: 'Bearer',
                refreshToken: true,
                buildRefreshTokenRequest: refreshToken => ({
                    data: {
                        refreshToken
                    }
                })
            }
        }
    }
}
