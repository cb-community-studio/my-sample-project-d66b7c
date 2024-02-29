const { ScdCT } = require('./scdCT.class');
const createModel = require('../../models/scdCT.model');
const hooks = require('./scdCT.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/scdCT', new ScdCT(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('scdCT');

  service.hooks(hooks);
};