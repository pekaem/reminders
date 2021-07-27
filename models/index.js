const dbConfig = require("../db.config");

const Sequelize = require("sequelize");

let sequelize = null;
if(process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {dialect: "postgres", dialectOptions: { ssl: { rejectUnauthorized: false }}});
} else {
  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    ssl: {
      rejectUnauthorized: false
    },
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }); 
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.reminders = require("./reminder-model.js")(sequelize, Sequelize);
db.users = require("./user-model.js")(sequelize, Sequelize);

module.exports = db;