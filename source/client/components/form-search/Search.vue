<template>
    <div class="inline-block w-full py-4 overflow-hidden bg-white px-3">
        <div class="flex flex-row divide-x divide-gray-500 pb-3">
            <div class="flex items-center pr-3">
                <p class="text-3xl font-semibold mb-0">
                    {{ configSearch.title }}
                </p>
            </div>
            <div
                class="pl-3"
                v-if="configSearch.btnAdd"
            >
                <button
                    v-if="permissionAdd"
                    @click="
                        $router.push({
                            name: configSearch.linkAdd,
                            params: { id: 'add' }
                        })
                    "
                    class="px-5 py-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-500 hover:text-white focus:outline-none"
                >
                    Add new
                </button>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-4">
            <template v-for="field in configSearch.fields">
                <input-search
                    :key="field.name"
                    v-if="field.type === 'text'"
                    v-model="postData[field.name]"
                    :field="field"
                />
                <select-search
                    v-model="postData[field.name]"
                    :key="field.name"
                    :field="field"
                    v-else-if="field.type === 'select-single'"
                />
                <date-range
                    v-model="postData[field.name]"
                    :key="field.name"
                    :field="field"
                    v-else-if="field.type === 'date-range'"
                />
                <select-search-multiple
                    v-model="postData[field.name]"
                    :key="field.name"
                    :field="field"
                    v-else-if="field.type === 'select-multiple'"
                />
            </template>
        </div>
        <div class="flex flex-row-reverse space-x-4 space-x-reverse pt-3">
            <div>
                <button
                    @click="startFilter"
                    class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                >
                    Start filter
                </button>
            </div>
            <div>
                <button
                    @click="clearFilter"
                    class="px-5 py-2 border-yellow-500 border text-yellow-500 rounded transition duration-300 hover:bg-yellow-500 hover:text-white focus:outline-none"
                >
                    Clear filter
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import InputSearch from '@/components/form-search/Input'
import SelectSearch from '@/components/form-search/Select'
import SelectSearchMultiple from '@/components/form-search/SelectMultiple'
import DateRange from '@/components/form-search/DateRange'

export default {
    props: {
        configSearch: {
            type: Object,
            default: null
        },
        configCRUD: {
            type: Object,
            default: null
        }
    },
    components: { InputSearch, SelectSearch, DateRange, SelectSearchMultiple },
    data() {
        return {
            searchText: '',
            postData: {}
        }
    },
    computed: {
        permissionAdd() {
            return this.$auth.user.permissions.includes(
                this.configCRUD.actionPermissions.create
            )
        }
    },
    methods: {
        startFilter() {
            this.$emit('startFilter', this.postData)
        },
        clearFilter() {
            this.postData = {}
            this.$emit('clearFilter', this.postData)
        }
    }
}
</script>
