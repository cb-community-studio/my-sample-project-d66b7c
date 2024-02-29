const { DetailsList } = require('./detailsList.class');
const createModel = require('../../models/detailsList.model');
const hooks = require('./detailsList.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/detailsList', new DetailsList(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('detailsList');

  service.hooks(hooks);
};