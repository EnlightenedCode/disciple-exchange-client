const expect = require('chai').expect;
const BASE_URL = 'http://localhost:8100/';

describe('Load a Page', function () {

  describe('/ (About Page)', function () {

    before(function (client, done) {
      done();
    });

    after(function (client, done) {
      client.end(function () {
        done();
      });
    });

    afterEach(function (client, done) {
      done();
    });

    beforeEach(function (client, done) {
      done();
    });

    it('should load without error', function (client) {
      client
        .url(BASE_URL + '#/about')
        .expect.element('body').to.be.present.before(1000);
    });
  });

});
