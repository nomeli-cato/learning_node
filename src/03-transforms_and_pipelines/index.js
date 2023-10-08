const fs = require("fs")
const csv = require('csvtojson')
const { Transform } = require('stream')

const main = () => {
    const readstream = fs.createReadStream("./src/data/import.csv")

    const writestream = fs.createWriteStream("./src/data/export.csv")

    const myFilter = new Transform({
        objectMode: true,
        transform(user, enc, callback) {
            if(!user.isActive || user.salary < 1000 ){
                callback(null)
                return
            }
            callback(null, user)
        }
    })


    readstream
        .pipe(csv({
            delimiter: ';'
         },{
            objectMode: true
         })
        )
        .pipe(
            new Transform({
                objectMode: true,
                transform(chunk, encoding, callback){
                    //console.log('>> chunk:', chunk)
                    const user = {
                        name: chunk.name,
                        email: chunk.email.toLowerCase(),
                        age: Number(chunk.age),
                        salary: Number(chunk.salary),
                        isActive: chunk.isActive === 'true'
                    }
                    //callback('some error') show error in the first before chunk and finish the program
                    //callback(null)
                    callback(null, user)
                }
            })
        )
        .on('error', error => {
            console.error('Stream error:', error)
            cb(error)
        })
        .pipe(
            myFilter
        )
       //.pipe(writestream)
        .on('data', data => {
            console.log('>>>> data: ')
            console.log(data)
        })
        .on('error', error => {
            console.error('stream error: ', error)
            cb(error)
        })
        .on('end', () => {
            console.log('Stream ended!')
        })
}

main()



