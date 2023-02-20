const fs = require("fs");
const express = require("express");
const { response } = require("express");
const app = express();
const { options } = require("./options/mariaDB");
const knex = require("knex")(options);

class Products {
  constructor() {}

  async createTabla() {
    knex.schema
      .createTable("products", (table) => {
        table.increments("id"),
          table.string("title"),
          table.string("thumbnail"),
          table.decimal("price", 10, 2);
      })
      .then(() => {
        console.log("table products create");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //knex.destroy();
      });
  }

  async getAllProducts() {
    const products = await knex
      .from("products")
      .select("*")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //knex.destroy();
      });

    return products;
  }

  async saveProducts(body) {
    knex("products")
      .insert({
        title: body.title,
        thumbnail: body.thumbnail,
        price: body.price,
      })
      .then((res) => {
        console.log(`product save ID: ${res}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //knex.destroy();
      });
  }
}

module.exports = Products;
