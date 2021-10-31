import { log } from './math.js'

// P (digit) = log_b (1 + 1 / digit)
export const newcomb_benford_distribution = (base = 10) =>
    new Array(base - 1).fill(0).map (
        (_, d) => log (1 + (1 / (d + 1)), base)
    )

// Adapted from https://en.wikipedia.org/wiki/Benford's_law
export const newcomb_benford_first_digit  = (arr, epsilon = 0.01, base = 10) => {
    // need to do d+1 as index:d starts at 0
    const theoretical_probs = newcomb_benford_distribution (base)
    let actual_probs = new Array(base - 1).fill (0)

    // count the digits
    arr
        .flatMap (i => i !== 0 ? 
            parseInt (i < 0 ? i.toString ()[1] : i.toString ()[0]) :
            undefined
        )
        .forEach (i => actual_probs[parseInt(i, base) - 1]++)

    // normalize the results to their probabities
    actual_probs = actual_probs.map (i => i / arr.length)

    // calculate if the experiment values are within the 
    // threshold of theoretical ones
    const result = actual_probs.every (
        (_, index) => Math.abs (
            (actual_probs[index] - theoretical_probs[index]) <= epsilon
        )
    )

    return { result, actual_probs, theoretical_probs }
}
