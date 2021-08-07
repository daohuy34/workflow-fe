<template>
    <div class="flex min-h-screen bg-gray-200">
        <Aside />
        <Header />
        <main class="h-full w-full pl-56 pt-24 pb-12 pr-4">
            <router-view />
        </main>
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
