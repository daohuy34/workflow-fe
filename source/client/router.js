import Vue from 'vue'
import Router from 'vue-router'
/* @vite-ignore */
// Pages
const Home = () =>
    import(/* @vite-ignore */ '@/pages/home.vue').then(m => m.default || m)

const Login = () =>
    import(/* @vite-ignore */ '@/pages/auth/login.vue').then(
        m => m.default || m
    )

const ProductIndex = () =>
    import(/* @vite-ignore */ '@/pages/commerce/product/index.vue').then(
        m => m.default || m
    )

const GiftIndex = () =>
    import(/* @vite-ignore */ '@/pages/commerce/gift/index.vue').then(
        m => m.default || m
    )

const ColllectionIndex = () =>
    import(/* @vite-ignore */ '@/pages/commerce/collection/index.vue').then(
        m => m.default || m
    )

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        scrollBehavior(to, from, savedPosition) {
            let position
            if (savedPosition) {
                position = savedPosition
            } else {
                position = { x: 0, y: 0 }
            }
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(position)
                }, 200)
            })
        },
        routes: [
            {
                path: '/trang-chu',
                component: Home,
                name: 'dashboard'
            },
            {
                path: '/dang-nhap',
                component: Login,
                name: 'login'
            },
            {
                path: '/san-pham',
                component: ProductIndex,
                name: 'product'
            },
            {
                path: '/qua-tang',
                component: GiftIndex,
                name: 'gift'
            },
            {
                path: '/danh-muc',
                component: ColllectionIndex,
                name: 'collection'
            }
        ]
    })
}
