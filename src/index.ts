import fs from 'fs/promises'
import path from 'path'

const pathToFile = path.join(__dirname, '..', 'test.json')

const getJSON = async (path: string) => {
   try {
      const fileContents = await fs.readFile(path)
      return fileContents.toString()
   } catch (e) {
      console.error('error', e)
   }
   return ''
}

const makeNewJson = async () => {
   const { array } = await getJSON(pathToFile).then(JSON.parse)
   return await fs.writeFile(
      path.join(__dirname, '..', 'some.json'),
      JSON.stringify(array.reduce((acc: number, x: number) => acc * x))
   )
}

console.log('lol')
makeNewJson()
