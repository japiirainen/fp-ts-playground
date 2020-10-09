import { User } from './semiGroupMerge'

export const user1: User = {
   name: 'Joona',
   hobbies: ['laskettelu', 'lenkkeily'],
   createdAt: new Date(2020, 1, 20).getTime(),
   updatedAt: new Date(2020, 4, 18).getTime(),
   darkMode: false,
}
export const user2: User = {
   name: 'Joona Piirainen',
   hobbies: ['crossfittailu', 'pyöräily'],
   createdAt: new Date(2020, 3, 20).getTime(),
   updatedAt: new Date(2020, 2, 18).getTime(),
   darkMode: true,
}

export const user3: User = {
   name: 'Joona Aleksi Piirainen',
   hobbies: ['punttisali'],
   createdAt: new Date(2020, 7, 20).getTime(),
   updatedAt: new Date(2020, 5, 18).getTime(),
   darkMode: true,
}

export const users = [user1, user2, user3]

type Geo = {
   lat: string
   lng: string
}

type Address = {
   street: string
   suite: string
   city: string
   zipcode: string
   geo: Geo
   phone: string
   website: string
}

type Company = {
   name: string
   catchPhrase: string
   bs: string
}
export type UserF = {
   id: number
   name: string
   username: string
   address: Address
   company: Company
}
