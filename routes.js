const winston = require("winston");
const logger = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console({ level: "verbose" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "warn.log", level: "warning" }),
  ],
});

function getRoot(req, res) {
  res.render("./layouts/login.hbs", {});
}

function getLogin(req, res) {
  logger.log("info", "/login - GET");
  res.render("./layouts/login.hbs");
}

function getSignup(req, res) {
  logger.log("info", "/signup - GET");
  res.render("./layouts/signup.hbs");
}

function postLogin(req, res) {
  const { username } = req.user;
  req.session.user = username;
  req.session.admin = true;
  logger.log("info", "/login - POST");
  res.render("./layouts/hello.hbs", { username: req.session.user });
}

function postSignup(req, res) {
  logger.log("info", "/signup - POST");
  res.render("./layouts/login.hbs", { message: "success in registering" });
}

function getLogout(req, res) {
  const oldUser = req.session.user;
  req.logout();
  logger.log("info", "/logout - GET");
  req.session.destroy((err) => {
    if (err) {
      res.send("no pudo deslogear");
    } else {
      res.render("./layouts/bye.hbs", { username: oldUser });
    }
  });
}

function getFaillogin(req, res) {
  logger.log("info", "/Faillogin - GET");
  res.render("./layouts/login-error");
}

function failRoute(req, res) {
  logger.log("info", "/failRoute - GET");
  logger.log("warning", "/failRoute - GET");
  res.status(404).render("routing-error", {});
}

module.exports = {
  getRoot,
  getLogin,
  getSignup,
  postLogin,
  getFaillogin,
  postSignup,
  getLogout,
  failRoute,
};
