const assert = require('assert');
const app = require('../../src/app');

describe('\'cusDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('cusDetails');

    assert.ok(service, 'Registered the service (cusDetails)');
  });
});
