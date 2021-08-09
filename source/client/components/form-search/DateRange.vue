<template>
    <div class="relative w-full max-w-xl mr-6 focus-within:text-black-500">
        <label class="block w-full text-gray-500 pb-1">{{ field.label }}</label>
        <date-picker v-model="time" range value-type="timestamp"></date-picker>
    </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/vi'

export default {
    props: {
        field: {
            type: Object
        }
    },
    components: { DatePicker },
    data() {
        return {
            time: '',
            valueType: 'timestamp'
        }
    },
    watch: {
        time: {
            async handler(val) {
                this.$emit('input', val)
            },
            deep: true
        }
    },
    mounted() {
        const inputDate = document.querySelector('.mx-input')
        inputDate.style.padding = '20px 30px'
        inputDate.style.border = 'rgba(243, 244, 246, var(--tw-bg-opacity))'
        inputDate.style.backgroundColor =
            'rgba(243, 244, 246, var(--tw-bg-opacity))'
    }
}
</script>
