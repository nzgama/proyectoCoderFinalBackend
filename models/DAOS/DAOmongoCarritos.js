const { Schema, model } = require("mongoose");

const carritoSchema = Schema({
  productos: {
    type: [],
    required: true,
  },
});

const carritosModel = model("Carrito", carritoSchema);

class DAOmongo {
  async nuevoCarrito() {
    try {
      const carrito = carritosModel({
        productos: [],
      });
      carrito.save();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getCarritos(id) {
    try {
      const carrito = carritosModel
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
      const carrito = carritosModel
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
      const carrito = carritosModel
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
        carritosModel
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
      const carrito = carritosModel
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
        carritosModel
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
      const carrito = carritosModel
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

module.exports = DAOmongo;
