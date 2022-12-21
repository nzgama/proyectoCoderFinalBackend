const mongoose = require("mongoose");
const productoSchema = require("../models/productos.js");
const carritoSchema = require("../models/carritos.js");

const uri =
  "mongodb+srv://gamal:k7mkUTu7XBAOeWfp@cluster0.6j5lnox.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("conectado a mongodb"))
  .catch((e) => console.log("error de conexión", e));

class ContenedorMongo {
  constructor(coleccion) {
    this.coleccion = coleccion;
  }

  async getProducts(id) {
    try {
      const products = productoSchema
        .findById(id)
        .then((response) => JSON.stringify(response))
        .then((data) => JSON.parse(data))
        .catch((error) => {
          console.error("Error:", error);
        });
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllProducts() {
    try {
      const products = productoSchema
        .find()
        .then((response) => JSON.stringify(response))
        .then((data) => JSON.parse(data))
        .catch((error) => {
          console.error("Error:", error);
        });
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async saveProducts(body) {
    try {
      const product = productoSchema({
        nombre: body.nombre,
        codigo: body.codigo,
        stock: body.stock,
        timestamp: body.timestamp,
        foto: body.foto,
        descripcion: body.descripcion,
      });
      product.save();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async editProducts(id, body) {
    try {
      const nombre = body.nombre;
      const codigo = body.codigo;
      const precio = body.precio;
      const stock = body.stock;
      const timestamp = body.timestamp;
      const foto = body.foto;
      const descripcion = body.descripcion;

      const products = productoSchema
        .updateOne(
          { _id: id },
          {
            $set: {
              nombre,
              codigo,
              precio,
              stock,
              timestamp,
              foto,
              descripcion,
            },
          }
        )
        .then((response) => response)
        .catch((error) => {
          console.error("Error:", error);
        });
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProducts(id) {
    try {
      const products = productoSchema
        .remove({ _id: id })
        .then((response) => response)
        .catch((error) => {
          console.error("Error:", error);
        });
      return products;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //carrito//

  async nuevoCarrito() {
    try {
      const carrito = carritoSchema({
        productos: [],
      });
      carrito.save();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getCarritos(id) {
    try {
      const carrito = carritoSchema
        .findById(id)
        .then((response) => JSON.stringify(response))
        .then((data) => JSON.parse(data))
        .catch((error) => {
          console.error("Error:", error);
        });
      return carrito;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllCarritos() {
    try {
      const carrito = carritoSchema
        .find()
        .then((response) => JSON.stringify(response))
        .then((data) => JSON.parse(data))
        .catch((error) => {
          console.error("Error:", error);
        });
      return carrito;
    } catch (error) {
      console.error(error);
    }
  }

  async saveProduct(id, productoId) {
    try {
      const carrito = carritoSchema
        .findById(id)
        .then((response) => JSON.stringify(response))
        .then((data) => addProduct(JSON.parse(data)))
        .catch((error) => {
          console.error("Error:", error);
        });

      const addProduct = (data) => {
        data.productos.push({
          id: productoId,
        });
        update(data.productos);
      };

      const update = (productos) => {
        carritoSchema
          .updateOne(
            { _id: id },
            {
              $set: {
                productos,
              },
            }
          )
          .then((response) => response)
          .catch((error) => {
            console.error("Error:", error);
          });
      };

      return carrito;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id, productoId) {
    try {
      const carrito = carritoSchema
        .findById(id)
        .then((response) => JSON.stringify(response))
        .then((data) => deleteProduct(JSON.parse(data)))
        .catch((error) => {
          console.error("Error:", error);
        });

      const deleteProduct = (data) => {
        const newProduct = [];

        data.productos.forEach((element) => {
          if (element.id != productoId) {
            newProduct.push({
              id: element.id,
            });
          }
        });
        update(newProduct);
      };

      const update = (productos) => {
        carritoSchema
          .updateOne(
            { _id: id },
            {
              $set: {
                productos,
              },
            }
          )
          .then((response) => response)
          .catch((error) => {
            console.error("Error:", error);
          });
      };

      return carrito;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCarritos(id) {
    try {
      const carrito = carritoSchema
        .remove({ _id: id })
        .then((response) => response)
        .catch((error) => {
          console.error("Error:", error);
        });
      return carrito;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

module.exports = ContenedorMongo;
