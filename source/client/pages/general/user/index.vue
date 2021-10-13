<template>
    <div class="-my-2 overflow-x-auto">
        <search
            :configSearch="configSearch"
            :configCRUD="configCRUD"
        />
        <!-- <crud-template :config="configCRUD" /> -->
        <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3">
            <a-table
                :columns="configCRUD.fields"
                rowKey="uid"
                :data-source="items"
            >
                <div
                    slot="expandedRowRender"
                    slot-scope="record"
                    style="margin: 0"
                >
                    <a-row>
                        <a-col :span="5">
                            <a-avatar
                                style="width:200px; height:200px"
                                class="w-60 h-60"
                                :src="record.picture"
                            />
                        </a-col>
                        <a-col :span="19">
                            <p>
                                Họ và tên:
                                <span class="font-bold">{{ record.name }}</span>
                            </p>
                            <p>
                                Phone: {{ record.phone || 'Chưa có thông tin' }}
                            </p>
                            <p>Email: {{ record.email }}</p>
                            <p>
                                Địa chỉ:
                                {{ record.address || 'Chưa có thông tin' }}
                            </p>
                            <p>
                                Ngày gia nhập:
                                {{ record.createdAt }}
                            </p>
                        </a-col>
                    </a-row>
                </div>
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
                        v-if="permissionEdit"
                        @click="
                            $router.push({
                                name: 'user-id',
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
                            v-if="permissionDelete"
                            type="danger"
                            shape="circle"
                            icon="delete"
                        />
                    </a-popconfirm>
                    <!-- <a-dropdown-button>
                        <a-menu slot="overlay" @click="handleMenuClick">
                            <a-menu-item key="1">
                                <a-icon type="user" />1st menu item
                            </a-menu-item>
                            <a-menu-item key="2">
                                <a-icon type="user" />2nd menu item
                            </a-menu-item>
                            <a-menu-item key="3">
                                <a-icon type="user" />3rd item
                            </a-menu-item>
                        </a-menu>
                        <a-icon slot="icon" type="user" />
                    </a-dropdown-button> -->
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
                title: 'Tài khoản',
                btnAdd: true,
                linkAdd: 'user-id',
                fields: [
                    {
                        label: 'Tìm kiếm nhân viên',
                        name: 'code',
                        type: 'text',
                        placeholder: 'Nhập mã nhân viên'
                    },
                    {
                        label: 'Trạng thái tài khoản',
                        name: 'isActive',
                        type: 'select-single',
                        placeholder: 'Chọn trạng thái',
                        configApi: null,
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
                        label: 'Khoảng thời gian tạo tài khoản',
                        name: 'date-range',
                        type: 'date-range'
                    },
                    {
                        label: 'Tìm kiếm chức vụ',
                        name: 'role',
                        type: 'select-multiple',
                        placeholder: 'Chọn chức vụ',
                        configApi: null,
                        options: [
                            {
                                label: 'Nhân viên',
                                value: 'staff'
                            },
                            {
                                label: 'Trưởng phòng',
                                value: 'leader'
                            },
                            {
                                label: 'Giám đốc',
                                value: 'ceo'
                            },
                            {
                                label: 'Admin',
                                value: 'admin'
                            }
                        ]
                    }
                ]
            },
            configCRUD: {
                btnEdit: true,
                btnDel: true,
                expandedRowRender: false,
                model: 'users',
                fields: [
                    {
                        title: 'Mã nhân viên',
                        key: 'code',
                        dataIndex: 'code'
                    },
                    {
                        title: 'Họ tên',
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
                    delete: 'user_delete',
                    edit: 'user_upsert',
                    create: 'user_create'
                },
                moreArray: [
                    // {
                    //     label: 'Thêm số lượng'
                    // }
                ]
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
    computed: {
        permissionEdit() {
            return (
                !this.configCRUD.actionPermissions.edit ||
                this.$auth.user.permissions.includes(
                    this.configCRUD.actionPermissions.edit
                )
            )
        },
        permissionDelete() {
            return (
                !this.configCRUD.actionPermissions.delete ||
                this.$auth.user.permissions.includes(
                    this.configCRUD.actionPermissions.delete
                )
            )
        }
    },
    methods: {
        async fetchData() {
            try {
                const data = await fetchDataService.getList(
                    this,
                    'users',
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
                await fetchDataService.deleteOne(this, 'users', record.id)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
