const db = require("../models");
const Shopping = db.shopping;

exports.create = (req, res) => {
  if(!req.body.description){
    res.status(400).send({
      message: "Shopping list can not be empty!"
    });
    return;
  }

  const shoppingList = {
    date: req.body.date,
    description: req.body.description,
    done: false,
    snoozed: false,
    owner: req.cookies.token
  };

  Shopping.create(shoppingList)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Shopping list."
      });
    });
};

exports.findAll = (req, res) => { // This function is not exposed to the frontend,
  const token = req.cookies.token; // but is still available server-side, if someone wanted all of their shopping lists.

  Shopping.findAll({ where: { owner: token } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Shopping lists."
      });
    });
};

exports.findAllCategorized = (req, res) => { // Main method used to display data on the frontend
  const done = req.query.done;
  const snoozed = req.query.snoozed;
  const token = req.cookies.token;

  Shopping.findAll({
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
          err.message || "Some error occurred while retrieving Shopping lists."
      });
    });
};

exports.update = (req, res) => { // The id is sent in the body anyways, probably it's not
  const id = req.params.id;      // necessary to have a separate property for it
  const token = req.cookies.token;

  Shopping.update(req.body, { where: { id: id, owner: token } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Shopping list was updated."
        });
      } else {
        res.send({
          message: `Could not update Shopping list with id: ${id}. Maybe it doesn't exist.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Shopping list with id=" + id
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

  Shopping.destroy({ where: { id: id, owner: token } })
    .then(num => {
      if (num === 1){
        res.send({
          message: 'Shopping list was successfully deleted!'
        });
      } else {
        res.send({
          message: `Could not delete Shopping list with id: ${id}. Maybe it doesn't exist.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while deleting Shopping list with id: ${id}`
      });
    });
};

exports.deleteAll = (req, res) => {
  
};
