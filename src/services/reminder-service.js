import http from "../http-common";

const API_URL = "/reminders";

class ReminderService {
  /// It should be possible to have one get function with
  /// some parameters for all reminders , idea for refactoring.
  getSnoozedReminders() {
    return http.get(API_URL + '/snoozed');
  }

  getInboxReminders() {
    return http.get(API_URL + '/inbox');
  }

  getDoneReminders() {
    return http.get(API_URL + '/done');
  }

  create(data) {
    return http.post(API_URL, data);
  }

  update(id, data) {
    return http.put(`/reminders/${id}`, data);
  }

  delete(id) {
    return http.delete(`/reminders/${id}`);
  }

  deleteAll() { // Token will be important here
    return http.delete(API_URL);
  }
}

export default new ReminderService();
