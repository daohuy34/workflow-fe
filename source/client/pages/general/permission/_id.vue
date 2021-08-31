<template>
    <div>
        <a-row>
            <a-col>
                <a-form
                    :model="form"
                    :layout="formLayout"
                >
                    <a-form-item label="Tên quyền">
                        <a-input
                            v-model="form.name"
                            v-decorator="['name', { rules: [{ required: true, message: 'Please input your name!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Mã quyền">
                        <a-input
                            v-model="form.id"
                            v-decorator="['id', { rules: [{ required: true, message: 'Please input your code!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Tóm tắt">
                        <a-input
                            v-model="form.description"
                            v-decorator="['description', { rules: [{ required: true, message: 'Please input your description!' }] }]"
                        />
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>
        <a-row
            class="fixed bottom-0 right-0"
            type="flex"
            justify="end"
        >
            <a-button-group>
                <button
                    @click="cancel"
                    size="large"
                    class="px-5 py-2 bg-red-500 border-red-500 border text-gray-100 transition duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white focus:outline-none"
                >
                    Hủy bỏ
                </button>
                <button
                    @click="submit"
                    size="large"
                    class="px-5 py-2 bg-green-500 border-green-500 border text-gray-100 transition duration-300 hover:border-green-600 hover:bg-green-600 hover:text-white focus:outline-none"
                >
                    Lưu
                </button>
                <button
                    @click="submit"
                    size="large"
                    class="px-5 py-2 bg-yellow-500 border-yellow-500 border text-gray-100 transition duration-300 hover:border-yellow-600 hover:bg-yellow-600 hover:text-white focus:outline-none"
                >
                    Lưu và tiếp tục
                </button>
            </a-button-group>
        </a-row>
    </div>
</template>
<script>
import fetchDataService from '@/services/fetch-data'
export default {
    data() {
        return {
            loading: false,
            formLayout: 'vertical',
            form: {
                id: '',
                name: '',
                description: ''
            }
        }
    },
    async fetch() {
        if (this.$route.params.id !== 'add') {
            this.form = await fetchDataService.getOne(
                this,
                `v1/permissions/${this.$route.params.id}`
            )
        }
    },
    methods: {
        async submit() {
            if (!this.validations()) {
                return
            }
            try {
                if (this.$route.params.id === 'add') {
                    const result = await fetchDataService.createOne(
                        this,
                        'permissions',
                        this.form
                    )
                    if (result && result.id) {
                        this.$notification.success({
                            message: 'Tạo quyền thành thông'
                        })
                        this.$router.push({ name: 'permission' })
                    }
                } else {
                    const result = await fetchDataService.updateOne(
                        this,
                        'permissions',
                        this.$route.params.id,
                        this.form
                    )
                    if (result && result.id) {
                        this.$notification.success({
                            message: 'Tạo quyền thành thông'
                        })
                        this.$router.push({ name: 'permission' })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        cancel() {
            console.log('cancel')
        },
        validations() {
            if (!this.form.id || !this.form.name || !this.form.description) {
                this.$notification.error({
                    message: 'Thông tin bị bỏ trống',
                    description:
                        'Một vài thông tin bạn đã bỏ trống, vui lòng điền đầy đủ thông tin để để được tiếp tục.'
                })
                return false
            }
            return true
        }
    }
}
</script>
<style lang="css" scoped>
.ant-form-vertical .ant-form-item {
    padding-bottom: 0px;
}
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
.ant-form-item-control-wrapper .ant-form-item-control {
    float: left !important;
}
.ant-form-item-control {
    float: left;
}
</style>