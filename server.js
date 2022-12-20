const express = require("express");
const { Router } = express;
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
require("dotenv").config();

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

const ProductosDaoArchvos = require(`./daos/productos/Productos${process.env.INSTANCIA}`);
const productos = new ProductosDaoArchvos(`${process.env.DATAPRODUCTOS}`);

const CarritoDaoArchvos = require(`./daos/carritos/Carrito${process.env.INSTANCIA}`);
const carrito = new CarritoDaoArchvos(`${process.env.DATACARRITO}`);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/*", async (req, res) => {
  res.render("./partials/ops");
}); //*********************USER****************************//
const administrador = true;

//*********************PRODUCTOS****************************//

routerProductos.get("/", async (req, res) => {
  const products = await productos.getAllProducts();
  res.render("./productos/index", { products: products });
});

routerProductos.get("/add", async (req, res) => {
  if (administrador) {
    res.render("./productos/add");
  } else {
    res.render("./partials/permissions");
  }
});

routerProductos.get("/edit/:id", async (req, res) => {
  if (administrador) {
    const { id } = req.params;
    const producto = await productos.getProducts(id);
    res.render("./productos/edit", { products: producto });
  } else {
    res.render("./partials/permissions");
  }
});

routerProductos.get("/:id", async (req, res) => {
  const { id } = req.params;
  const producto = [await productos.getProducts(id)];
  res.render("./productos/view", { products: producto });
});

routerProductos.put("/:id", async (req, res) => {
  if (administrador) {
    const { body } = req;
    const { id } = req.params;
    const addProductos = await productos.editProducts(id, body);
    res.json("ok");
  } else {
    res.render("./partials/permissions");
  }
});

routerProductos.post("/", async (req, res) => {
  if (administrador) {
    const { body } = req;
    const addProductos = await productos.saveProducts(body);
    res.json("ok");
  } else {
    res.render("./partials/permissions");
  }
});

routerProductos.delete("/:id", async (req, res) => {
  if (administrador) {
    const { id } = req.params;
    await productos.deleteProducts(id);
    res.json("ok");
  } else {
    res.render("./partials/permissions");
  }
});

//*********************CARRITO****************************//

routerCarrito.get("/", async (req, res) => {
  const carritos = await carrito.getAllCarritos();
  res.render("./carrito/index", { carritos: carritos });
});

routerCarrito.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const carritos = await carrito.getCarritos(id);
  res.render("./carrito/view", {
    carritos: carritos.productos,
    id: carritos.id,
  });
});

routerCarrito.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const carritos = await carrito.getCarritos(id);
  const products = await productos.getAllProducts();
  if (administrador) {
    res.render("./carrito/edit", {
      carritos: carritos.productos,
      id: carritos.id,
      products: products,
    });
  } else {
    res.render("./partials/permissions");
  }
});

routerCarrito.post("/", async (req, res) => {
  const carritos = await carrito.nuevoCarrito();
  const last = carritos[carritos.length - 1];
  if (administrador) {
    res.json(last.id + 1);
  } else {
    res.render("./partials/permissions");
  }
});

routerCarrito.post("/:carritoId/productos", async (req, res) => {
  const { id } = req.body;
  const { carritoId } = req.params;
  if (administrador) {
    const carritos = await carrito.saveProduct(carritoId, id);
    res.json("ok");
  } else {
    res.render("./partials/permissions");
  }
});

routerCarrito.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (administrador) {
    const deletCarritos = await carrito.deleteCarritos(id);
    res.json("ok");
  } else {
    res.render("./partials/permissions");
  }
});

routerCarrito.delete("/:carritoId/productos/:productoId", async (req, res) => {
  const { productoId } = req.params;
  const { carritoId } = req.params;
  if (administrador) {
    const deletCarritos = await carrito.deleteProduct(carritoId, productoId);
    res.json("ok");
  } else {
    res.render("./partials/permissions");
  }
});
