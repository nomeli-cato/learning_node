const fs = require("fs")

const main = () => {
    const readStream = fs.createReadStream("./src/data/import.csv")

    const writeStream = fs.createWriteStream("./src/data/export.csv")

    readStream.on('data', (buffer) => {
        console.log('>>> DATA: ')
        console.log(buffer.toString())

        writeStream.write(buffer)
    })

    readStream.on('end', () =>{
        console.log('Stream ended')
        writeStream.end()
    })
}

main()



