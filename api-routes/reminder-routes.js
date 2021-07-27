module.exports = app => {
  const path = require('path');
  const reminders = require(path.join(__dirname, "../controllers/reminder-controller.js"));

  var router = require("express").Router();

  // Create a new reminder
  router.post("/", reminders.create);

  // Retrieve all reminders
  router.get("/all", reminders.findAll);

  // Retrieve all categorized reminders
  router.get("/", reminders.findAllCategorized);

  // Update reminder
  router.put("/:id", reminders.update);

  // Delete a reminder using id + user token (!!! Important to include token !!!)
  router.delete("/:id", reminders.delete);

  // Delete all reminders (!!! Important to include token !!!)
  //router.delete("/", reminders.deleteAll);

  app.use('/api/reminders', router);
};