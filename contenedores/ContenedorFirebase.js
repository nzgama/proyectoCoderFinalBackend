const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();
class ContenedorFirebase {
  constructor(coleccion) {
    this.coleccion = coleccion;
  }

  async getProducts(id) {
    try {
      const res = await db.collection(this.coleccion).doc(id);
      const resDoc = await res.get();
      let products = { id: resDoc.id, ...resDoc.data() };
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllProducts() {
    try {
      const res = await db.collection(this.coleccion).get();
      let products = res.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async saveProducts(body) {
    try {
      await db.collection(this.coleccion).doc().set({
        nombre: body.nombre,
        codigo: body.codigo,
        stock: body.stock,
        timestamp: body.timestamp,
        foto: body.foto,
        descripcion: body.descripcion,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async editProducts(id, body) {
    try {
      const refDoc = await db.collection(this.coleccion).doc(id);
      await refDoc.update({
        nombre: body.nombre,
        codigo: body.codigo,
        stock: body.stock,
        timestamp: body.timestamp,
        foto: body.foto,
        descripcion: body.descripcion,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProducts(id) {
    try {
      await db.collection(this.coleccion).doc(id).delete();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //carrito//

  async nuevoCarrito() {
    try {
      await db.collection(this.coleccion).doc().set({
        productos: [],
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getCarritos(id) {
    try {
      const res = await db.collection(this.coleccion).doc(id);
      const resDoc = await res.get();
      let carrito = { id: resDoc.id, ...resDoc.data() };
      return carrito;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllCarritos() {
    try {
      const res = await db.collection(this.coleccion).get();
      let carrito = res.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      return carrito;
    } catch (error) {
      console.error(error);
    }
  }

  async saveProduct(id, productoId) {
    try {
      const res = await db.collection(this.coleccion).doc(id);
      const resDoc = await res.get();
      let carrito = { id: resDoc.id, ...resDoc.data() };

      carrito.productos.push({
        id: productoId,
      });

      let productos = carrito.productos;

      await res.update({
        productos,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id, productoId) {
    try {
      const res = await db.collection(this.coleccion).doc(id);
      const resDoc = await res.get();
      const productos = [];
      let carrito = { id: resDoc.id, ...resDoc.data() };

      console.log(carrito);

      carrito.productos.forEach((element) => {
        if (element.id != productoId) {
          productos.push({
            id: element.id,
          });
        }
      });

      await res.update({
        productos,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteCarritos(id) {
    try {
      await db.collection(this.coleccion).doc(id).delete();
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

module.exports = ContenedorFirebase;
