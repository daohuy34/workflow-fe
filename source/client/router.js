import Vue from 'vue'
import Router from 'vue-router'
/* @vite-ignore */
// Pages
const Home = () =>
    import(/* @vite-ignore */ '@/pages/home.vue').then(m => m.default || m)

//Auth
const Login = () =>
    import(/* @vite-ignore */ '@/pages/auth/login.vue').then(
        m => m.default || m
    )

//Product
const ProductIndex = () =>
    import(/* @vite-ignore */ '@/pages/ecommerce/product/index.vue').then(
        m => m.default || m
    )

//Gift
const GiftIndex = () =>
    import(/* @vite-ignore */ '@/pages/ecommerce/gift/index.vue').then(
        m => m.default || m
    )

//Conllection
const ColllectionIndex = () =>
    import(/* @vite-ignore */ '@/pages/ecommerce/collection/index.vue').then(
        m => m.default || m
    )
const ColllectionId = () =>
    import(/* @vite-ignore */ '@/pages/ecommerce/collection/_id.vue').then(
        m => m.default || m
    )

//User
const UserIndex = () =>
    import(/* @vite-ignore */ '@/pages/general/user/index.vue').then(
        m => m.default || m
    )
const UserId = () =>
    import(/* @vite-ignore */ '@/pages/general/user/_id.vue').then(
        m => m.default || m
    )

// Permission
const PermissionIndex = () =>
    import(/* @vite-ignore */ '@/pages/general/permission/index.vue').then(
        m => m.default || m
    )
const PermissionId = () =>
    import(/* @vite-ignore */ '@/pages/general/permission/_id.vue').then(
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
            // auth
            {
                path: '/dang-nhap',
                component: Login,
                name: 'login'
            },
            // ecommerce
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
            },
            {
                path: '/danh-muc/:id',
                component: ColllectionId,
                name: 'collection-id'
            },
            // general
            // user
            {
                path: '/tai-khoan',
                component: UserIndex,
                name: 'user'
            },
            {
                path: '/tai-khoan/:id',
                component: UserId,
                name: 'user-id'
            },
            //permission
            {
                path: '/phan-quyen',
                component: PermissionIndex,
                name: 'permission'
            },
            {
                path: '/phan-quyen/:id',
                component: PermissionId,
                name: 'permission-id'
            }
        ]
    })
}
