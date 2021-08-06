<template>
    <div class="flex min-h-screen">
        <Aside />
        <div class="w-full h-24">
            <Header />
            <main class="h-full overflow-y-auto">
                <Nuxt />
            </main>
        </div>
    </div>
</template>
<script>
import Aside from '@/components/Aside'
import Header from '@/components/Header'
export default {
    middleware: 'auth',
    components: {
        Aside,
        Header
    },
    data() {
        return {}
    }
}
</script>
