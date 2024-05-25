var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var compression = require("compression");
var helmet = require("helmet");
var index = require("./routes/index");
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.locals.basedir = path.join(__dirname, "views");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());
app.use(helmet());

app.use("/index", index);
app.get("/*", (req, res) => {
  res.redirect("/index");
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Start the server with "start": "nodemon ./bin/www/app.js" in package.json

module.exports = app;
