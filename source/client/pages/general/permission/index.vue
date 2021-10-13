<template>
    <div class="-my-2 overflow-x-auto">
        <search
            :configSearch="configSearch"
            :configCRUD="configCRUD"
        />
        <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3">
            <a-table
                :columns="configCRUD.fields"
                rowKey="uid"
                :data-source="items"
            >
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
                                name: 'permission-id',
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
                title: 'Phân quyền',
                btnAdd: true,
                linkAdd: 'permission-id',
                fields: [
                    {
                        label: 'Tìm kiếm nhân viên',
                        name: 'code',
                        type: 'text',
                        placeholder: 'Nhập mã nhân viên'
                    },
                    {
                        label: 'Khoảng thời gian tạo tài khoản',
                        name: 'date-range',
                        type: 'date-range'
                    }
                ]
            },
            configCRUD: {
                btnEdit: true,
                btnDel: true,
                model: 'permissions',
                fields: [
                    {
                        title: 'Tên quyền',
                        key: 'name',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Hành động',
                        key: 'action',
                        scopedSlots: { customRender: 'action' }
                    }
                ],
                moreArray: [
                    // {
                    //     label: 'Thêm số lượng'
                    // }
                ],
                actionPermissions: {
                    delete: 'permission_delete',
                    edit: 'permission_upsert',
                    create: 'permission_create'
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
        remove(text, record) {
            console.log(text, record)
        }
    }
}
</script>
