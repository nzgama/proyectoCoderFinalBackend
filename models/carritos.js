const mongoose = require("mongoose");

const carritoSchema = mongoose.Schema({
  productos: {
    type: [],
    required: true,
  },
});

module.exports = mongoose.model("Carrito", carritoSchema);
