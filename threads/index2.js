const express = require("express")

const app = express()
const port = process.env.PORT || 3000

const { Worker } = require("worker_threads")
const THREAD_COUNT = 4

/*
 * Como saber cuantos procesadores tengo.
 * sysctl -n hw.ncpu
 * echo %NUMBER_OF_PROCESSORS%
 * */

app.get("/non-blocking/", (req, res) => {
    res.status(200).send("this page is non-blocking")
})


function createWorker(){
    return new Promise((resolve, reject) => {
        const worker = new Worker("./four_workers.js", {
            workerData: { thread_count: THREAD_COUNT}
        } )
         worker.on("message", (data) => {
            resolve(data)
         })
 
         worker.on("error", (error) => {
            reject(`An error ocurred ${error}`)
         })   
})


    }


// Esta peticion bloqueara las  
// otras peticiones de  otra ruta
app.get("/blocking", async (req, res) =>  {
    const workerPromises = []
    for (let i = 0; i< THREAD_COUNT; i++){
        workerPromises.push(createWorker())
    }
    const thread_results = await Promises.all(workerPromises)
    const total = thread_results[0] +  thread_results[1] +   thread_results[2] +  thread_results[3] 
    res.status(200).send(`result ${total}`)
})


app.listen(port, () => {
    console.log(`Àpp listening on port ${port}`)
})
