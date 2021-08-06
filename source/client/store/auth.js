const getDefaultState = () => {
    return {
        authUser: null
    }
}

// initial state
const state = () => getDefaultState()

const mutations = {
    SET_AUTH_USER: (state, authUser) => {
        state.authUser = {
            uid: authUser.uid,
            displayName: authUser.displayName,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            phoneNumber: authUser.phoneNumber,
            photoURL: authUser.photoURL
        }
    },
    RESET(state) {
        Object.assign(state, getDefaultState())
    }
}

const actions = {
    onAuthStateChanged({ commit }, { authUser, claims }) {
        if (!authUser) {
            commit('RESET')
            return
        }
        commit('SET_AUTH_USER', authUser)
    }
}

const getters = {
    isLoggedIn: state => {
        try {
            return state.authUser.id !== null
        } catch {
            return false
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
