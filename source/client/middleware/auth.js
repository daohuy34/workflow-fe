export default function({ store, redirect, route }) {
    // exit middleware when the route matches
    const notNeedAuthPages = ['/dang-nhap']
    const isLoggedIn = store.getters['auth/isLoggedIn']
    // đã đăng nhập, vào trang intro, chuyển qua trang home
    if (route.fullPath === '/' && isLoggedIn) {
        return redirect('/trang-chu')
    }
    if (notNeedAuthPages.includes(route.fullPath)) return
    if (!isLoggedIn) {
        return redirect('/dang-nhap')
    }
}
