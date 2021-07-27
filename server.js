const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
//const pgSession = require('connect-pg-simple')(session);
const path = require('path');
const serveStatic = require('serve-static');

const app = express();

const db = require("./models");
db.sequelize.sync();

/* db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
}); */

/* app.set('trust proxy', 1);
app.use(session({
  name: "session-id",
  secret: process.env.SESSION_SECRET || "Secret that will be used to sign cookies", //Should be replaced with a key from .env in prod.
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 3 * 24 * 60 * 60 * 1000 // Session expires after 3 days
  },
  store: new pgSession({
    conString: process.env.DATABASE_URL || "postgres://postgres:123@localhost:5432/RemindersDB"
  })
})); */

var corsOptions = {
  credentials: true,
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(serveStatic(__dirname + "/client/dist"));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})

app.use(cookieParser());

app.get('/api/reminders', (req, res, next) => {
  res.cookie('token', req.sessionID, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 ), // 30 days till expiry, could be updated after every visit (not important for the purpose of this project)
    httpOnly: false,
  });
  next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./api-routes/reminder-routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});