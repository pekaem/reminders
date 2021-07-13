module.exports = app => {
  const reminders = require("../controllers/reminder-controller.js");

  var router = require("express").Router();

  // Create a new reminder
  router.post("/", reminders.create);

  // Retrieve all snoozed reminders
  router.get("/snoozed", reminders.findAllSnoozed);

  // Retrieve all done reminders
  router.get("/done", reminders.findAllDone);

  // Retrieve all inbox reminders
  router.get("/inbox", reminders.findAllInbox);

  // Update a reminder using id
  //router.put("/:id", reminders.update);

  // Delete all reminders (!!! Important to include token !!!)
  //router.delete("/", reminders.deleteAll);

  app.use('/api/reminders', router);
};