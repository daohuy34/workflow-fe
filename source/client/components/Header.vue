<template>
    <a-layout-header
        theme="dark"
        :style="{ background: '#fff', padding: 0,margin: '10px 10px 0', overflow: 'initial' }"
    >
        <a-row>
            <a-col :span="1">
                <a-icon
                    class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="() => ($emit('onChangeCollapsed', collapsed = !collapsed))"
                />
            </a-col>
            <a-col :span="6">
                <a-menu
                    mode="horizontal"
                    :default-selected-keys="['2']"
                    :style="{ lineHeight: '64px' }"
                >
                    <a-menu-item key="1">
                        nav 1
                    </a-menu-item>
                    <a-menu-item key="2">
                        nav 2
                    </a-menu-item>
                    <a-menu-item key="3">
                        nav 3
                    </a-menu-item>
                </a-menu>
            </a-col>
            <a-col :span="8">
                <a-input-search
                    size="large"
                    placeholder="input search loading deault"
                />
            </a-col>
            <a-col
                :offset="7"
                :span="2"
            >
                <a-dropdown :trigger="['click']">
                    <a
                        class="ant-dropdown-link"
                        @click="e => e.preventDefault()"
                    >
                        Click me
                        <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item key="0">
                            <a href="http://www.alipay.com/">1st menu item</a>
                        </a-menu-item>
                        <a-menu-item key="1">
                            <a href="http://www.taobao.com/">2nd menu item</a>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3">
                            3rd menu item
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-col>
        </a-row>
    </a-layout-header>
</template>
<script>
export default {
    data() {
        return {
            isPagesMenuOpen: false,
            isNotificationsMenuOpen: false,
            isProfileMenuOpen: false,
            collapsed: false
        }
    },
    computed: {
        user() {
            return this.$auth.user
        }
    }
}
</script>
