const db = require("../models");
const Reminder = db.reminders;
const Op = db.Sequelize.Op;
const dateUtil = require('../util/date-util.js');

exports.create = (req, res) => {
  if(!req.body.description){
    res.status(400).send({
      message: "Reminder description can not be empty!"
    });
    return;
  }

  const reminder = {
    date: req.body.date,
    description: req.body.description,
    done: false,
    snoozed: false,
    owner: req.cookies.token
  };

  Reminder.create(reminder)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating reminders."
      });
    });
};

exports.findAll = (req, res) => { // This function is not exposed to the frontend,
  const token = req.cookies.token; // but is still available server-side, if someone wanted all of their reminders.

  Reminder.findAll({ where: { owner: token } })
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

exports.findAllCategorized = (req, res) => { // Main method used to display data on the frontend
  const done = req.query.done;
  const snoozed = req.query.snoozed;
  const token = req.cookies.token;

  Reminder.findAll({
    where: {
      done: done,
      snoozed: snoozed,
      owner: token
    },
    order: [
      ['date', 'ASC'] // Show upcoming reminders first
    ]
  })
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

exports.update = (req, res) => { // The id is sent in the body anyways, probably it's not
  const id = req.params.id;      // necessary to have a separate property for it
  const token = req.cookies.token;

  Reminder.update(req.body, { where: { id: id, owner: token } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Reminder was updated."
        });
      } else {
        res.send({
          message: `Could not update reminder with id: ${id}. Maybe it doesn't exist.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating reminder with id=" + id
      });
    });
};

exports.updateDescription = (req, res) => {
  
};

exports.updateDate = (req, res) => {
  
};

exports.delete = (req, res) => {
  const id = req.params.id;
  const token = req.cookies.token;

  Reminder.destroy({ where: { id: id, owner: token } })
    .then(num => {
      if (num === 1){
        res.send({
          message: 'Reminder was successfully deleted!'
        });
      } else {
        res.send({
          message: `Could not delete reminder with id: ${id}. Maybe it doesn't exist.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while deleting reminder with id: ${id}`
      });
    });
};

exports.deleteAll = (req, res) => {
  
};
