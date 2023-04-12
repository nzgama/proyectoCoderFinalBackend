const { Schema, model } = require("mongoose");

const productoSchema = Schema({
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
  precio: {
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

const productosModel = model("Producto", productoSchema);

class DAOmongo {
  async getProducts(id) {
    try {
      const products = productosModel
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
      const products = productosModel
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
      const product = productosModel({
        nombre: body.nombre,
        codigo: body.codigo,
        stock: body.stock,
        precio: body.precio,
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

      const products = productosModel
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
      const products = productosModel
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
}

module.exports = DAOmongo;
