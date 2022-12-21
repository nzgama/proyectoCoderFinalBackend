const ContenedorMongo = require("../../contenedores/ContenedorMongo.js");

class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos");
  }
}

module.exports = CarritoDaoMongo;
