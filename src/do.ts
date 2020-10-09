import { none, option, Option, some } from 'fp-ts/lib/Option'
import { Do } from 'fp-ts-contrib/Do'
const maybeA: Option<number> = some(5)
const maybeB: Option<number> = none
const maybeC: Option<number> = some(40)

// cb style
const result = option.chain(maybeA, a =>
   option.chain(maybeB, b => option.map(maybeC, c => a + b + c))
)

console.log(result)

// haskell style do notation
const res = Do(option)
   .bind('a', maybeA)
   .bind('b', maybeB)
   .bind('c', maybeC)
   .return(({ a, b, c }) => a + b + c)

console.log(res)
