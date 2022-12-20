const fs = require("fs");
const express = require("express");
const { response } = require("express");
const app = express();
class ContenedorArchivo {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getProducts(id) {
    try {
      const products = fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => data[id - 1])
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
      const products = fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async saveProducts(body) {
    let id = 0;
    try {
      const products = fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      fs.promises
        .readFile(`${this.archivo}`)
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
            nombre: body.nombre,
            codigo: body.codigo,
            precio: body.precio,
            stock: body.stock,
            timestamp: body.timestamp,
            foto: body.foto,
            descripcion: body.descripcion,
          },
        ];
        guardarProduct(data);
      };

      const guardarProduct = (data) => {
        fs.promises.writeFile(`${this.archivo}`, `${JSON.stringify(data)}`);
        console.log(
          `Se a guardado exitosamente el articulo ${body.title} con el ID: ${id}`
        );
      };

      return products;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async editProducts(id, body) {
    try {
      const products = fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => edit(data))
        .catch((error) => {
          console.error("Error:", error);
        });

      const edit = (data) => {
        data.forEach((element, key) => {
          if (element.id == id) {
            data[key].nombre = body.nombre ? body.nombre : data[key].nombre;
            data[key].codigo = body.codigo ? body.codigo : data[key].codigo;
            data[key].precio = body.precio ? body.precio : data[key].precio;
            data[key].stock = body.stock ? body.stock : data[key].stock;
            data[key].timestamp = body.timestamp
              ? body.timestamp
              : data[key].timestamp;
            data[key].foto = body.foto ? body.foto : data[key].foto;
            data[key].descripcion = body.descripcion
              ? body.descripcion
              : data[key].descripcion;
          }
        });
        guardarProduct(data);
      };

      const guardarProduct = (data) => {
        fs.promises.writeFile(`${this.archivo}`, `${JSON.stringify(data)}`);
      };
      return products;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteProducts(id) {
    try {
      const products = fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      fs.promises
        .readFile(`${this.archivo}`)
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
        fs.promises.writeFile(`${this.archivo}`, `${JSON.stringify(data)}`);
      };
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
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      fs.promises
        .readFile(`${this.archivo}`)
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
        fs.promises.writeFile(`${this.archivo}`, `${JSON.stringify(data)}`);
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
        .readFile(`${this.archivo}`)
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
        .readFile(`${this.archivo}`)
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
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      fs.promises
        .readFile(`${this.archivo}`)
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
        fs.promises.writeFile(`${this.archivo}`, `${JSON.stringify(data)}`);
      };
      return carritos;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteProduct(id, productoId) {
    try {
      const carritos = fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      fs.promises
        .readFile(`${this.archivo}`)
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
        fs.promises.writeFile(`${this.archivo}`, `${JSON.stringify(data)}`);
      };
      return carritos;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteCarritos(id) {
    try {
      const carritos = fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      fs.promises
        .readFile(`${this.archivo}`)
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
        fs.promises.writeFile(`${this.archivo}`, `${JSON.stringify(data)}`);
      };
      return carritos;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

module.exports = ContenedorArchivo;
