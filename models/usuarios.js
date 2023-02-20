const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  nombre: { type: String, required: true, max: 100 },
  direccion: { type: String, required: true, max: 100 },
  edad: { type: String, required: true, max: 100 },
  telefono: { type: String, required: true, max: 100 },
  avatar: { type: String, required: true, max: 100 },
});

const Usuarios = mongoose.model("usuarios", UsuarioSchema);
module.exports = Usuarios;
