<template>
    <div class="px-6 py-3">
        <a-form
            :model="form"
            :layout="formLayout"
        >
            <a-row>
                <a-col
                    class="mr-4"
                    :span="16"
                >
                    <a-form-item label="Tên sản phẩm">
                        <a-input
                            v-model="form.name"
                            v-decorator="[
                                'id',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your name!'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                    <a-form-item label="Slug">
                        <a-input
                            :disabled="true"
                            v-model="form.slug"
                            v-decorator="[
                                'slug',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your slug!'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                    <a-form-item label="Nhóm sản phẩm">
                        <a-select
                            v-model="form.collections"
                            mode="multiple"
                            style="width: 100%"
                            placeholder="select one country"
                            option-label-prop="label"
                        >
                            <a-select-option
                                v-for="(collection, index) in collections"
                                :key="index"
                                :value="collection"
                                :label="collection.name"
                            >
                                <!-- <span role="img" aria-label="China">
                                    🇨🇳
                                </span> -->
                                {{ collection.name }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="Tóm tắt">
                        <no-ssr>
                            <vue-editor v-model="form.description"></vue-editor>
                        </no-ssr>
                    </a-form-item>
                    <a-form-item label="Nội dung">
                        <no-ssr>
                            <vue-editor v-model="form.content"></vue-editor>
                        </no-ssr>
                    </a-form-item>
                </a-col>
                <a-col :span="1">
                    <a-divider
                        style="background: #b4b0b0 !important; height:100vh;"
                        type="vertical"
                    />
                </a-col>
                <a-col
                    class="ml-4"
                    :span="6"
                >
                    <a-form-item label="Ảnh đại diện">
                        <a-upload-dragger
                            name="file"
                            :multiple="false"
                            @change="selectFile"
                        >
                            <img
                                v-if="form.logo"
                                alt="example"
                                style="width: 100%"
                                :src="form.logo"
                            />
                            <template v-else>
                                <p class="ant-upload-drag-icon">
                                    <a-icon type="inbox" />
                                </p>
                                <p class="ant-upload-text">
                                    Click or drag file to this area to upload
                                </p>
                                <p class="ant-upload-hint">
                                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                    band files
                                </p>
                            </template>
                        </a-upload-dragger>
                    </a-form-item>
                    <div class="flex">
                        <a-form-item
                            class="px-6 "
                            label="Giá gốc"
                        >
                            <a-input-number
                                id="inputNumber"
                                v-model="form.price"
                                :min="0"
                                :formatter="
                                    value =>
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ','
                                        )
                                "
                            />
                        </a-form-item>
                        <a-form-item label="Giá bán">
                            <a-input-number
                                id="inputNumber"
                                v-model="form.originalPrice"
                                :formatter="
                                    value =>
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ','
                                        )
                                "
                            />
                        </a-form-item>
                    </div>
                    <p>
                        Sản phẩm được giảm:
                        {{ form.originalPrice * (100 / form.price) || 0 }}%
                    </p>
                    <a-form-item
                        class="px-6 "
                        label="Trọng lượng"
                    >
                        <a-input-number
                            id="inputNumber"
                            v-model="form.grams"
                            :formatter="
                                value =>
                                    `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ','
                                    )
                            "
                        />
                    </a-form-item>
                    <a-form-item
                        class="px-6 "
                        label="Trạng thái"
                    >
                        <a-switch v-model="form.isActive" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
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
import { VueEditor } from 'vue2-editor'

export default {
    name: 'product-id',
    components: {
        VueEditor
    },
    data() {
        return {
            formLayout: 'vertical',
            form: {
                name: '',
                slug: '',
                collections: [],
                description: '',
                content: '',
                price: 0,
                originalPrice: 0,
                grams: 100,
                logo: '',
                isActive: false,
                isSoldOut: true,
                salePercent: 0
            },
            collections: []
        }
    },
    async fetch() {
        if (this.$route.params.id !== 'add') {
            this.form = await fetchDataService.getOne(
                this,
                `v1/products/${this.$route.params.id}`
            )
        }
        const rs = await fetchDataService.getList(this, 'collections')
        this.collections = rs.items
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
                this.form.salePercent =
                    this.form.originalPrice * (100 / this.form.price)
                if (this.$route.params.id === 'add') {
                    const result = await fetchDataService.createOne(
                        this,
                        'products',
                        this.form
                    )
                    if (result && result.id) {
                        this.$notification.success({
                            message: 'Tạo sản phẩm thành thông'
                        })
                        this.$router.push({ name: 'product' })
                    }
                } else {
                    const result = await fetchDataService.updateOne(
                        this,
                        'products',
                        this.$route.params.id,
                        this.form
                    )
                    if (result && result.id) {
                        this.$notification.success({
                            message: 'Cập nhật sản phẩm thành thông'
                        })
                        this.$router.push({ name: 'product' })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        async selectFile(e) {
            const file = e.file.originFileObj

            /* Make sure file exists */
            if (!file) return

            // /* create a reader */
            const readData = f =>
                new Promise(resolve => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result)
                    reader.readAsDataURL(f)
                })

            // /* Read data */
            const data = await readData(file)

            /* upload the converted data */
            const instance = await this.$cloudinary.upload(data, {
                folder: 'hair',
                uploadPreset: 'dhz7oe2o'
            })
            console.log(instance)

            if (instance) {
                this.form.logo = instance.url
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
.ant-form-item-children {
    display: flex !important;
}
</style>
