const { DAOmongo, usuariosModel } = require("./DAOS/DAOmongoUsers.js");

let DAO;

DAO = new DAOmongo();

module.exports = { DAO, usuariosModel };
