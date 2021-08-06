import pick from 'lodash/pick'

/* eslint-disable no-throw-literal */
export const strict = false

export const getters = {}

export const mutations = {
    ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
        if (!authUser) {
            // claims = null
            // perform logout operations
        } else {
            // Do something with the authUser and the claims object...
            state.user = pick(authUser, [
                'uid',
                'displayName',
                'email',
                'emailVerified',
                'phoneNumber',
                'metadata',
                'photoURL'
            ])
        }
    }
}

export const actions = {
    async nuxtServerInit({ dispatch }, ctx) {
        if (this.$fire.auth === null) {
            throw 'nuxtServerInit Example not working - this.$fire.auth cannot be accessed.'
        }
        if (ctx.$fire.auth === null) {
            throw 'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.'
        }
        if (ctx.app.$fire.auth === null) {
            throw 'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.'
        }
        // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'
        /** Get the VERIFIED authUser from the server */
        if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
            const { allClaims: claims, ...authUser } = ctx.res.locals.user
            console.info(
                'Auth User verified on server-side. User: ',
                authUser,
                'Claims:',
                claims
            )
            await dispatch('auth/onAuthStateChanged', {
                authUser,
                claims
            })
        }
    }
}

export const state = () => {}
