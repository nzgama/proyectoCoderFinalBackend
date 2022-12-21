const ContenedorFirebase = require("../../contenedores/ContenedorFirebase.js");

class CarritoDaoFirabase extends ContenedorFirebase {
  constructor() {
    super("carritos");
  }
}

module.exports = CarritoDaoFirabase;
