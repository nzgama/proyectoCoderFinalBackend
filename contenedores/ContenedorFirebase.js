const admin = require("firebase-admin");

const serviceAccount = require("../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class ContenedorFirebase {
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
        .then((response) => response)
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
        .then((response) => response)
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
        .updateOne(
          { _id: id },
          {
            $set: {
              productoId,
            },
          }
        )
        .then((response) => response)
        .catch((error) => {
          console.error("Error:", error);
        });
      return carrito;
    } catch (error) {
      console.error(error);
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

module.exports = ContenedorFirebase;