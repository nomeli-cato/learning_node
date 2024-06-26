const { Socket } = require('net')
// cmd package
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
})

const END = "END"

const connect = (host, port) => {
  
  const socket = new Socket()
  
  // Manejar el evento de error
  socket.on('error', (err) => {
    error(err.message)
  })
  
  socket.connect({ host, port })
  socket.setEncoding("utf-8")

  socket.on("connect", () => {
    console.log("Connected");

    readline.question("Choose your usarname: ", (username) => {
      socket.write(username)
      console.log(`Type any message to send it, type ${END} to finish`);
    })

    readline.on("line", (message) => {
      socket.write(message)
      if (message === END) {
        socket.end()
        console.log("Disconnected");
      }
    })
    
    socket.on("data", (data) => {
      console.log(data);
    })
    
    socket.on("close", () => process.exit(0))
  })
  
}



const error = (err) => {
  console.error(err)
  process.exit(1)
}

const main = () => {
  if (process.argv.length !==4) {
    error(`Usage: node ${__filename} host port`)
  }

  let [, , host, port] = process.argv
  if (isNaN(port)) {
    error(`Invalid port ${port}`)
  }

  port = Number(port)

  connect(host, port)
}

if (require.main === module) {
  main()
}