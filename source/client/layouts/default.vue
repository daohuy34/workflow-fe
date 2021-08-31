<template>
    <a-layout id="components-layout-demo-fixed-sider">
        <Aside :collapsed="collapsed" />
        <a-layout :style="{ marginLeft: collapsed?'80px': '200px' }">
            <Header @onChangeCollapsed="collapsed=$event" />
            <a-layout-content :style="{ margin: '10px 10px 0', overflow: 'initial' }">
                <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
                    <router-view />
                </div>
            </a-layout-content>
            <a-layout-footer :style="{ textAlign: 'center' }">
                Workflow 2021
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
import Aside from '@/components/Aside'
import Header from '@/components/Header'
import Breadcrumbs from '@/components/Breadcrumbs'

export default {
    middleware: 'auth',
    components: {
        Aside,
        Header,
        Breadcrumbs
    },
    data() {
        return {
            collapsed: false
        }
    }
}
</script>