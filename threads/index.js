const express = require("express")

const app = express()
const port = process.env.PORT || 3000

const { Worker } = require("worker_threads")

/*
 * Como saber cuantos procesadores tengo.
 * sysctl -n hw.ncpu
 * echo %NUMBER_OF_PROCESSORS%
 * */

app.get("/non-blocking/", (req, res) => {
    res.status(200).send("this page is non-blocking")
})

// Esta peticion bloqueara las  
// otras peticiones de  otra ruta
app.get("/blocking", (req, res) =>  {
    const worker = new Worker("./worker.js")

    worker.on("message", (data) => {
        res.status(200).send(`result is ${data}`)
    })
 
    worker.on("error", (error) => {

        res.status(404).send(`result is ${error}`)
    })   
})

app.listen(port, () => {
    console.log(`Àpp listening on port ${port}`)
})
