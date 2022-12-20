import { Schema, model } from "mongoose";
import { connect } from "mongoose";

const UsuarioSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  usuario: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
  password: { type: Number, required: true },
});

const Usuarios = model("usuarios", UsuarioSchema);

export async function connectMG() {
  try {
    return await connect(
      "mongodb+srv://gamal:k7mkUTu7XBAOeWfp@cluster0.6j5lnox.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    );
  } catch (e) {
    console.log(e);
  }
}

const db = await connectMG();
if (!db) throw "can not connect to the db";
