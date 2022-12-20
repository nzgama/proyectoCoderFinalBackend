const ContenedorMongo = require("../../contenedores/ContenedorMongo.js");

class ProductoDaoMongo extends ContenedorMongo {
  constructor() {
    super("productos");
  }
}

module.exports = ProductoDaoMongo;
