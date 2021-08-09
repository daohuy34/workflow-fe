<template>
    <div class="min-h-screen flex bg-indigo-50">
        <Aside />
        <div class="bg-indigo-50 flex-grow p-3 pl-64 pb-12 pr-4 h-full">
            <Header />
            <breadcrumbs />
            <main class="h-full w-full bg-indigo-50">
                <router-view />
            </main>
        </div>
    </div>
</template>
<script>
import Aside from '@/components/Aside'
import Header from '@/components/Header'
import Breadcrumbs from '@/components/Breadcrumbs'

export default {
    middleware: 'auth',
    components: {
        Aside,
        Header,
        Breadcrumbs
    },
    data() {
        return {}
    }
}
</script>
