const reminderController = require("../reminder-controller.js");
const { mockRequest, mockResponse } = require("../../util/interceptor.js");

describe('Creating a reminder', () => {
  it("Status 200 and a successful creation of a reminder", async() => {
    let date = new Date();
    let req = mockRequest();
    req.body.date = date;
    req.body.description = "Test description";
    req.cookies.token = "randomToken";
    let res = mockResponse();

    await reminderController.create(req, res);

    expect(res.status).toHaveBeenLastCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(date, "Test description", "randomToken");
  });
});