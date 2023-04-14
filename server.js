const compression = require("compression");
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");
const express = require("express");
const session = require("express-session");
const app = express();

const routerProductos = require("./rutas/productos.js");
const routerCarrito = require("./rutas/carrito.js");
const routerUsers = require("./rutas/users.js");

require("./connection.js");
require("dotenv").config();

app.use(compression());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `${process.env.CONECCIONDB}`,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

const port = process.env.PORT;
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const msgs = [
  {
    socketid: "",
    email: "Creador",
    mensaje:
      "Bienvendo al proyecto, pedes ecribir en este chat pero nadie te repondera (:",
    fecha: "El origen de los timpos.",
  },
];

httpServer.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);

//HBS
app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
app.use("/", routerUsers);

//CHAT - MEMORIA
io.on("connection", (socket) => {
  socket.on("msg", async (data) => {
    const now = new Date();
    msgs.push({
      socketid: socket.id,
      email: data.email,
      mensaje: data.mensaje,
      fecha: `${now.toUTCString()}`,
    });
    io.sockets.emit("msg-list", msgs);
  });
});
