import Vue from 'vue'
import { Auth as MutationTypes } from './mutation.types'

export const state = () => ({
    loggedIn: false,
    user: null
})

export const mutations = {
    [MutationTypes.LOGIN](state, payload) {
        if (payload.idToken) {
            state.loggedIn = true
            state.user = payload
        }
    },
    [MutationTypes.LOGOUT](state) {
        state.loggedIn = false
        state.user = null
    }
}

export const actions = {
    login({ commit }, payload) {
        commit(MutationTypes.LOGIN, payload)
    },
    logout({ commit }) {
        commit(MutationTypes.LOGOUT)
    }
}

export const getters = {
    user(state) {
        return state.user
    },

    isAuthenticated(state) {
        return !!state.user
    }
}
