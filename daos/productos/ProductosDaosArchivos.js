const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class ProductosDaoArchvos extends ContenedorArchivo {
  constructor() {
    super("data/productos.json");
  }
}

module.exports = ProductosDaoArchvos;
