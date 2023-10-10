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

// solo resuelve la primera promesa resuelta o rechazada
// abortando las otras cuando pase el evento
run("Promise.all", Promise.race(promises))


