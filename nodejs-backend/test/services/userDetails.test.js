const assert = require('assert');
const app = require('../../src/app');

describe('\'userDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('userDetails');

    assert.ok(service, 'Registered the service (userDetails)');
  });
});
