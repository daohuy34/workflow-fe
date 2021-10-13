<template>
    <div class="px-6 py-3">
        <a-row>
            <a-col :span="15">
                <a-form
                    :model="form"
                    :layout="formLayout"
                >
                    <a-form-item label="Họ và tên">
                        <a-input
                            v-model="form.name"
                            v-decorator="['name', { rules: [{ required: true, message: 'Please input your name!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Mã nhân viên">
                        <a-input
                            v-model="form.code"
                            :disabled="true"
                            v-decorator="['code', { rules: [{ required: true, message: 'Please input your name!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Số điện thoại">
                        <a-input
                            v-model="form.phone"
                            v-decorator="['phone', { rules: [{ required: true, message: 'Please input your phone!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Email">
                        <a-input
                            v-model="form.email"
                            addon-after="@gmail.com"
                            v-decorator="['email', { rules: [{ required: true, message: 'Please input your email!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item
                        v-if="this.$route.params.id === 'add'"
                        label="Mật khẩu"
                    >
                        <a-input
                            v-model="form.password"
                            type="password"
                            v-decorator="['password', { rules: [{ required: true, message: 'Please input your password!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Địa chỉ nhà">
                        <a-input
                            v-model="form.address"
                            v-decorator="['address', { rules: [{ required: true, message: 'Please input your address!' }] }]"
                        />
                    </a-form-item>
                    <a-form-item label="Chức vụ">
                        <a-select
                            v-model="form.role"
                            :default-value="form.role"
                        >
                            <a-select-option
                                v-for="(role, index) in roles"
                                :key="index"
                                :value="role.value"
                            >
                                {{role.text}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="Quyền">
                        <a-select
                            v-model="form.permissions"
                            mode="multiple"
                            :default-value="['profile']"
                            style="width: 100%"
                            placeholder="Chọn quyền"
                            @change="handleChange"
                        >
                            <a-select-option
                                v-for="(per, index) in permissions"
                                :key="index"
                                :value="per.id"
                            >
                                {{ per.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-form>
            </a-col>
            <a-col
                class="h-screen"
                :span="1"
            >
                <a-divider
                    class="h-screen"
                    type="vertical"
                />
            </a-col>
            <a-col :span="8">
                <a-form :layout="formLayout">
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
                                v-if="form.picture"
                                :src="form.picture"
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
                    <!-- <a-form-item label="Ảnh chứng minh">
                        <div class="clearfix">
                            <a-upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                list-type="picture-card"
                                :file-list="fileList"
                                @preview="handlePreview"
                                @change="handleChange"
                            >
                                <div v-if="fileList.length < 8">
                                    <a-icon type="plus" />
                                    <div class="ant-upload-text">
                                        Upload
                                    </div>
                                </div>
                            </a-upload>
                            <a-modal
                                :visible="previewVisible"
                                :footer="null"
                                @cancel="handleCancel"
                            >
                                <img
                                    alt="example"
                                    style="width: 100%"
                                    :src="previewImage"
                                />
                            </a-modal>
                        </div>
                    </a-form-item> -->
                    <a-form-item label="Trạng thái">
                        <a-switch
                            v-model="form.isActive"
                            default-checked
                        />
                    </a-form-item>
                    <a-form-item label="Phòng">
                        <a-select
                            v-model="form.room"
                            mode="multiple"
                            :default-value="['profile']"
                            style="width: 100%"
                            placeholder="Chọn quyền"
                        >
                            <a-select-option
                                v-for="i in 25"
                                :key="(i + 9).toString(36) + i"
                            >
                                {{ (i + 9).toString(36) + i }}
                            </a-select-option>
                        </a-select>
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
import { ROLE_TYPE } from '@/utils/Types'
import fetchDataService from '@/services/fetch-data'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

export default {
    data() {
        return {
            loading: false,
            formLayout: 'vertical',
            previewVisible: false,
            previewImage: '',
            fileList: [],
            roles: ROLE_TYPE,
            imageUrl: '',
            form: {
                name: '',
                code: '',
                phone: '',
                email: '',
                password: '',
                address: '',
                role: '',
                permissions: [],
                picture:
                    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                peopleIDFrontSide:
                    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                peopleIDBackSide:
                    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                room: [],
                isActive: false
            },
            permissions: []
        }
    },
    async fetch() {
        if (this.$route.params.id !== 'add') {
            this.form = await fetchDataService.getOne(
                this,
                `v1/users/${this.$route.params.id}`
            )
        }

        const resultPermission = await fetchDataService.getList(
            this,
            'permissions'
        )
        if (resultPermission) {
            this.permissions = resultPermission.items
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
                        'users',
                        this.form
                    )
                    if (result && result.id) {
                        this.$notification.success({
                            message: 'Tạo tài khoản thành thông'
                        })
                        this.$router.push({ name: 'user' })
                    }
                } else {
                    const result = await fetchDataService.updateOne(
                        this,
                        'users',
                        this.$route.params.id,
                        this.form
                    )
                    if (result && result.id) {
                        this.$notification.success({
                            message: 'Tạo tài khoản thành thông'
                        })
                        this.$router.push({ name: 'user' })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        cancel() {
            console.log('cancel')
        },
        handleCancel() {
            this.previewVisible = false
        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj)
            }
            this.previewImage = file.url || file.preview
            this.previewVisible = true
        },
        handleChange({ fileList }) {
            console.log('handleChange', fileList)

            this.fileList = fileList
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
        },
        validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(String(email).toLowerCase())
        },
        validations() {
            if (
                !this.form.name ||
                !this.form.email ||
                !this.form.phone ||
                !this.form.address ||
                !this.form.role ||
                this.form.permissions.length === 0 ||
                this.form.room.length === 0
            ) {
                this.$notification.error({
                    message: 'Thông tin bị bỏ trống',
                    description:
                        'Một vài thông tin bạn đã bỏ trống, vui lòng điền đầy đủ thông tin để để được tiếp tục.'
                })
                return false
            }
            if (this.$route.params.id === 'add' && !this.form.password) {
                this.$notification.error({
                    message: 'Thông tin bị bỏ trống',
                    description:
                        'Một vài thông tin bạn đã bỏ trống, vui lòng điền đầy đủ thông tin để để được tiếp tục.'
                })
                return false
            }
            if (!this.validateEmail(this.form.email)) {
                this.$notification.error({
                    message: 'Email không hợp lệ',
                    description:
                        'Địa chỉ Email chưa hợp lệ, vui lòng kiểm tra lại'
                })
                return false
            }
            return true
        },
        handleChange(value) {
            console.log(`selected ${value}`)
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