const {
  getProductos,
  postProducto,
  deletProducto,
  viewProducto,
  saveProducto,
} = require("../services/productos.js");

async function index(req, res) {
  const datos = await getProductos();
  res.render("./productos/index", { products: datos });
}

async function add(req, res) {
  res.render("./productos/add");
}

async function post(req, res) {
  await postProducto(req.body);
  const datos = await getProductos();
  res.render("./productos/index", { products: datos });
}

async function delet(req, res) {
  const { id } = req.params;
  await deletProducto(id);
}

async function view(req, res) {
  const { id } = req.params;
  const datos = await viewProducto(id);
  res.render("./productos/view", { products: datos });
}

async function edit(req, res) {
  const { id } = req.params;
  const datos = await viewProducto(id);
  res.render("./productos/edit", { products: datos });
}

async function save(req, res) {
  const { id } = req.params;
  await saveProducto(id, req.body);
  const datos = await getProductos();
  res.render("./productos/index", { products: datos });
}

module.exports = { index, add, post, delet, view, edit, save };
