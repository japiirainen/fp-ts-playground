import { Do } from 'fp-ts-contrib/lib/Do'
import { taskEither, TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import { fold } from 'fp-ts/lib/Either'
import fetch from 'node-fetch'
import { UserF } from './users'

const usersURI = 'https://jsonplaceholder.typicode.com/users'
const userURI = (userId: number) => `https://jsonplaceholder.typicode.com/users/${userId}`
const postsURI = (userId: number) => `https://jsonplaceholder.typicode.com/posts?userId=${userId}`

export const fetchUsers = async () => {
   fetch(usersURI)
      .then(res => res.json())
      .then(console.log)
      .catch(console.error)
}

export const fetchChain = () =>
   fetch(usersURI)
      .then(res => res.json())
      .then(allUsers => {
         console.log('usersURI', usersURI)
         fetch(userURI(allUsers[0].id))
            .then(res => res.json())
            .then(userURI => {
               console.log('singe userURI', userURI)
               fetch(postsURI(allUsers[0].id))
                  .then(res => res.json())
                  .then(postsURI => {
                     console.log('postsURI', postsURI)
                  })
            })
      })
      .catch(console.error)

export const asyncAwaitStyle = async () => {
   let allUsers
   try {
      allUsers = await fetch(usersURI).then(res => res.json())
      console.log('Fetched all users', allUsers)
   } catch (error) {
      console.log('failed to fetch users')
   }
   //fake authorization
   if (allUsers && allUsers[0].id < 2) {
      try {
         const singleUser = await fetch(userURI(allUsers[0].id)).then(res => res.json())
         console.log('Fetched singe user', singleUser)
      } catch (error) {
         console.log('failed to fetch single user')
      }
      try {
         const posts = await fetch(postsURI(allUsers[0].id)).then(res => res.json())
         console.log('Fetched posts', posts)
      } catch (error) {
         console.log('failed to fetch posts')
      }
   }
}

export const lazyFetch = (url: string, errMessage: string): TaskEither<Error, Array<UserF>> =>
   tryCatch(
      () => fetch(url).then(res => res.json()),
      () => new Error(errMessage)
   )

export const TEStyle = Do(taskEither)
   .bind('users', lazyFetch(usersURI, 'Failed to fetch users'))
   .bindL('singleUser', ({ users }) =>
      users && users[0].id < 2
         ? lazyFetch(userURI(users[0].id), 'failed to detch user')
         : taskEither.of({})
   )
   .bindL('posts', ({ users }) =>
      users && users[0].id < 2
         ? lazyFetch(postsURI(users[0].id), 'failed to fetch user')
         : taskEither.of({})
   )
   .return(({ users, singleUser, posts }) => ({
      users,
      singleUser,
      posts,
   }))

export const invokeTEStyle = () => TEStyle().then(fold(console.error, console.log))
invokeTEStyle()
