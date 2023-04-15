const express = require("express");
const { Router } = express;
const {
  index,
  view,
  post,
  eliminar,
  eliminarProducto,
  edit,
  postProducto,
} = require("../controllers/carrito.js");

const routerCarrito = Router();

routerCarrito.get("/", index);

routerCarrito.get("/:id/productos", view);

routerCarrito.post("/", post);

routerCarrito.delete("/:id", eliminar);

routerCarrito.delete("/:carritoId/productos/:productoId", eliminarProducto);

routerCarrito.get("/edit/:id", edit);

routerCarrito.post("/:carritoId/productos", postProducto);

module.exports = routerCarrito;
