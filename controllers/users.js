const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");

const { user, usuariosModel, findUser } = require("../services/users.js");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  user(id, done);
});

const auth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.render("./layouts/login.hbs");
  }
};

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

passport.use("login", findUser);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      usuariosModel.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
          nombre: req.body.nombre,
          direccion: req.body.direccion,
          edad: req.body.edad,
          telefono: req.body.telefono,
          avatar: req.body.avatar,
        };
        usuariosModel.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

async function login(req, res) {
  const { username } = req.user;
  req.session.user = username;
  req.session.admin = true;
  res.render("./layouts/hello.hbs", { username: req.session.user });
}

async function getLogin(req, res) {
  res.render("./layouts/login.hbs");
}

async function getSignup(req, res) {
  res.render("./layouts/signup.hbs");
}

async function getLogout(req, res) {
  const oldUser = req.session.user;
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      res.send("no pudo deslogear");
    } else {
      res.render("./layouts/bye.hbs", { username: oldUser });
    }
  });
}

module.exports = { passport, auth, login, getLogin, getSignup, getLogout };
