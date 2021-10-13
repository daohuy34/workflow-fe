<template>
    <a-col
        id="sidebar-2"
        class="sidebar-2"
        :span="3"
    >
        <a-menu
            mode="inline"
            :style="{ background: 'transparent', color: '#fff', borderRight: 'none'}"
            :inline-collapsed="true"
        >
            <a-menu-item
                v-for="(menu, index) in menus"
                :key="index"
                :style="{ background: 'transparent', padding: '0 14px !important'}"
            >
                <a-icon
                    :style="{fontSize: '20px'}"
                    :type="menu.icon"
                />
                <span>{{menu.text}}</span>
            </a-menu-item>
        </a-menu>
    </a-col>
</template>
<script>
export default {
    data() {
        return {
            menus: [
                {
                    icon: 'bell',
                    text: 'Bell'
                },
                {
                    icon: 'mail',
                    text: 'Mail'
                },
                {
                    icon: 'wechat',
                    text: 'Chat Room'
                },
                {
                    icon: 'calendar',
                    text: 'Calendar'
                },
                {
                    icon: 'folder',
                    text: 'Folder'
                },
                {
                    icon: 'logout',
                    text: 'Logout'
                }
            ]
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
.sidebar-2 {
    height: calc(100vh - 90px);
    width: 50px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-size: cover;
    background-position: 50%;
    display: block;
    box-shadow: 0 2px 22px 0 rgb(0 0 0 / 10%), 0 4px 20px 0 rgb(0 0 0 / 15%);
    margin-top: 73px;
    margin-left: 10px;
    border-radius: 5px;
    -webkit-transition: 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    transition: 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    background: linear-gradient(0deg, #0098f0, #510a52);
}
</style>