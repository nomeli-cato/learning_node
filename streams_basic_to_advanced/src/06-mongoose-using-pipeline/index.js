const fs = require("fs")
const csv = require('csvtojson')
const { Transform } = require('stream')
const { pipeline } = require('stream/promises')
const mongoose = require('mongoose')
const UserModel = require('./user.model')
require('dotenv').config()

const main = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@user.u0lyv4g.mongodb.net/?retryWrites=true&w=majority`)
    const readstream = fs.createReadStream("./src/data/import.csv")
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


    const saveUser = new Transform({
        objectMode: true,
        async transform(user, enc, cb){
            await UserModel.create(user)
            cb(null)
        }
    })


    try {
        await pipeline(
            readstream,
            csv({delimiter: ';'},{objectMode: true}),
            myTransform,
            myFilter,
            saveUser
         )
         console.log('Stream ended')
    } catch(error){
        console.error('Stream ended with error: ', error)
    }    
}

main()



