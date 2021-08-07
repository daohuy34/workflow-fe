<template>
    <div
        class="align-middle inline-block w-full py-4 overflow-hidden bg-white px-12"
    >
        <div class="grid grid-cols-4 gap-4">
            <div
                class="relative w-full max-w-xl mr-6 focus-within:text-black-500"
            >
                <label class="block w-full text-gray-500 pb-1" for="search-text"
                    >Tìm kiếm</label
                >
                <input
                    type="text"
                    name="search-text"
                    class="w-full block placeholder-gray-600 bg-gray-100 border-1 px-2 py-2 rounded border-gray-400 focus:border-purple-300 focus:shadow-outline-purple"
                />
            </div>
            <div
                class="relative w-full max-w-xl mr-6 focus-within:text-black-500"
            >
                <label class="block w-full text-gray-500 pb-1" for="cars"
                    >Choose a car:</label
                >
                <select
                    class="w-full block placeholder-gray-600 bg-gray-100 border-1 px-2 py-2.5 rounded border-gray-400 focus:border-purple-300 focus:shadow-outline-purple"
                    id="cars"
                >
                    <option value=""></option>
                    <option
                        v-for="index in 5"
                        :key="index"
                        :label="`Volvo-${index}`"
                        >{{ index }}</option
                    >
                </select>
            </div>
            <div
                class="relative w-full max-w-xl mr-6 focus-within:text-black-500"
            >
                <label class="block w-full text-gray-500 pb-1" for="cars"
                    >Chọn thời gian</label
                >
                <date-picker
                    v-model="time3"
                    range
                    value-type="timestamp"
                ></date-picker>
            </div>
        </div>
        <div class="flex flex-row-reverse space-x-4 space-x-reverse pt-3">
            <div>
                <button
                    class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                >
                    Lọc
                </button>
            </div>
            <div>
                <button
                    class="px-5 py-2 border-yellow-500 border text-yellow-500 rounded transition duration-300 hover:bg-yellow-500 hover:text-white focus:outline-none"
                >
                    Xóa bộ lọc
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
    components: { DateRangePicker, DatePicker },
    data() {
        return {
            time3: null
        }
    },
    watch: {
        time3: function() {
            console.log(this.time3)
        }
    },
    methods: {}
}
</script>
<style lang="css" scoped>
.mx-datepicker-range .mx-input-wrapper .mx-input {
    padding: 19px !important;
}
</style>
