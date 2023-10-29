import fs from "node:fs/promises"

const readPJson = async () => {
  const jsonPath = new URL("package.json", import.meta.url).pathname
  // async readfile
  console.log(JSON.parse(await fs.readFile(jsonPath, "utf-8")))
}

const writeFile = async () => {
  const newFile = new URL("./demo.js", import.meta.url).pathname
  await fs.writeFile(newFile, `console.log('this is demo.js file')`)
}

readPJson()
writeFile()
