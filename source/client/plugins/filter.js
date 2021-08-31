import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import configDatetime from '~/../config/datetime'
import format from 'date-fns/format'
import { kebabCase } from 'lodash'

Vue.use(Vue2Filters)

Vue.filter('timestampToDateTimepick', val => {
    if (val) {
        return format(val * 1000, configDatetime.DATE_TIME_PICKER)
    }
    return '- no time -'
})

Vue.filter('timestampToDatetime', val => {
    if (val) {
        return format(val * 1000, configDatetime.DATETIME)
    }
    return '- no time -'
})

Vue.filter('timestampToDate', val => {
    if (val) {
        return format(val * 1000, configDatetime.DATE)
    }
    return '- no date -'
})

Vue.filter('generateSlug', val =>
    kebabCase(
        val
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
    )
)
