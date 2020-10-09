import { State, map } from 'fp-ts/lib/State'
import { pipe } from 'fp-ts/lib/pipeable'

export type Random<A> = State<number, A>

const a = 1839567234
const m = 8239451023
const c = 972348567

export const random: State<number, number> = seed => {
   const nextSeed = (a * seed + c) % m
   return [nextSeed, nextSeed]
}

export const randomInRange: (max: number, min: number) => Random<number> = (max, min) =>
   pipe(
      random,
      map(num => min + Math.floor((num / 8239451023) * (max - min)))
   )

export const randomIn = <T>(arr: T[]) =>
   pipe(
      randomInRange(0, arr.length),
      map(index => arr[index])
   )
export const randomFirstName = randomIn(['Kananen', 'Pesusieni', 'Teränen'])
export const randomLastName = randomIn(['Luumu', 'Poona', 'Kelle', 'Omena'])
