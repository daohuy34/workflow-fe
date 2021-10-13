<template>
    <div class="z-10 py-2 mb-3 bg-white shadow-md dark:bg-gray-800">
        <div class="container h-full px-6 mx-auto">
            <button
                class="text-xs px-4 py-1 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none"
            >
                Trang chủ
            </button>
            <button
                v-for="(item, key) in items"
                :key="key"
                class="text-xs px-4 py-1 mx-1 border-indigo-400 border text-indigo-400 rounded transition duration-300 hover:bg-indigo-400 hover:text-white focus:outline-none"
            >
                {{ item.text }}
            </button>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        items() {
            return this.$store.state.breadcrumbs.breadcrumbs
        }
    }
}
</script>
