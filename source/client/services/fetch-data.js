const logError = err => {
    if (err && err.response && err.response.data) {
        console.log(err.response.data.message || err.response.data)
    } else {
        console.log(err)
    }
}

const getList = async function(context, model, params = {}) {
    try {
        let response = await context.$axios.get(`/v1/${model}`, {
            params
        })
        if (!Array.isArray(response.data)) {
            response.data = [response.data]
        }
        return {
            items: response.data,
            totalItems: response.headers['x-total-items'] || 0
        }
    } catch (err) {
        console.log(err)
        return err.response.data
    }
}

const getListThrowError = async function(context, url, params = {}) {
    try {
        let response = await context.$axios.$get(url, {
            params
        })
        return response
    } catch (err) {
        logError(err)
        throw err
    }
}

const getOne = async function(context, url, params = {}) {
    try {
        let response = await context.$axios.$get(url, {
            params
        })
        if (Array.isArray(response)) {
            if (response.length > 0) {
                return response[0]
            }
            throw new Error('Item not found!')
        }
        return response
    } catch (err) {
        logError(err)
        throw err
    }
}

const deleteOne = async function(context, model, id) {
    try {
        return await context.$axios.$delete(`/v1/${model}/${id}`)
    } catch (err) {
        console.log(err)
        return err.response.data
    }
}

const createOne = async function(context, model, data) {
    try {
        let response = await context.$axios.$post(`/v1/${model}`, data)
        return response
    } catch (err) {
        logError(err)
        return err.response.data
    }
}

const createOneThrowError = async function(context, url, data, params = {}) {
    try {
        let response = await context.$axios.$post(url, data, { params })
        return response
    } catch (err) {
        logError(err)
        // throw err
    }
}

const updateOne = async function(context, model, id, data) {
    try {
        let response = await context.$axios.$patch(`/v1/${model}/${id}`, data)
        return response
    } catch (err) {
        console.log(err)
        return err.response.data
    }
}

const updateData = async function(context, url, data, params = {}) {
    try {
        let response = await context.$axios.$patch(url, data, { params })
        return response
    } catch (err) {
        logError(err)
        throw err
    }
}

export default {
    getList,
    getListThrowError,
    getOne,
    deleteOne,
    createOne,
    createOneThrowError,
    updateOne,
    updateData
}
