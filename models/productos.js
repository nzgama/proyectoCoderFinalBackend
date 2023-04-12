const DAOmongo = require("./DAOS/DAOmongoProductos.js");

let DAO;

DAO = new DAOmongo();

module.exports = DAO;
