<template>
    <div class="px-6 py-3">
        <a-row>
            <a-col>
                <a-form
                    :model="form"
                    :layout="formLayout"
                >
                    <a-form-item label="Name tag">
                        <a-input
                            v-model="form.name"
                            v-decorator="['id', { rules: [{ required: true, message: 'Please input your name!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Slug tag">
                        <a-input
                            v-model="form.slug"
                            v-decorator="['slug', { rules: [{ required: true, message: 'Please input your slug!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Description">
                        <a-input
                            v-model="form.description"
                            v-decorator="['description', { rules: [{ required: true, message: 'Please input your description!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Type">
                        <a-select
                            v-model="form.type"
                            default-value=""
                        >
                            <a-select-option
                                v-for="(type, key) in types"
                                :key="key"
                                :value="type.value"
                            >
                                {{type.text}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-model-item label="Trạng thái">
                        <a-switch v-model="form.isActive" />
                    </a-form-model-item>
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
                name: '',
                slug: '',
                description: '',
                type: '',
                isActive: true
            },
            types: [
                {
                    value: 'product',
                    text: 'product'
                },
                {
                    value: 'collection',
                    text: 'collection'
                },
                {
                    value: 'gift',
                    text: 'gift'
                }
            ]
        }
    },
    async fetch() {
        if (this.$route.params.id !== 'add') {
            this.form = await fetchDataService.getOne(
                this,
                `v1/tags/${this.$route.params.id}`
            )
        }
    },
    watch: {
        'form.name': function(newVal) {
            this.form.slug = this.$options.filters.generateSlug(newVal)
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
                        'tags',
                        this.form
                    )
                    if (result && result.id) {
                        this.$notification.success({
                            message: 'Tạo thẻ thành thông'
                        })
                        this.$router.push({ name: 'tag' })
                    }
                } else {
                    const result = await fetchDataService.updateOne(
                        this,
                        'tags',
                        this.$route.params.id,
                        this.form
                    )
                    if (result && result.id) {
                        this.$notification.success({
                            message: 'Cập nhật thẻ thành thông'
                        })
                        this.$router.push({ name: 'tag' })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        cancel() {
            this.$router.go(-1)
        },
        validations() {
            if (!this.form.name || !this.form.slug || !this.form.description) {
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