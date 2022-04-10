<template>
    <div class="-my-2 py-2 overflow-x-auto">
        <search
            :configSearch="configSearch"
            :configCRUD="configCRUD"
            @startFilter="startFilter($event)"
            @clearFilter="clearFilter($event)"
        />
        <div
            class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-2 pt-3"
        >
            <a-table :columns="configCRUD.fields" :data-source="items">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="customTitle">Name</span>
                <span slot="tags" slot-scope="tags">
                    <a-tag
                        v-for="tag in tags"
                        :key="tag"
                        :color="
                            tag === 'loser'
                                ? 'volcano'
                                : tag.length > 5
                                ? 'geekblue'
                                : 'green'
                        "
                    >
                        {{ tag.toUpperCase() }}
                    </a-tag>
                </span>
                <span slot="collections" slot-scope="collections">
                    <!-- {{ collections }} -->
                    <p
                        class="mb-0"
                        v-for="(collection, index) in collections"
                        :key="index"
                    >
                        {{ collection.name }}
                    </p>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a-button
                        @click="
                            $router.push({
                                name: 'product-id',
                                params: { id: record.id }
                            })
                        "
                        shape="circle"
                        icon="edit"
                    />
                    <a-popconfirm
                        title="Do you want to delete this collection?"
                        ok-text="Agree"
                        cancel-text="Cancel"
                        @confirm="remove(text, record)"
                    >
                        <a-button type="danger" shape="circle" icon="delete" />
                    </a-popconfirm>
                    <template v-if="configCRUD.moreArray.length > 0">
                        <a-dropdown>
                            <a-button
                                class="ant-dropdown-link"
                                @click="e => e.preventDefault()"
                                shape="circle"
                                icon="more"
                            />
                            <a-menu slot="overlay">
                                <a-menu-item
                                    v-for="(action,
                                    key) in configCRUD.moreArray"
                                    :key="key"
                                >
                                    <a>{{ action.label }}</a>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </template>
                </span>
            </a-table>
        </div>
        <!-- <crud-template :config="configCRUD" /> -->
    </div>
</template>
<script>
import Search from '@/components/form-search/Search'
import crudTemplate from '@/components/crud/crudTemplate'
import fetchDataService from '@/services/fetch-data'

export default {
    components: {
        Search,
        crudTemplate
    },
    data() {
        return {
            configSearch: {
                title: 'Product',
                btnAdd: true,
                linkAdd: 'product-id',
                fields: [
                    {
                        label: 'Tìm kiếm sản phẩm',
                        name: 'name',
                        type: 'text'
                    },
                    {
                        label: 'Trạng thái sản phẩm',
                        name: 'isActive',
                        type: 'select-single',
                        options: [
                            {
                                label: 'Kích hoạt',
                                value: true
                            },
                            {
                                label: 'Vô hiệu hóa',
                                value: false
                            }
                        ]
                    },
                    {
                        label: 'Trạng thái sản phẩm',
                        name: 'collectionId',
                        type: 'select-multiple',
                        options: [
                            {
                                label: 'A',
                                value: 'A'
                            },
                            {
                                label: 'B',
                                value: 'B'
                            },
                            {
                                label: 'C',
                                value: 'C'
                            },
                            {
                                label: 'D',
                                value: 'D'
                            }
                        ]
                    },
                    {
                        label: 'Khoảng thời gian tạo sản phẩm',
                        name: 'date-range',
                        type: 'date-range'
                    },
                    {
                        label: 'Nhà cung cấp',
                        name: 'providerId',
                        type: 'select-single',
                        options: [
                            {
                                label: 'Kích hoạt',
                                value: true
                            },
                            {
                                label: 'Vô hiệu hóa',
                                value: false
                            }
                        ]
                    },
                    {
                        label: 'Tình trạng sản phẩm trong kho',
                        name: 'isSoldOut',
                        type: 'select-single',
                        options: [
                            {
                                label: 'Hết hàng',
                                value: true
                            },
                            {
                                label: 'Còn hàng',
                                value: false
                            }
                        ]
                    }
                ]
            },
            configCRUD: {
                btnEdit: true,
                btnDel: true,
                btnMore: true,
                model: 'products',
                fields: [
                    {
                        title: 'Collection',
                        key: 'collections',
                        dataIndex: 'collections',
                        scopedSlots: { customRender: 'collections' }
                    },
                    {
                        dataIndex: 'name',
                        key: 'name',
                        slots: { title: 'customTitle' },
                        scopedSlots: { customRender: 'name' }
                    },
                    {
                        title: 'Trạng thái',
                        key: 'isActive',
                        dataIndex: 'isActive',
                        scopedSlots: { customRender: 'tag' }
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        scopedSlots: { customRender: 'action' }
                    }
                ],
                moreArray: [
                    {
                        label: 'Thêm số lượng'
                    }
                ],
                actionPermissions: {
                    delete: 'product_delete',
                    edit: 'product_upsert',
                    create: 'product_create'
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
        startFilter(event) {
            this.condition = Object.assign(this.condition, event)
            // this.fetchData()
        },
        clearFilter(event) {
            this.condition = Object.assign(
                {
                    page: 1,
                    perPage: 10
                },
                event
            )
            // this.fetchData()
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
                    description: 'Xóa sản phẩm thành công'
                })
                await this.fetchData()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
