<template>
    <div class="relative w-full max-w-xl mr-6 focus-within:text-black-500">
        <label class="block w-full text-gray-500 pb-1 text-left">{{ field.label }}</label>
        <a-range-picker
            size="large"
            :placeholder="['Bắt đầu', 'Kết thúc']"
            @change="onChange"
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
        return {}
    },
    methods: {
        onChange(date, dateString) {
            console.log(date, dateString)
            this.$emit('input', dateString)
        }
    }
}
</script>
