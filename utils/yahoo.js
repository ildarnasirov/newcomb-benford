import yahooStockPrices from 'yahoo-stock-prices'

const verify_query_params = (startDate, endDate, frequency) => {
    if (!["1d", "1wk", "1mo"].some (i => i === frequency)) {
        console.log (`\`frequency\` must be one of ${["1d", "1wk", "1mo"]}`)
        return false
    }
    if (startDate - endDate > 0) {
        console.log ('`startDate` must be less than `endDate`')
        return false
    }
    return true
}

export const get_data = async (ticker, startDate, endDate, frequency) => {
    if (!verify_query_params(startDate, endDate, frequency)) return null
    try {
        return await yahooStockPrices.getHistoricalPrices (
            startDate.getMonth (),
            startDate.getDay (),
            startDate.getFullYear (),
            endDate.getMonth (),
            endDate.getDay (),
            endDate.getFullYear (),
            ticker,
            frequency
        )
    } catch (e) {
        console.log (e)
        return null
    }
}