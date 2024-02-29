const { CusDetails } = require('./cusDetails.class');
const createModel = require('../../models/cusDetails.model');
const hooks = require('./cusDetails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/cusDetails', new CusDetails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cusDetails');

  service.hooks(hooks);
};