const { Schema, model } = require("mongoose");

const suarioSchema = Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  nombre: { type: String, required: true, max: 100 },
  direccion: { type: String, required: true, max: 100 },
  edad: { type: String, required: true, max: 100 },
  telefono: { type: String, required: true, max: 100 },
  avatar: { type: String, required: true, max: 100 },
});

const usuariosModel = model("usuarios", suarioSchema);

class DAOmongo {
  async user(id, done) {
    usuariosModel.findById(id, done);
  }
}

module.exports = { DAOmongo, usuariosModel };
