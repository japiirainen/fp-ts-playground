import { Do } from 'fp-ts-contrib/lib/Do'
import { Either, right, left, getValidation } from 'fp-ts/lib/Either'
import { getMonoid } from 'fp-ts/lib/Array'

type Form = {
   name: string
   startDate: string
   endDate: string
}

const nonEmpty = (error: string, s: string): Either<string[], string> => {
   return s === '' ? left([error]) : right(s)
}

const isDate = (error: string, dateStr: string): Either<string[], Date> => {
   const date = Date.parse(dateStr)
   return isNaN(date) ? left([error]) : right(new Date(date))
}

const isBefore = (error: string, start: Date, end: Date): Either<string[], number> => {
   const difference = end.getTime() - start.getTime()
   return difference > 0 ? right(difference) : left([error])
}

const validateForm = (form: Form) =>
   Do(getValidation(getMonoid<string>()))
      .sequenceS({
         nameIsNotEmpty: nonEmpty('Name cannot be empty', form.name),
         start: isDate('Start date is invalid', form.startDate),
         end: isDate('End date is invalid', form.endDate),
      })
      .bindL('lengthOfEvent', ({ start, end }) => isBefore('Start must be before end!', start, end))
      .bindL('lengthIsValid', ({ lengthOfEvent }) =>
         lengthOfEvent / 1000 / 60 / 30 > 1
            ? left(['The event cannot be longer than 30 minutes'])
            : right(lengthOfEvent)
      )
      .return(({ start, end }) => ({
         start,
         end,
         name: form.name,
      }))

console.log(
   validateForm({
      name: 'Event1',
      startDate: '2020-03-27T01:55:00Z',
      endDate: '2020-03-27T01:59:00Z',
   })
)
console.log(
   validateForm({
      name: 'Event2',
      startDate: 'lol',
      endDate: 'lol',
   })
)

console.log(
   validateForm({
      name: 'Event3',
      startDate: '2020-03-27T01:55:00Z',
      endDate: '2020-03-27T03:59:00Z',
   })
)
