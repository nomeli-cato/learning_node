const fs = require("fs")
const csv = require('csvtojson')
const { Transform } = require('stream')
const { pipeline } = require('stream/promises')
const zlib = require('zlib');


const main = async () => {
    const readstream = fs.createReadStream("./src/data/import.csv")

    const writestream = fs.createWriteStream("./src/data/export.csv")


    const myTransform  =  new Transform({

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

    // Define la función para mostrar datos en la consola (showData)
    const showData = new Transform({
         objectMode: true,
         transform(chunk, encoding, callback) {
             // Muestra los datos en la consola
             console.log('Dato transformado:');
             console.log(chunk);
             callback(null, chunk);
             },
       });

    const convertToNdJson = new Transform({
        objectMode: true,
        transform(user, enc, cb){
            const value = JSON.stringify(user) + '\n'
            cb(null, value)
            
        }
    })

    try {
        await pipeline(
            readstream,
            csv({delimiter: ';'},{objectMode: true}),
            myTransform,
            myFilter,
            showData,
            convertToNdJson,
            zlib.createGzip(),
            fs.createWriteStream('./src/data/export.ndjson.gz')
         )
         console.log('Stream ended')
    } catch(error){
        console.error('Stream ended with error: ', error)
    }    
}

main()



