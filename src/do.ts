import { none, option, Option, some } from 'fp-ts/lib/Option'
import { either, Either, right, left } from 'fp-ts/lib/Either'
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
   .return(ctx => ctx.a + ctx.b + ctx.c)

console.log(res)

const isOver18 = (val: number): Option<boolean> => (val > 18 ? some(true) : none)

const result2 = Do(option)
   .bind('user', some({ name: 'Bob', age: 101 }))
   .bind('manager', some({ name: 'Mary', age: 56 }))
   .bindL('bobsNewAge', ({ user }) => isOver18(user.age))
   .done()
console.log(result2)

// with Either
const eitherA: Either<string, number> = right(5)
const eitherB: Either<string, number> = left('error getting b')
const eitherC: Either<string, number> = right(10)

const eithres = Do(either)
   .bind('a', eitherA)
   .bind('b', eitherB)
   .bind('c', eitherC)
   .return(({ a, b, c }) => a + b + c)

console.log(eithres)
