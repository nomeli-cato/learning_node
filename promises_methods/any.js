async function run(type, task) {
    try{
        const res = await task
        console.log(type, "success", res)
    } catch(error){
        console.log(type, "error", error)
    }
}

const promises = [
    Promise.reject("Task completed"),
    Promise.reject("Invalid parameter"),
    Promise.reject("yes")
]


// la primera respuesta que se resuelva para, y muestra mensaje
// si se rechazan todas muestra el agregateError osea un 
// conjunto de errores
run("Promise.all", Promise.any(promises))


