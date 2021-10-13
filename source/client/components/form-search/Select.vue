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
            v-model="value"
            size="large"
            :name="field.name"
            @change="handleChange"
            :placeholder="field.placeholder"
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
            value: ''
        }
    },
    methods: {
        handleChange(value) {
            let boolean = value ? true : false
            this.$emit('input', boolean)
        }
    }
}
</script>
