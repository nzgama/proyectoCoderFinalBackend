const express = require("express");
const { Router } = express;
const {
  index,
  add,
  post,
  delet,
  view,
  edit,
  save,
} = require("../controllers/productos.js");

const routerProductos = new Router();

routerProductos.get("/", index);

routerProductos.get("/add", add);

routerProductos.post("/add", post);

routerProductos.delete("/:id", delet);

routerProductos.get("/:id", view);

routerProductos.get("/edit/:id", edit);

routerProductos.put("/:id", save);

module.exports = routerProductos;
