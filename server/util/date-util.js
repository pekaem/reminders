const moment = require('moment');

module.exports.formatDate = function(date) { // Conversion from UTC ISO format to a more readable format
  return moment(new Date(date), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").format("DD.MM.yyyy HH:mm");
};
