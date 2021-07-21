import http from "../http-common";

const API_URL = "/reminders";

class ReminderService {
  getAllCategorized(done, snoozed) {
    return http.get(`${API_URL}/?done=${done}&snoozed=${snoozed}`);
  }

  create(data) {
    return http.post(API_URL, data);
  }

  update(id, data) {
    return http.put(`${API_URL}/${id}`, data);
  }

  delete(id) {
    return http.delete(`${API_URL}/${id}`);
  }

  deleteAll() { // Token will be important here
    return http.delete(API_URL);
  }
}

export default new ReminderService();
