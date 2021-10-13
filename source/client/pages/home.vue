<template>
    <div class="p-4 bg-white">
        <a-row :gutter="16">
            <a-col
                class="gutter-row"
                :span="6"
            >
                <a-card>
                    <a-statistic
                        title="Feedback"
                        :value="1128"
                        :precision="0"
                        suffix="%"
                        :value-style="{ color: '#f8f8f8' }"
                    >
                        <template #suffix></template>
                    </a-statistic>
                </a-card>
            </a-col>
            <a-col
                class="gutter-row"
                :span="6"
            >
                <a-card>
                    <a-statistic
                        title="Feedback"
                        :value="11.28"
                        :precision="2"
                        suffix="%"
                        :value-style="{ color: '#3f8600' }"
                    >
                        <template #prefix>
                            <a-icon type="arrow-up" />
                        </template>
                    </a-statistic>
                </a-card>
            </a-col>
            <a-col
                class="gutter-row"
                :span="6"
            >
                <a-card>
                    <a-statistic
                        title="Feedback"
                        :value="11.28"
                        :precision="2"
                        suffix="%"
                        :value-style="{ color: '#3f8600' }"
                    >
                        <template #prefix>
                            <a-icon type="arrow-up" />
                        </template>
                    </a-statistic>
                </a-card>
            </a-col>
            <a-col
                class="gutter-row"
                :span="6"
            >
                <a-card>
                    <a-statistic
                        title="Feedback"
                        :value="11.28"
                        :precision="2"
                        suffix="%"
                        :value-style="{ color: '#3f8600' }"
                    >
                        <template #prefix>
                            <a-icon type="arrow-up" />
                        </template>
                    </a-statistic>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import fetchData from '@/services/fetch-data'

export default {
    data() {
        return {
            isPagesMenuOpen: false,
            isNotificationsMenuOpen: false,
            isProfileMenuOpen: false
        }
    },
    async created() {
        await fetchData.getList(this, 'status')
    }
}
</script>
<style scoped>
/* .gutter-example >>> .ant-row > div {
    background: #ffffff;
    border: 0;
}
.gutter-box {
    background: #00a0e9;
    padding: 5px 0;
} */
</style>
