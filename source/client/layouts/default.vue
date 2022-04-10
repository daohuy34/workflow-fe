<template>
    <a-row class="wrapper">
        <Aside :collapsed="collapsed" />
        <Aside-left />
        <a-col
            class="main-panel"
            :span="21"
        >
            <Header @isCollapsed="collapsed=$event" />
            <div
                :style="{ marginLeft: collapsed?'160px': '310px' }"
                class="content shadow-md mx-3 -my-2 rounded-md"
            >
                <router-view />
            </div>
        </a-col>
    </a-row>
</template>
<script>
import Aside from '@/components/layout/Aside'
import AsideLeft from '@/components/layout/AsideLeft'
import Header from '@/components/layout/Header'

export default {
    middleware: 'auth',
    components: {
        Aside,
        Header,
        AsideLeft
    },
    data() {
        return {
            collapsed: false,
            seach: '',
            current: '0',
            windowHeight: 0,
            visible: false,
            confirmLoading: false,
            ModalText: ''
        }
    },
    mounted() {
        const elAntMenuSub = document.getElementsByClassName('ant-menu-sub')
        for (let i = 0; i < elAntMenuSub.length; i++) {
            elAntMenuSub[i].style.background = 'transparent'
            elAntMenuSub[i].style.color = '#fff'
        }

        window.addEventListener('resize', () => {
            this.windowHeight = window.innerWidth
        })
    },
    watch: {
        windowHeight: function() {
            // this.$confirm({
            //     content:
            //         'The screen size has changed, reload the page to update the look',
            //     onOk() {
            //         location.reload()
            //     },
            //     onCancel() {
            //         location.reload()
            //     }
            // })
        },
        collapsed: function(newVal) {
            if (newVal) {
                document.getElementById('sidebar').style.width = '80px'
            } else {
                document.getElementById('sidebar').style.width = '230px'
            }
        }
    },
    methods: {
        handleCollapsed() {
            this.collapsed = !this.collapsed
        },
        onSearch() {
            console.log('onSearch')
        },
        handleOk(e) {
            this.ModalText =
                'The screen size has changed, reload the page to update the look.'
            this.confirmLoading = true
            setTimeout(() => {
                this.visible = false
                this.confirmLoading = false
            }, 2000)
        },
        handleCancel(e) {
            console.log('Clicked cancel button')
            this.visible = false
        }
    }
}
</script>
<style lang="css" scoped>
.wrapper {
    position: relative;
    top: 0;
    height: 100vh;
}
.sidebar {
    height: calc(100vh - 90px);
    width: 230px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-size: cover;
    background-position: 50%;
    display: block;
    box-shadow: 0 2px 22px 0 rgb(0 0 0 / 10%), 0 4px 20px 0 rgb(0 0 0 / 15%);
    margin-top: 73px;
    margin-left: 70px;
    border-radius: 5px;
    -webkit-transition: 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    transition: 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    background: #ffffff;
    color: #000000;
}
.main-panel {
    position: relative;
    float: right;
    width: 100%;
    min-height: 100vh;
    border-top: 2px solid #510a52;
    background: #f5f6fa;
    -webkit-transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
}
</style>