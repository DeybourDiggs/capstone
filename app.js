const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const ejs = require("ejs");
const bdp = require("body-parser");
const db = require("./cofig/db");
const userRoutes = require("./routes/userRoutes");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("./passport-config");
const users = require("./models/users");
const app = express();
PORT = process.env.PORT || 5000;

initializePassport(passport, (email) => {
  return users.find((user) => user.email === email);
});
app.use(bdp.urlencoded({ extended: false }));
app.use(bdp.json());
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

db.bootstrap();


app.use("/", userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
