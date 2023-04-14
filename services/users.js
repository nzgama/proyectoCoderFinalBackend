const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { DAO, usuariosModel } = require("../models/usuarios.js");

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const user = async (id, done) => {
  return await DAO.user(id, done);
};

const findUser = new LocalStrategy((username, password, done) => {
  usuariosModel.findOne({ username }, (err, user) => {
    if (err) return done(err);

    if (!user) {
      console.log("User Not Found with username " + username);
      return done(null, false);
    }

    if (!isValidPassword(user, password)) {
      console.log("Invalid Password");
      return done(null, false);
    }

    return done(null, user);
  });
});

module.exports = { user, usuariosModel, findUser };
