import { expect } from 'chai'
import { newcomb_benford_distribution } from '../utils/newcomb_benford.js'

describe ('Newcomb-Benford', () => {
    const base = 10
    const epsilon = 0.001

    it (`should have the valid length of ${base - 1} for base ${base} as 0 cannot be a leading digit`, () => {
        const actual = newcomb_benford_distribution (base)
        expect (actual.length).to.be.equal (base - 1)
    })

    it (`should have the valid distribution to ${epsilon} precision for base 10`, () => {
        const actual = newcomb_benford_distribution (10)
        // Source: https://en.wikipedia.org/wiki/Benford's_law
        const expected = [0.301, 0.176, 0.125, 0.097, 0.079, 0.067, 0.058, 0.051, 0.046]
        for (let i = 0; i < 9; i++) {
            expect (actual[i]).to.be.approximately (expected[i], epsilon)
        }
    })
})
