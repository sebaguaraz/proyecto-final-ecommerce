const express = require("express")
const http = require("http")
const dotenv = require("dotenv")
const routesProducts = require("./routes/products.js")
const routesCarts = require("./routes/carts.js")
const routesViews = require("./routes/views.js")
const { getConnectionMongoDB } = require("./config.js")
const { engine } = require("express-handlebars")
const { Server } = require("socket.io")
dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server)
app.engine("handlebars", engine({ defaultLayout: false }))
app.set("view engine", "handlebars")
app.set("views", "./views")
const PORT = process.env.PORT || 8080
app.use(express.static('public'));
const handlerBodyParser = express.json()
app.use(handlerBodyParser)
app.use("/api/products", routesProducts)
app.use("/api/carts", routesCarts)
app.use("/", routesViews)
app.set("io", io)

io.on("connection", function (socket) {
    console.log(`Un usuario se ha conectado, ${socket.id}`);
    socket.on("disconnect", function () {
        console.log(`El usuario se ha desconectado, ${socket.id}`);
    })
})

async function startServer() {
    try {
        await getConnectionMongoDB()
        console.log("Conexión a MongoDB establecida correctamente")
        server.listen(PORT, function () {
            console.log(`Servidor escuchando peticiones en http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("No se pudo conectar a MongoDB:", error.message)
        process.exit(1)
       
    }

}
startServer()