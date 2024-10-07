// > bun index.ts
console.log("Hello via Bun!");

const txtFile = Bun.file("data/text.txt")
console.log(txtFile)
console.log(txtFile.size)
console.log(txtFile.type)
console.log(txtFile.name)
console.log(await txtFile.text())

Bun.write("data/text.txt", "Hello, World!")

console.log("--------------------------")

const jsonFile = Bun.file("data/users.json")
console.log(await jsonFile.json())

const o = {"name": "John"}

const data = await jsonFile.json()

data.users.push(o)

Bun.write("data/users.json", JSON.stringify(data))
