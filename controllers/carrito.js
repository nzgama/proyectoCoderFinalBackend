const { getProductos } = require("../services/productos.js");
const {
  getCarritos,
  nuevo,
  borrar,
  borrarProducto,
  guardarProducto,
} = require("../services/carrito.js");

async function index(req, res) {
  const datos = await getCarritos();
  res.render("./carrito/index.hbs", { carritos: datos });
}

async function view(req, res) {
  const { id } = req.params;
  const datos = await getCarritos(id);
  res.render("./carrito/view.hbs", {
    carritos: datos.productos,
    id: datos.id,
  });
}

async function post(req, res) {
  await nuevo();
  res.json("ok");
}

async function eliminar(req, res) {
  const { id } = req.params;
  await borrar(id);
  res.json("ok");
}

async function eliminarProducto(req, res) {
  const { productoId, carritoId } = req.params;
  await borrarProducto(carritoId, productoId);
  res.json("ok");
}

async function edit(req, res) {
  const { id } = req.params;
  const carritos = await getCarritos(id);
  const products = await getProductos();
  res.render("./carrito/edit", {
    carritos: carritos.productos,
    id: id,
    products: products,
  });
}

async function postProducto(req, res) {
  const { id } = req.body;
  const { carritoId } = req.params;
  await guardarProducto(carritoId, id);
  res.json("ok");
}

module.exports = {
  index,
  view,
  post,
  eliminar,
  eliminarProducto,
  edit,
  postProducto,
};
