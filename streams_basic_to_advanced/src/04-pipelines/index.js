const fs = require("fs")
const csv = require('csvtojson')
const { Transform } = require('stream')
const { pipeline } = require('stream/promises')

const main = () => {
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
    
    pipeline(
        readstream,
        csv({delimiter: ';'},{objectMode: true}),
        myTransform,
        myFilter,
        showData
    )
    console.log('Stream ended')
}

main()



