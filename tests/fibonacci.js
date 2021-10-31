import { expect } from 'chai'
import { newcomb_benford_first_digit } from '../utils/newcomb_benford.js'
import { fib } from '../utils/fibonacci.js'


describe ('Fibonacci', () => {
    it (`should pass for the first digit of the sequence`, () => {
        const arr = fib (10_000)
        const { result } = newcomb_benford_first_digit (arr, 0)
        expect (result).to.be.true
    })
})
