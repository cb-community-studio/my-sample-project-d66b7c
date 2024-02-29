const assert = require('assert');
const app = require('../../src/app');

describe('\'scdCT\' service', () => {
  it('registered the service', () => {
    const service = app.service('scdCT');

    assert.ok(service, 'Registered the service (scdCT)');
  });
});
