const mongoose = require("mongoose");
const productoSchema = require("../models/productos.js");

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
        .then((response) => response)
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
        .then((response) => response)
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
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteProducts({ _id: id }) {
    try {
      const products = productoSchema
        .delet(id)
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
    let id = 0;
    try {
      const carritos = fs.promises
        .readFile(`${this.coleccion}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      fs.promises
        .readFile(`${this.coleccion}`)
        .then((response) => JSON.parse(response))
        .then((data) => newProduct(data))
        .catch((error) => {
          console.error("Error:", error);
        });

      const newId = (data) => {
        data.map((item) => {
          id = item.id > id ? item.id : id;
        });
        id++;
        return id;
      };

      const newProduct = (data) => {
        id = newId(data);
        data = [
          ...data,
          {
            id: id,
            productos: [],
          },
        ];
        guardarProduct(data);
      };

      const guardarProduct = (data) => {
        fs.promises.writeFile(`${this.coleccion}`, `${JSON.stringify(data)}`);
        console.log(
          `Se a guardado exitosamente el articulo ${body.title} con el ID: ${id}`
        );
      };

      return carritos;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getCarritos(id) {
    try {
      const carritos = fs.promises
        .readFile(`${this.coleccion}`)
        .then((response) => JSON.parse(response))
        .then((data) => data[id - 1])
        .catch((error) => {
          console.error("Error:", error);
        });

      return carritos;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllCarritos() {
    try {
      const carritos = fs.promises
        .readFile(`${this.coleccion}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      return carritos;
    } catch (error) {
      console.error(error);
    }
  }

  async saveProduct(id, productoId) {
    try {
      const carritos = fs.promises
        .readFile(`${this.coleccion}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      fs.promises
        .readFile(`${this.coleccion}`)
        .then((response) => JSON.parse(response))
        .then((data) => edit(data))
        .catch((error) => {
          console.error("Error:", error);
        });

      const edit = (data) => {
        data.forEach((element, key) => {
          console.log(element.productos);
          if (element.id == id) {
            console.log(data[key].productos);
            data[key].productos.push({
              id: Number(productoId),
            });
          }
        });
        guardarProduct(data);
      };

      const guardarProduct = (data) => {
        fs.promises.writeFile(`${this.coleccion}`, `${JSON.stringify(data)}`);
      };
      return carritos;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteProduct(id, productoId) {
    try {
      const carritos = fs.promises
        .readFile(`${this.coleccion}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      fs.promises
        .readFile(`${this.coleccion}`)
        .then((response) => JSON.parse(response))
        .then((data) => edit(data))
        .catch((error) => {
          console.error("Error:", error);
        });

      const edit = (data) => {
        const NewProducts = [];
        console.log(data);
        data.forEach((element, key) => {
          if (element.id == id) {
            element.productos.forEach((element) => {
              if (element.id != productoId) {
                NewProducts.push({ id: element.id });
              }
              data[key].productos = NewProducts;
            });
          }
        });
        guardarProduct(data);
      };

      const guardarProduct = (data) => {
        fs.promises.writeFile(`${this.coleccion}`, `${JSON.stringify(data)}`);
      };
      return carritos;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteCarritos(id) {
    try {
      const carritos = fs.promises
        .readFile(`${this.coleccion}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      fs.promises
        .readFile(`${this.coleccion}`)
        .then((response) => JSON.parse(response))
        .then((data) => delet(data))
        .catch((error) => {
          console.error("Error:", error);
        });

      const delet = (data) => {
        data = data.filter((item) => item.id != id);
        guardarProduct(data);
      };

      const guardarProduct = (data) => {
        fs.promises.writeFile(`${this.coleccion}`, `${JSON.stringify(data)}`);
      };
      return carritos;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

module.exports = ContenedorMongo;
