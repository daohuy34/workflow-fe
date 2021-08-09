<template>
    <div>
        <div
            class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3"
        >
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th
                            v-for="(field, index) in config.fields"
                            :key="index"
                            class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider "
                        >
                            {{ field.label }}
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="index in 10" :key="index">
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"
                        >
                            <div class="flex items-center">
                                <div>
                                    <div
                                        class="text-sm leading-5 text-gray-800"
                                    >
                                        #1
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"
                        >
                            <div class="text-sm leading-5 text-blue-900">
                                Damilare Anjorin
                            </div>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
                        >
                            damilareanjorin1@gmail.com
                        </td>
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
                        >
                            +2348106420637
                        </td>
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
                        >
                            <span
                                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                            >
                                <span
                                    aria-hidden
                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                ></span>
                                <span class="relative text-xs">active</span>
                            </span>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
                        >
                            September 12
                        </td>
                        <td
                            class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
                        >
                            <button
                                v-if="config.btnEdit"
                                class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-400 hover:text-white focus:outline-none"
                            >
                                Chi tiết
                            </button>
                            <button
                                v-if="config.btnDel"
                                class="px-5 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none"
                            >
                                Xóa
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pagination />
    </div>
</template>
<script>
import Pagination from '@/components/crud/Pagination'
import fetchDataService from '@/services/fetch-data'

export default {
    props: {
        config: {
            type: Object
        }
    },
    components: {
        Pagination
    }
}
</script>
