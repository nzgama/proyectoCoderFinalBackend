import { connect } from "mongoose";
import { Usuarios } from "./models/usuario.js";

async function connectMG() {
  try {
    await connect("mongodb://127.0.0.1:27017/ecommerce", {
      useNewUrlParser: true,
    });
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}

console.log("conectanto...");
await connectMG();
console.log("conectado!!!");
