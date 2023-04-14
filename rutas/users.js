const express = require("express");
const { Router } = express;
const routerUsers = Router();

const {
  passport,
  auth,
  login,
  getLogin,
  getSignup,
  getLogout,
} = require("../controllers/users.js");

routerUsers.use(passport.initialize());
routerUsers.use(passport.session());

routerUsers.get("/", auth, async (req, res) => {
  res.render("index.hbs", { username: req.session.user });
});

routerUsers.get("/login", getLogin);

routerUsers.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "faillogin" }),
  login
);

routerUsers.get("/signup", getSignup);

routerUsers.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "signup" }),
  async (req, res) => {
    res.render("./layouts/login.hbs", { message: "success in registering" });
  }
);

routerUsers.get("/logout", getLogout);

module.exports = routerUsers;
