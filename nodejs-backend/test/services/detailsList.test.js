const assert = require('assert');
const app = require('../../src/app');

describe('\'detailsList\' service', () => {
  it('registered the service', () => {
    const service = app.service('detailsList');

    assert.ok(service, 'Registered the service (detailsList)');
  });
});
