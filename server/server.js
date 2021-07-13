const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const app = express();

const db = require("./models");
db.sequelize.sync();

app.set('trust proxy', 1);
app.use(session({
  name: "session-id",
  secret: process.env.SESSION_SECRET || "Secret that will be used to sign cookies", //Should be replaced with a key from .env in prod.
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 3 * 24 * 60 * 60 * 1000 // Session expires after 3 days
  },
  store: new pgSession({
    conString: "postgres://postgres:123@localhost:5432/RemindersDB"
  })
}));

app.get('/', (req, res, next) => {
  res.cookie('token', req.sessionID, {expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 ), httpOnly: true} ); // 30 days till expiry, could be updated after every visit (not important for the purpose of this project)
  res.send();
});

/*db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./api-routes/reminder-routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});