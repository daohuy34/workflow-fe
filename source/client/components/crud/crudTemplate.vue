<template>
    <div>
        <div
            class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3"
        >
            <a-table rowKey="uid" :data-source="items">
                <span slot="tag" slot-scope="record">
                    {{ record }}
                    <template v-if="record.type === 'text'">
                        {{ record.key }}
                        <a-tag :color="!record.key ? 'red' : 'green'">
                            {{ record ? 'Kích hoạt' : 'Vô hiệu hóa' }}
                        </a-tag>
                    </template>
                    <template v-else-if="record.type === type.ARRAY">
                        <a-tag v-for="tag in tags" :key="tag" color="blue">{{
                            tag
                        }}</a-tag>
                    </template>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a-button
                        @click="edit(text, record)"
                        type="primary"
                        shape="circle"
                        icon="edit"
                    />
                    <a-button
                        type="danger"
                        @click="remove(text, record)"
                        shape="circle"
                        icon="delete"
                    />
                </span>
            </a-table>
        </div>
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
    },
    data() {
        return {
            type: {
                TEXT: 'text',
                ARRAY: 'array'
            },
            showMore: false,
            condistion: {
                page: 1,
                perPage: 10
            },
            items: [],
            totalItem: 0,
            selectedRowKeys: [] // Check here to configure the default column
        }
    },
    computed: {
        hasSelected() {
            return this.selectedRowKeys.length > 0
        }
    },
    async created() {
        await this.fetchData()
    },

    methods: {
        async fetchData() {
            try {
                const data = await fetchDataService.getList(
                    this,
                    'users',
                    this.condistion
                )
                if (data) {
                    this.items = data.items
                    this.totalItem = data.totalItems
                }
            } catch (error) {
                console.log(error)
            }
        },
        edit(text, record) {
            console.log(text, record)
        },
        remove(text, record) {
            console.log(text, record)
        }
    }
}
</script>
