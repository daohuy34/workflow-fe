<template>
    <nav class="navbar p-5 w-full">
        <a-row
            type="flex"
            justify="space-between"
        >
            <a-col
                class=""
                :span="4"
            >
                <div class="flex h-full space-x-4 text-center justify-center items-center">
                    <a
                        @click="$emit('isCollapsed', collapsed = !collapsed)"
                        class="pr-4 text-black"
                    >
                        <a-icon
                            :style="{fontSize: '25px'}"
                            type="menu-fold"
                        />
                    </a>
                    <p class="uppercase text-black mb-0">NAME COMPANY</p>
                </div>
            </a-col>
            <!-- <a-col :span="10">
                <a-menu
                    :style="{ background: 'transparent', color: '#000'}"
                    mode="horizontal"
                >
                    <a-menu-item key="0">Home</a-menu-item>
                    <a-menu-item key="1">Ladipage</a-menu-item>
                    <a-menu-item key="2">
                        <a-icon type="wechat" /> Chat room</a-menu-item>
                </a-menu>
            </a-col> -->
            <a-col :span="7">
                <div class="flex h-full text-center justify-center items-center">
                    <a-input-search
                        size="large"
                        placeholder="Search..."
                        style="width: 100%"
                        @search="onSearch"
                    />
                </div>
            </a-col>
            <a-col
                class="text-right"
                :span="2"
            >
                <!-- <a-dropdown placement="bottomCenter">
                    <a
                        class="ant-dropdown-link pr-4"
                        @click="e => e.preventDefault()"
                    >
                        <a-avatar
                            :size="35"
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                        <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <a href="javascript:;">1st menu item</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="javascript:;">2nd menu item</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="javascript:;">3rd menu item</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown> -->

            </a-col>
        </a-row>
    </nav>
</template>
<script>
export default {
    data() {
        return {
            seach: '',
            collapsed: false
        }
    },
    methods: {
        onSearch() {
            console.log('onSearch')
        }
    }
}
</script>
<style lang="css" scoped>
.ant-menu-horizontal {
    border-bottom: none;
}
.ant-menu {
    border-right: none;
}
</style>
