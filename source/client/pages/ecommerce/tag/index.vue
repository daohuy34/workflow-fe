<template>
    <div class="-my-2 overflow-x-auto rounded-md">
        <search
            :configSearch="configSearch"
            :configCRUD="configCRUD"
            @startFilter="startFilter($event)"
            @clearFilter="clearFilter($event)"
        />
        <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-2 pt-3">
            <a-table
                :columns="configCRUD.fields"
                rowKey="uid"
                :data-source="items"
            >
                <span
                    slot="image"
                    slot-scope="text, record"
                >
                    <a-avatar
                        :size="64"
                        class="w-60 h-60"
                        :src="record.logo"
                    />
                </span>
                <span
                    slot="tag-type"
                    slot-scope="type"
                >
                    <a-tag :color="type==='product' ? 'geekblue' : type==='gift'? 'volcano': 'purple'">
                        {{ type==='product' ? 'Product' : type==='gift'? 'Gift': 'Collection' }}
                    </a-tag>
                </span>
                <span
                    slot="tag-isActive"
                    slot-scope="isActive"
                >
                    <a-tag :color="isActive ? 'geekblue' : 'volcano'">
                        {{ isActive ? 'Kích hoạt' : 'Vô hiệu hóa' }}
                    </a-tag>
                </span>
                <span
                    slot="action"
                    slot-scope="text, record"
                >
                    <a-button
                        @click="
                            $router.push({
                                name: 'tag-id',
                                params: { id: record.id }
                            })
                        "
                        type="primary"
                        shape="circle"
                        icon="edit"
                    />
                    <a-popconfirm
                        title="Bạn có muốn xóa tài khoản này?"
                        ok-text="Đồng ý"
                        cancel-text="Hủy bỏ"
                        @confirm="remove(text, record)"
                    >
                        <a-button
                            type="danger"
                            shape="circle"
                            icon="delete"
                        />
                    </a-popconfirm>
                </span>
            </a-table>
        </div>
    </div>
</template>
<script>
import Search from '@/components/form-search/Search'
import fetchDataService from '@/services/fetch-data'

export default {
    components: {
        Search
    },
    data() {
        return {
            configSearch: {
                title: 'Tag',
                btnAdd: true,
                linkAdd: 'tag-id',
                fields: [
                    {
                        label: 'Search tag',
                        name: 'name',
                        type: 'text',
                        placeholder: 'Enter tag name'
                    },
                    {
                        label: 'Search type',
                        name: 'type',
                        type: 'select-single',
                        placeholder: 'Enter tag type',
                        options: [
                            {
                                label: 'Product',
                                value: 'product'
                            },
                            {
                                label: 'Gift',
                                value: 'gift'
                            },
                            {
                                label: 'Collection',
                                value: 'collection'
                            }
                        ]
                    },
                    {
                        label: 'Tag creation time',
                        name: 'date-range',
                        type: 'date-range'
                    }
                ]
            },
            configCRUD: {
                btnEdit: true,
                btnDel: true,
                model: 'tags',
                fields: [
                    {
                        title: 'Name tag',
                        key: 'name',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Type',
                        key: 'type',
                        dataIndex: 'type',
                        scopedSlots: { customRender: 'tag-type' }
                    },
                    {
                        title: 'Status',
                        key: 'isActive',
                        dataIndex: 'isActive',
                        scopedSlots: { customRender: 'tag-isActive' }
                    },
                    {
                        title: 'Actions',
                        key: 'action',
                        scopedSlots: { customRender: 'action' }
                    }
                ],
                actionPermissions: {
                    delete: 'tag_delete',
                    edit: 'tag_upsert',
                    create: 'tag_create'
                }
            },
            items: [],
            totalItem: 0,
            condition: {
                page: 1,
                perPage: 10
            }
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
                    this.configCRUD.model,
                    this.condition
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
        async remove(text, record) {
            try {
                await fetchDataService.deleteOne(
                    this,
                    this.configCRUD.model,
                    record.id
                )
                this.$notification.success({
                    message: 'Thành công',
                    description: 'Xóa chuyên mục thành công'
                })
                await this.fetchData()
            } catch (error) {
                console.log(error)
            }
        },
        startFilter(event) {
            this.condition = Object.assign(this.condition, event)
            this.fetchData()
        },
        clearFilter(event) {
            this.condition = Object.assign(
                {
                    page: 1,
                    perPage: 10
                },
                event
            )
            this.fetchData()
        }
    }
}
</script>
<style lang="css" scoped>
/* .card:hover .ant-card-actions {
    display: block;
}
.ant-card-actions {
    position: absolute;
    background: transparent;
    top: 0;
    display: none;
} */
.card:hover .actions {
    display: block !important;
}
</style>