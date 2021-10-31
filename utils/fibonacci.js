export const fib = n => {
    const result = new Array (n)
    result[0] = result[1] = 1

    for (let i = 2; i < n; i++) {
        result[i] = result [i - 1] + result [i - 2]
    }

    return result
}