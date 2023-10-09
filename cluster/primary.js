import cluster from "cluster"
import os from "os"
import { dirname } from "path
import { fileURLToPath } from "url"

const __dirname = dirname(fileUrlToPath(import.meta.url))

const cpuCont = os.cpus().length

console.log(`The total number of CPUs is ${cpuCont}`)
console.log(`Primary pid=${process.pid}`)
cluster.setupPrimary({
    exec: __dirname + "/index.js",
})


for (let i = 0; i < cpuCount; i++) {
    // spawn diferents node to stay awiting requests
    cluster.fork()
}

cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} has been killed`)
    console.log(`Starting another worker`)
    // keep 
    cluster.fork()
})
