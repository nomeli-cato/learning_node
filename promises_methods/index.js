async function run(type, task) {
    try{
        const res = await task
        console.log(type, "success", res)
    } catch(error){
        console.log(type, "error", error)
    }
}

const promises = [
    Promise.resolve("Task completed"),
    Promise.resolve("Invalid parameter"),
    Promise.resolve("yes")
]

run("Promise.all", Promise.all(promises))


const promises_rejected = [
    Promise.resolve("Task completed"),
    Promise.resolve("Invalid parameter"),
    Promise.resolve("yes")
]

// Si una promesa es rejected se pausa la ejecucion
// y muestra el mensaje 
run("Promise.all", Promise.all(promises_rejected))

