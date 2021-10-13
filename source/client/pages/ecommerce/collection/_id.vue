<template>
    <div class="px-6 py-3">
        <a-row>
            <a-col>
                <a-form
                    :model="form"
                    :layout="formLayout"
                >
                    <a-form-item label="Tên danh mục">
                        <a-input
                            v-model="form.name"
                            v-decorator="['id', { rules: [{ required: true, message: 'Please input your name!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Slug danh mục">
                        <a-input
                            v-model="form.slug"
                            v-decorator="['slug', { rules: [{ required: true, message: 'Please input your slug!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Miêu tả">
                        <a-input
                            v-model="form.description"
                            v-decorator="['description', { rules: [{ required: true, message: 'Please input your description!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Ảnh đại diện">
                        <a-upload
                            name="avatar"
                            list-type="picture-card"
                            class="avatar-uploader"
                            :show-upload-list="false"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            :before-upload="beforeUpload"
                            @change="handleChange"
                        >
                            <img
                                v-if="form.logo"
                                :src="form.logo"
                                alt="avatar"
                            />
                            <div v-else>
                                <a-icon :type="loading ? 'loading' : 'plus'" />
                                <div class="ant-upload-text">
                                    Upload
                                </div>
                            </div>
                        </a-upload>
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

function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}

export default {
    data() {
        return {
            loading: false,
            formLayout: 'vertical',
            form: {
                name: '',
                slug: '',
                description: '',
                logo:
                    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            }
        }
    },
    async fetch() {
        if (this.$route.params.id !== 'add') {
            this.form = await fetchDataService.getOne(
                this,
                `v1/collections/${this.$route.params.id}`
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
                        'collections',
                        this.form
                    )
                    if (result && result.id) {
                        this.$notification.success({
                            message: 'Tạo danh mục thành thông'
                        })
                        this.$router.push({ name: 'collection' })
                    }
                } else {
                    const result = await fetchDataService.updateOne(
                        this,
                        'collections',
                        this.$route.params.id,
                        this.form
                    )
                    if (result && result.id) {
                        this.$notification.success({
                            message: 'Cập nhật danh mục thành thông'
                        })
                        this.$router.push({ name: 'collection' })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        cancel() {
            console.log('cancel')
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
        },
        handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true
                return
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, imageUrl => {
                    this.form.logo = imageUrl
                    this.loading = false
                })
            }
        },
        beforeUpload(file) {
            const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                this.$message.error('You can only upload JPG file!')
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!')
            }
            return isJpgOrPng && isLt2M
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