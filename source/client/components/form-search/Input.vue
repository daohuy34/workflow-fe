<template>
    <div class="relative w-full max-w-xl mr-6 focus-within:text-black-500">
        <label class="block w-full text-gray-500 pb-1" :for="field.name">{{
            field.label
        }}</label>
        <input
            v-model="value"
            type="text"
            :name="field.name"
            class="w-full block placeholder-gray-600 bg-gray-100 border-1 px-2 py-2 rounded border-gray-400 focus:border-purple-300 focus:shadow-outline-purple"
        />
    </div>
</template>
<script>
export default {
    props: {
        field: {
            type: Object
        }
    },
    data() {
        return {
            value: ''
        }
    },
    watch: {
        value: {
            async handler(val) {
                console.log(val)

                this.$emit('input', val)
            },
            deep: true
        }
    }
}
</script>
