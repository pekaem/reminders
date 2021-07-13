const db = require("../models");
const Reminder = db.reminders;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  
};

exports.findAll = (req, res) => {
  //var condition = "" TODO: Add user token check, to extract data only for a certain user
  const done = req.query.done;
  const snoozed = req.query.snoozed;

  Reminder.findAll({ where: {done: done, snoozed: snoozed} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reminders."
      });
    });
};

exports.findAllSnoozed = (req, res) => {
  //var condition = "" TODO: Add user token check, to extract data only for a certain user
  Reminder.findAll({ where: {snoozed: true} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reminders."
      });
    });
};

exports.findAllInbox = (req, res) => {
  //var condition = "" TODO: Add user token check, to extract data only for a certain user
  Reminder.findAll({ where: {done: false, snoozed: false} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reminders."
      });
    });
};

exports.findAllDone = (req, res) => {
  //var condition = "" TODO: Add user token check, to extract data only for a certain user
  Reminder.findAll({ where: {done: true} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reminders."
      });
    });
};

exports.updateDescription = (req, res) => {
  
};

exports.updateDate = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};
