const ContenedorFirebase = require("../../contenedores/ContenedorFirebase.js");

class ProductoDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }
}

module.exports = ProductoDaoFirebase;
