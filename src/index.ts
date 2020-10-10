import { readFile, writeFile } from 'fs/promises'
//import { readFileSync, readFile } from 'fs'
import path from 'path'
import { tryCatch, TaskEither } from 'fp-ts/lib/TaskEither'
import { toError } from 'fp-ts/lib/Either'
//import { IOEither, tryCatch } from 'fp-ts/lib/IOEither'

const getFile = (path: string): TaskEither<Error, string> =>
   tryCatch(() => readFile(path, 'utf-8'), toError)

const pathToFile = path.join(__dirname, '..', 'test.json')

const getJSON = async (path: string) => {
   try {
      const fileContents = await readFile(path)
      return fileContents.toString()
   } catch (e) {
      console.error('error', e)
   }
   return ''
}

const makeNewJson = async () => {
   const { array } = await getJSON(pathToFile).then(JSON.parse)
   return await writeFile(
      path.join(__dirname, '..', 'some.json'),
      JSON.stringify(array.reduce((acc: number, x: number) => acc * x))
   )
}

console.log('lol')
//makeNewJson()

getFile(pathToFile)().then(console.error, console.log)
