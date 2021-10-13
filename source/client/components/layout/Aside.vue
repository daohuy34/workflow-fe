<template>
    <a-col
        id="sidebar"
        class="sidebar"
        :span="3"
    >
        <a-card hoverable>
            <a-card-meta :title="$auth.user.name">
                <a-avatar
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
            </a-card-meta>
        </a-card>
        <a-menu
            mode="inline"
            :class="['', collapsed?'w-56':'']"
            :style="{ color: '#000', borderRight: 'none'}"
            :inline-collapsed="collapsed"
        >
            <template v-for="(menu, index) in menus">
                <a-menu-item
                    v-if="menu.chils.length === 0"
                    :key="index"
                    @click="redirect(menu)"
                    v-show="!menu.permission || $auth.user.permissions.some(element => element.includes(menu.permission))"
                    :style="{ background: 'transparent'}"
                >
                    <a-icon :type="menu.icon" />
                    <span>{{menu.text}}</span>
                </a-menu-item>
                <a-sub-menu
                    v-else
                    :key="index"
                    v-show="!menu.permission || $auth.user.permissions.some(element => element.includes(menu.permission))"
                    :style="{ background: 'transparent'}"
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
    </a-col>
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
                    text: 'Dashboard',
                    name: 'dashboard',
                    active: 1,
                    chils: []
                },
                {
                    id: '2',
                    icon: 'shop',
                    text: 'E-commerce',
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
                        },
                        {
                            text: 'Đơn hàng',
                            name: 'order',
                            active: -1,
                            permission: 'order_view'
                        }
                    ]
                },
                {
                    id: '6',
                    icon: 'project',
                    text: 'Project list',
                    name: 'dashboard',
                    active: -1,
                    permission: 'project',
                    chils: []
                },
                {
                    id: '7',
                    icon: 'team',
                    text: 'Team board',
                    name: 'team',
                    active: -1,
                    permission: 'team',
                    chils: []
                },
                {
                    id: '8',
                    icon: 'snippets',
                    text: 'Synthetic',
                    slug: '',
                    active: -1,
                    permission: 'synthetic',
                    chils: [
                        {
                            text: 'Account list',
                            name: 'user',
                            active: -1,
                            permission: 'user_view'
                        },
                        {
                            text: 'Permission',
                            name: 'permission',
                            active: -1,
                            permission: 'permission_view'
                        },
                        {
                            text: 'Report',
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
.ant-menu-horizontal {
    border-bottom: none;
}
</style>
