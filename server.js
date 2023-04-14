const compression = require("compression");
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");
const express = require("express");
const session = require("express-session");
const { connect } = require("mongoose");
const yargs = require("yargs/yargs")(process.argv.slice(2));
const args = yargs.default({ port: 8080 }).argv;
const app = express();

const routerProductos = require("./rutas/productos.js");
const routerCarrito = require("./rutas/carrito.js");
const routerUsers = require("./rutas/users.js");

require("dotenv").config();

app.use(compression());

const connectMG = async () => {
  try {
    await connect(`${process.env.CONECCIONDB}`);
  } catch (error) {
    console.error(error);
    throw "can not connect to the bd";
  }
};

connectMG();

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

const port = process.env.PORT || args.port;
const httpServer = require("http").createServer(app);

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
