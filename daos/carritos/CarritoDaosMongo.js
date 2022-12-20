const ContenedorMongo = require("../../contenedores/ContenedorMongo.js");
const mongoose = require("mongoose");

const carritoSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  productos: {
    type: [],
    required: true,
  },
});

class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos");
  }
}

module.exports = CarritoDaoMongo;
module.exports = mongoose.model("Carrito", carritoSchema);
