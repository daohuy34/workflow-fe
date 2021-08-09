import Vue from 'vue'
import { Breadcrumbs as MutationTypes } from './mutation.types'

export const state = () => ({
    breadcrumbs: []
})

export const mutations = {
    [MutationTypes.ADD](state, payload) {
        state.breadcrumbs = [...state.breadcrumbs, payload]
    }
}

export const actions = {
    add({ commit }, payload) {
        commit(MutationTypes.ADD, payload)
    },
    delete({ commit }, payload) {
        commit(MutationTypes.ADD, payload)
    }
}
