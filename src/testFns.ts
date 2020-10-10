import { flow, pipe } from 'fp-ts/function'
import { map, filter } from 'fp-ts/Array'

//const sum = (acc: number, v: number) => acc + v
const double = (v: number) => v * 2
const isMod2 = (v: number) => v % 2 === 0

const res1 = pipe([1, 2, 3, 4, 5], filter(isMod2), map(double), map(double))
const res2 = flow(filter(isMod2), map(double), map(double))
console.log(res1)
console.log(res2([1, 2, 3, 4, 5, 6]))
