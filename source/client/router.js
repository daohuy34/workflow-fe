import Vue from 'vue'
import Router from 'vue-router'
/* @vite-ignore */
// Pages
const Home = () =>
    import(/* @vite-ignore */ '@/pages/home.vue').then(m => m.default || m)

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
                path: '/',
                component: Home,
                name: 'home'
            }
        ]
    })
}
