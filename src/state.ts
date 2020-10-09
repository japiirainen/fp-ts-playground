import { state } from 'fp-ts/lib/State'
import { sequenceT, sequenceS } from 'fp-ts/lib/Apply'
import { pipe } from 'fp-ts/lib/function'
import { randomIn, randomFirstName, randomLastName, Random, randomInRange } from './seedRandom'
import { map, chain } from 'fp-ts/lib/State'

const randomFullName = pipe(
   sequenceT(state)(randomLastName, randomFirstName),
   map(([fName, lName]) => `${fName} ${lName}`)
)

const randomHockeyTeam = randomIn(['Maple Leafs', 'Canadiens', 'Flyers'])

const randomFootBallTeam = randomIn(['Steelers', 'Eagles', 'Jaguars'])

const randomBoolean: Random<boolean> = pipe(
   randomInRange(0, 1),
   map(n => n === 1)
)

const randomTeam: Random<string> = pipe(
   randomBoolean,
   chain(bool => (bool ? randomHockeyTeam : randomFootBallTeam))
)

const generateRandomUser = sequenceS(state)({
   name: randomFullName,
   age: randomInRange(18, 100),
   favoriteTeam: randomTeam,
})
const seed = 1337
const [user, seed2] = generateRandomUser(seed)
const [user2] = generateRandomUser(seed2)
console.log(user)
console.log(user2)
