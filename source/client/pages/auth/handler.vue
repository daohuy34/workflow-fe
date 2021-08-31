<template>
    <section class="section py-3 px-4">
        <div class="columns is-multiline is-mobile">
            <div class="column">
                <div class="has-text-centered py-8 px-7 has-text-grey-light">
                    <fa
                        icon="spinner"
                        class="fa-6x fa-spin"
                    />
                    <p class="is-size-5 pt-4">Đang tiến hành đăng nhập, xin chờ trong giây lát!</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import authService from '@/services/auth'

export default {
    head() {
        return {
            title: 'Đăng nhập',
            meta: [
                {
                    hid: 'robot',
                    name: 'robots',
                    content: 'noindex'
                }
            ]
        }
    },
    async mounted() {
        const redirect = localStorage.getItem('redirectAfterRegister')

        if (this.$auth.loggedIn) {
            if (redirect) {
                return this.$router.push({
                    path: `/${redirect}`
                })
            } else {
                return this.$router.push({
                    name: 'shop'
                })
            }
        }
        try {
            const {
                access_token: token,
                state
            } = authService.parseFacebookHashUrl(this.$route.hash)
            const savedState = this.$auth.$storage.getUniversal('_state')

            if (state !== savedState || !token) {
                throw new Error('Invalid state!')
            }

            await this.$auth.loginWith('local', {
                url: `/v1/auth/login-token/web`,
                data: {
                    token,
                    type: 'facebook'
                }
            })
            this.$auth.$storage.setUniversal('_state', null)
            if (redirect) {
                return this.$router.push({
                    path: `/${redirect}`
                })
            } else {
                return this.$router.push({
                    name: 'shop'
                })
            }
        } catch (error) {
            console.log('catcg')
            console.log(error)
            let message =
                'Không thể đăng nhập bằng facebook của bạn vào lúc này!'
            if (error.response && error.response.data) {
                console.log(error.response.data.message || 'Invalid token')
                message = error.response.data.message || message
            }
            this.$toast.open({
                duration: 5000,
                type: 'is-danger',
                message
            })
            this.$router.push({
                name: 'login'
            })
        }
    }
}
</script>
