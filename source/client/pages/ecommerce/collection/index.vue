<template>
    <div class="-my-2 overflow-x-auto rounded-md">
        <search
            :configSearch="configSearch"
            :configCRUD="configCRUD"
            @startFilter="startFilter($event)"
            @clearFilter="clearFilter($event)"
        />
        <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-2 pt-3">
            <a-row
                type="flex"
                justify="space-between"
                :gutter="[40,24]"
            >
                <a-col
                    v-for="(item, key) in items"
                    :key="key"
                    :span="4"
                >
                    <a-card
                        class="card"
                        hoverable
                    >
                        <img
                            slot="cover"
                            alt="example"
                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        />
                        <a-card-meta :title="item.name">
                            <template slot="description">
                                <a-switch v-model="item.isActive" />
                            </template>
                        </a-card-meta>
                        <div class="actions card-hover:block absolute top-1 left-1 hidden">
                            <a-button
                                class="pr-3"
                                type="warning"
                                icon="edit"
                                @click="
                                    $router.push({
                                        name: 'collection-id',
                                        params: { id: record.id }
                                    })
                                "
                            />
                            <a-popconfirm
                                title="Do you want to delete this item?"
                                ok-text="Agree"
                                cancel-text="Cancel"
                                @confirm="remove(text, record)"
                            >
                                <a-button
                                    type="danger"
                                    icon="delete"
                                />
                            </a-popconfirm>
                        </div>
                    </a-card>
                </a-col>
            </a-row>
            <!-- <a-table
                :columns="configCRUD.fields"
                rowKey="uid"
                :data-source="items"
                :row-selection="rowSelection"
                :expanded-row-keys.sync="expandedRowKeys"
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
                    slot="tag"
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
                                name: 'collection-id',
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
            </a-table> -->
        </div>
    </div>
</template>
<script>
import Search from '@/components/form-search/Search'
import fetchDataService from '@/services/fetch-data'
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
        )
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows)
    }
}
export default {
    components: {
        Search
    },
    data() {
        return {
            rowSelection,
            expandedRowKeys: [],
            configSearch: {
                title: 'Danh mục',
                btnAdd: true,
                linkAdd: 'collection-id',
                fields: [
                    {
                        label: 'Tìm kiếm danh mục',
                        name: 'name',
                        type: 'text',
                        placeholder: 'Nhập tên danh mục'
                    },
                    {
                        label: 'Khoảng thời gian tạo danh mục',
                        name: 'date-range',
                        type: 'date-range'
                    }
                ]
            },
            configCRUD: {
                btnEdit: true,
                btnDel: true,
                model: 'collections',
                fields: [
                    {
                        title: 'Hình đại diện',
                        key: 'logo',
                        dataIndex: 'logo',
                        scopedSlots: { customRender: 'image' }
                    },
                    {
                        title: 'Tên danh mục',
                        key: 'name',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Trạng thái',
                        key: 'isActive',
                        dataIndex: 'isActive',
                        scopedSlots: { customRender: 'tag' }
                    },
                    {
                        title: 'Hành động',
                        key: 'action',
                        scopedSlots: { customRender: 'action' }
                    }
                ],
                actionPermissions: {
                    delete: 'collection_delete',
                    edit: 'collection_upsert',
                    create: 'collection_create'
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