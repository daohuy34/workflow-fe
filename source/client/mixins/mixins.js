import Vue from 'vue'
import fetchDataService from '@/services/fetch-data'

var mixin = {
    data: function() {
        return {}
    },
    methods: {
        async getTags(ctx, type) {
            try {
                console.log('mixin', type)

                const items = await fetchDataService.getList(ctx, 'tags/', {
                    type,
                    isActive: true
                })
                return items
            } catch (error) {
                console.log(error)
            }
        }
    }
}

Vue.mixin(mixin)
