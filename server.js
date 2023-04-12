const { createTransport } = require("nodemailer");
const LocalStrategy = require("passport-local").Strategy;
const compression = require("compression");
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { connect } = require("mongoose");
const bcrypt = require("bcrypt");
const routes = require("./routes");
const yargs = require("yargs/yargs")(process.argv.slice(2));
const args = yargs.default({ port: 8080 }).argv;
const app = express();

const routerProductos = require("./rutas/productos.js");
const routerCarrito = require("./rutas/carrito.js");

require("dotenv").config();

app.use(compression());

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

const connectMG = async () => {
  try {
    await connect(`${process.env.CONECCIONDB}`);
  } catch (error) {
    console.error(error);
    throw "can not connect to the bd";
  }
};

connectMG();

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
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
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (err, user) {
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
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log(user);
          console.log("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://gamal:k7mkUTu7XBAOeWfp@cluster0.6j5lnox.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || args.port;
const httpServer = require("http").createServer(app);

httpServer.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);

//HBS
app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

//CLASS
const Usuarios = require("./models/usuarios.js");

const auth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.render("./layouts/login.hbs");
  }
};

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

const TEST_MAIL = "dora.reynolds7@ethereal.email";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: "6e6dXqPUPqm24wZXT3",
  },
});

const mailOptions = {
  from: "Servidor Node.js",
  to: TEST_MAIL,
  subject: "Nuevo usuario",
  html: "user.html",
  attachments: [],
};

app.get("/", auth, async (req, res) => {
  console.log(req.session);
  res.render("index.hbs", { username: req.session.user });
});

app.get("/login", routes.getLogin);

app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "faillogin" }),
  routes.postLogin
);

app.get("/signup", routes.getSignup);

app.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "signup" }),
  async (req, res) => {
    await transporter.sendMail(mailOptions);
    res.render("./layouts/login.hbs", { message: "success in registering" });
  }
);

app.get("/faillogin", routes.getFaillogin);

app.get("/logout", routes.getLogout);
