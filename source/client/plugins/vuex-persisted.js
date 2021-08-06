import createPersistedState from 'vuex-persistedstate'
// import { serviceName } from '~/../config/client-vars'

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'workflow',
            paths: []
        })(store)
    })
}
