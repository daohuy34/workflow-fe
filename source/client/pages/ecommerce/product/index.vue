<template>
    <div class="-my-2 py-2 overflow-x-auto">
        <search :configSearch="configSearch" />
        <crud-template :config="configCRUD" />
    </div>
</template>
<script>
import Search from '@/components/form-search/Search'
import crudTemplate from '@/components/crud/crudTemplate'

export default {
    components: {
        Search,
        crudTemplate
    },
    data() {
        return {
            configSearch: {
                title: 'Sản phẩm',
                btnAdd: true,
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
                        name: 'collectId',
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
                        label: 'ID',
                        value: 'id'
                    },
                    {
                        label: 'Danh mục',
                        value: 'id'
                    },
                    {
                        label: 'Tên sản phẩm',
                        value: 'name'
                    },
                    {
                        label: 'Ảnh',
                        value: 'id'
                    },
                    {
                        label: 'Trạng thái',
                        value: 'id'
                    },
                    {
                        label: 'Ngày tạo',
                        value: 'id'
                    },
                    {
                        label: '',
                        value: 'action'
                    }
                ],
                moreArray: [
                    {
                        label: 'Thêm số lượng'
                    }
                ]
            }
        }
    }
}
</script>
