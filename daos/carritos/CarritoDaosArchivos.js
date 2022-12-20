const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class CarritoDaoArchvos extends ContenedorArchivo {
  constructor() {
    super("data/carrito.json");
  }
}

module.exports = CarritoDaoArchvos;
