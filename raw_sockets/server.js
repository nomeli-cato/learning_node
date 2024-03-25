const { Server } = require("net")


// flags
const END = "END"

const connections = new Map()

const sendMessage = (message, origin) => {
  for (const socket of connections.keys()) {
    if (socket !== origin) {
      socket.write(message)
    }
  }
}

const listen = (port) => {
  const server = new Server()

  server.on("connection", (socket) => {
    const remoteSocket = `${socket.remoteAddress}:${socket.remotePort}`
    console.log(`New connection from ${socket.remoteAddress}:${socket.remotePort}`);
  
    socket.setEncoding("utf-8")
    socket.on("data", (message) => {
      if (!connections.has(socket)) {
        console.log(`Username ${message} set for connection ${remoteSocket}`);
        connections.set(socket, message)
      }
      else if (message === END) {
        console.log(`Connection with ${remoteSocket} closed`);
        connections.delete(socket)
        socket.end()
      } else {
        // Enviar el mensaje al resto de cliente
        for (const username of connections.values()) {
          console.log(username);
        }
        const fullMessage = `[${connections.get(socket)}]: ${message}`

        console.log(`${remoteSocket} -> ${message}`);
        sendMessage(message, socket)
      }
    })
  
    socket.on("close", () =>       console.log(`Connection with ${remoteSocket} closed`))
  })
  // cada que se conecte al port del servidor, se conectara a un port "digital"
  
  server.listen({ port, host: "0.0.0.0" }, () => {
    console.log(" Listening on port 8000");
  })

  server.on("error", (err) => error(err.message))
  
}

const error = (err) => {
  console.error(err);
  process.exit(1)
}

const main = () => {

  if (process.argv.length !== 3) {
    error(`Usage: node ${__filename} port`)
  }
  
  let port = process.argv[2]
  if (isNaN(port)) {
    error(`Invalid por ${port}`)
  }

  port = Number(port)

  listen(port)
}

if (require.main === module) {
  main()
}