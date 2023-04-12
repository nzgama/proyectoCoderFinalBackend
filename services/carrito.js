const DAO = require("../models/carritos.js");

async function getCarritos() {
  return await DAO.getAllCarritos();
}

async function nuevo() {
  return await DAO.nuevoCarrito();
}

async function borrar(id) {
  return await DAO.deleteCarritos(id);
}

async function borrarProducto(carritoId, productoId) {
  return await DAO.deleteProduct(carritoId, productoId);
}

async function guardarProducto(carritoId, id) {
  return await DAO.saveProduct(carritoId, id);
}

module.exports = {
  getCarritos,
  nuevo,
  borrar,
  borrarProducto,
  guardarProducto,
};
