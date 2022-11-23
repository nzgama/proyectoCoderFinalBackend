const express = require("express");
const { Router } = express;
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
const routerProductos = Router();
const routerCarrito = Router();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

const Productos = require("./clases/classProductos");
const productos = new Productos("./data/productos.json");

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.get("/", async (req, res) => {
  res.render("index");
});

//*********************USER****************************//
const user = "admin";

//*********************PRODUCTOS****************************//

routerProductos.get("/", async (req, res) => {
  const products = await productos.getAllProducts();
  res.render("./productos/index", { products: products });
});

routerProductos.get("/add", async (req, res) => {
  res.render("./productos/add");
});

routerProductos.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const producto = await productos.getProducts(id);
  res.render("./productos/edit", { products: producto });
});

routerProductos.get("/:id", async (req, res) => {
  const { id } = req.params;
  const producto = [await productos.getProducts(id)];
  res.render("./productos/view", { products: producto });
});

routerProductos.put("/", async (req, res) => {
  if (user == "admin") {
    const { body } = req;
    const { id } = req.body;
    const addProductos = await productos.editProducts(id, body);
    res.json("ok");
  } else {
    res.render("./partials/permissions");
  }
});

routerProductos.post("/", async (req, res) => {
  if (user == "admin") {
    const { body } = req;
    const addProductos = await productos.saveProducts(body);
    res.json("ok");
  } else {
    res.render("./partials/permissions");
  }
});

routerProductos.delete("/", async (req, res) => {
  if (user == "admin") {
    const { id } = req.body;
    const deletProducts = await productos.deleteProducts(id);
    res.json("ok");
  } else {
    res.render("./partials/permissions");
  }
});

//*********************CARRITO****************************//

routerCarrito.get("/", async (req, res) => {});

routerCarrito.put("/", async (req, res) => {});

routerCarrito.post("/", async (req, res) => {});

routerCarrito.delete("/", async (req, res) => {});
