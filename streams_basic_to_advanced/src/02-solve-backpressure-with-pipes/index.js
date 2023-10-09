const fs = require("fs")

const main = () => {
    const readstream = fs.createreadstream("./src/data/import.csv")

    const writestream = fs.createwritestream("./src/data/export.csv")

    readstream.pipe(writestream)
}

main()



