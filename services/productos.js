const DAO = require("../models/productos.js");

const getProductos = async () => {
  return await DAO.getAllProducts();
};

const postProducto = async (body) => {
  return await DAO.saveProducts(body);
};

const deletProducto = async (id) => {
  return await DAO.deleteProducts(id);
};

const viewProducto = async (id) => {
  return await DAO.getProducts(id);
};

const saveProducto = async (id, body) => {
  return await DAO.editProducts(id, body);
};
module.exports = {
  getProductos,
  postProducto,
  deletProducto,
  viewProducto,
  saveProducto,
};
