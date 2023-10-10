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

// reason es el mensaje de error
// no para la ejecucion aunque alguna sea rejected
// y mostrara el mensaje de todas
// todas se ejecutan hasta el final
run("Promise.all", Promise.allSettled(promises))


