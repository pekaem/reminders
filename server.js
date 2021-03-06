const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');
const serveStatic = require('serve-static');

const app = express();

const db = require("./models");
db.sequelize.sync();

/* db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
}); */

app.set('trust proxy', 1);

app.use(session({
  name: "session-id",
  secret: process.env.SESSION_SECRET || "Secret that will be used to sign cookies", //Should be replaced with a key from .env in prod.
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 3 * 24 * 60 * 60 * 1000 // Session expires after 3 days
  }
}));

app.use(cookieParser());

app.use(function (req, res, next) {
  cookie = req.cookies.token;
  if(cookie === undefined) {
    res.cookie('token', req.sessionID, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 ), // 30 days till expiry
      httpOnly: false,
    });
  } else {
    res.cookie('token', cookie, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 ), // Extend by 30 days
      httpOnly: false,
    });
  }
  next();
});

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:8080", "https://mg-reminders.herokuapp.com"]
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./api-routes/reminder-routes.js")(app);

if(process.env.NODE_ENV === "production") {
  app.use(serveStatic(__dirname + "/dist"));
  app.get('/*', function (req, res) { // Webpack workaround for Heroku to redirect to home page on refresh
    res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Probably wouldn't be an issue with split FE/BE
  });
}

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
