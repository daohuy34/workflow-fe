<template>
    <div class="relative w-full max-w-xl mr-6 focus-within:text-black-500">
        <label
            class="block w-full text-gray-500 pb-1 text-left"
            :for="field.name"
        >{{
            field.label
        }}</label>
        <a-select
            class="w-full"
            mode="multiple"
            size="large"
            :placeholder="field.placeholder"
            @change="handleChange"
        >
            <a-select-option
                v-for="(option, index) in field.options"
                :key="index"
                :value="`${option.value}`"
            >
                {{ option.label }}
            </a-select-option>
        </a-select>
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
            value: []
        }
    },
    methods: {
        handleChange(value) {
            console.log(`Selected: ${value}`)
            this.$emit('input', value)
        }
    }
}
</script>
