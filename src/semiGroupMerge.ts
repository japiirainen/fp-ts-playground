import { contramap, ordNumber } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/function'
import {
   getJoinSemigroup,
   getMeetSemigroup,
   getStructSemigroup,
   Semigroup,
   semigroupAny,
} from 'fp-ts/lib/Semigroup'
import {
   monoidAny,
   getStructMonoid,
   getJoinMonoid,
   getMeetMonoid,
   Monoid,
   fold,
} from 'fp-ts/lib/Monoid'
import { getMonoid } from 'fp-ts/lib/Array'
import { user1, user2, users } from './users'
import { boundedNumber } from 'fp-ts/lib/Bounded'

export type User = {
   name: string
   hobbies: Array<string>
   createdAt: number
   updatedAt: number
   darkMode: boolean
}
//can merge two
const SGUserMerge: Semigroup<User> = getStructSemigroup({
   name: getJoinSemigroup(
      pipe(
         ordNumber,
         contramap((s: string) => s.length)
      )
   ),
   hobbies: getMonoid<string>(),
   createdAt: getMeetSemigroup(ordNumber),
   updatedAt: getJoinSemigroup(ordNumber),
   darkMode: semigroupAny,
})
const { concat: concat2 } = SGUserMerge
const mergedUser = concat2(user1, user2)

console.log(mergedUser)

// merge a list

//own monoid concat
const longestStringMonoid: Monoid<string> = {
   concat: (x, y) => (x.length > y.length ? x : y),
   empty: '',
}

const MonoidMerge: Monoid<User> = getStructMonoid({
   name: longestStringMonoid,
   hobbies: getMonoid<string>(),
   createdAt: getMeetMonoid(boundedNumber),
   updatedAt: getJoinMonoid(boundedNumber),
   darkMode: monoidAny,
})

const newUser = fold(MonoidMerge)(users)
console.log(newUser)
