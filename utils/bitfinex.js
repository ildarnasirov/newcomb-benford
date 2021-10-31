import axios from 'axios'

const verify_query_params = (sort, start, end, limit) => {
    if (limit && limit < 0 || limit > 10000) {
        console.log ('invalid `limit` value passed')
        return false
    }
    
    if (sort && sort != 1 && sort != -1) {
        console.log ('invalid `sort` value passed')
        return false
    } 

    if (start && isNan (start)) {
        console.log ('`start` and `end` must be numerical values representing ms')
        return false
    }
    if (end && isNan (end)) {
        console.log ('`start` and `end` must be numerical values representing ms')
        return false
    }

    if (start && end && start >= end) {
        console.log ('`start` cannot be greater or equal to `end`')
        return false
    }

    return true
}

const paramify = (sort, start, end, limit) => {
    let result = ""
    if (sort) {
        result += `sort=${sort}`
    }
    if (start) {
        result += `&start=${start}`
    }
    if (end) {
        result += `&start=${end}`
    }
    if (limit) {
        result += `&limit=${limit}`
    }

    return result
}

const get_data = async (key, size, ticker, { sort, start, end, limit } = params) => {
    if (!verify_query_params (sort, start, end, limit)) return null

    const baseUrl = 'https://api-pub.bitfinex.com/v2/'
    const pathParams = `stats1/${key}:${size}:t${ticker}/hist`
    const queryParams = paramify (sort, start, end, limit)

    try {
        const response = await axios.get(`${baseUrl}/${pathParams}?${queryParams}`)
        return response.data
    } catch (e) {
        console.log (e)
        return null
    }
}

export const get_vwap_data = async (ticker, params) =>
    await get_data ('vwap', '1d', ticker, params)