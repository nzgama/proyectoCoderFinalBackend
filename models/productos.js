const mongoose = require("mongoose");

const productoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Producto", productoSchema);
