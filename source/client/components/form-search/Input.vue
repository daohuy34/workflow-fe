<template>
    <div class="relative w-full max-w-xl mr-6 focus-within:text-black-500">
        <label
            class="block w-full text-gray-500 pb-1 text-left"
            :for="field.name"
        >{{
            field.label
        }}</label>
        <a-input-search
            type="text"
            :name="field.name"
            size="large"
            :placeholder="field.placeholder"
            v-model="value"
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
