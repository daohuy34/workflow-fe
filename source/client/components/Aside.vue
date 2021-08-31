<template>
    <a-layout-sider
        v-model="collapsed"
        :trigger="null"
        collapsible
        :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
        <div class="logo"></div>
        <a-menu
            theme="dark"
            mode="inline"
            :default-selected-keys="['0']"
            :inline-collapsed="collapsed"
        >
            <template v-for="(menu, index) in menus">
                <a-menu-item
                    v-if="menu.chils.length === 0"
                    :key="index"
                    @click="redirect(menu)"
                    v-show="!menu.permission || $auth.user.permissions.some(element => element.includes(menu.permission))"
                >
                    <a-icon :type="menu.icon" />
                    <span>{{menu.text}}</span>
                </a-menu-item>
                <a-sub-menu
                    v-else
                    :key="index"
                    v-show="!menu.permission || $auth.user.permissions.some(element => element.includes(menu.permission))"
                >
                    <span slot="title">
                        <a-icon :type="menu.icon" /><span>{{menu.text}}</span></span>
                    <a-menu-item
                        v-for="(chil, key) in menu.chils"
                        :key="key + index"
                        @click="redirect(chil, true)"
                        v-show="!chil.permission || $auth.user.permissions.some(element => element.includes(chil.permission))"
                    >
                        {{chil.text}}
                    </a-menu-item>
                </a-sub-menu>
            </template>
        </a-menu>
    </a-layout-sider>
</template>
<script>
export default {
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isPagesMenuOpen: false,
            menus: [
                {
                    id: '1',
                    icon: 'home',
                    text: 'Trang chủ',
                    name: 'dashboard',
                    active: 1,
                    chils: []
                },
                {
                    id: '2',
                    icon: 'shop',
                    text: 'Thương mại',
                    active: -1,
                    permission: 'ecommerce',
                    chils: [
                        {
                            text: 'Danh mục',
                            name: 'collection',
                            active: -1,
                            permission: 'collection_view'
                        },
                        {
                            text: 'Quà',
                            name: 'gift',
                            active: -1,
                            permission: 'gift_view'
                        },
                        {
                            text: 'Sản phẩm',
                            name: 'product',
                            active: -1,
                            permission: 'product_view'
                        }
                    ]
                },
                {
                    id: '3',
                    icon: 'shopping',
                    text: 'Đơn hàng',
                    slug: '',
                    active: -1,
                    permission: 'order',
                    chils: [
                        {
                            text: 'Đơn quà',
                            permission: 'gift_order_view'
                        },
                        {
                            text: 'Đơn sản phẩm',
                            permission: 'order_view'
                        }
                    ]
                },
                {
                    id: '4',
                    icon: 'team',
                    text: 'Phòng ban',
                    slug: '',
                    active: -1,
                    permission: 'room',
                    chils: [
                        {
                            text: 'Login',
                            permission: ''
                        },
                        {
                            text: 'Login',
                            permission: ''
                        },
                        {
                            text: 'Login',
                            permission: ''
                        }
                    ]
                },
                {
                    id: '6',
                    icon: 'project',
                    text: 'Dự án',
                    slug: '',
                    active: -1,
                    permission: 'project',
                    chils: [
                        {
                            text: 'Login'
                        },
                        {
                            text: 'Login'
                        },
                        {
                            text: 'Login'
                        }
                    ]
                },
                {
                    id: '7',
                    icon: 'snippets',
                    text: 'Tổng hợp',
                    slug: '',
                    active: -1,
                    permission: 'synthetic',
                    chils: [
                        {
                            text: 'Tài khoản',
                            name: 'user',
                            active: -1,
                            permission: 'user_view'
                        },
                        {
                            text: 'Phân quyền',
                            name: 'permission',
                            active: -1,
                            permission: 'permission_view'
                        },
                        {
                            text: 'Báo cáo',
                            name: 'reoprt',
                            active: -1,
                            permission: 'report_view'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        redirect(item, isChil = false) {
            if (!isChil) {
                this.menus.map(e => {
                    if (e.id === item.id) {
                        return (e.active = -e.active)
                    } else {
                        return (e.active = -1)
                    }
                })
            }
            if (item.name) {
                this.$store.dispatch('breadcrumbs/add', item)
                this.$router.push({ name: item.name })
            }
        },
        async logout() {
            this.$auth.logout()
        }
    }
}
</script>
<style>
#components-layout-demo-fixed-sider .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}
#components-layout-demo-fixed-sider .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}
</style>
