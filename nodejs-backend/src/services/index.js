const users = require("./users/users.service.js");
const scdCT = require("./scdCT/scdCT.service.js");
const detailsList = require("./detailsList/detailsList.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
  app.configure(scdCT);
  app.configure(detailsList);
    // ~cb-add-configure-service-name~
};
