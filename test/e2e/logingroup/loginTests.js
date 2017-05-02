
const expect = require('chai').expect;
const BASE_URL = 'http://localhost:8100/';

describe('Login Workflow', function () {
  //======================================
  describe('/ (Home Page)', function () {

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
        .url(BASE_URL)
        .execute("return window.store;", [], function (response) {
          var store = response.value;
          client.assert.equal(store.app.page, 'Home')
        })
        .expect.element('body').to.be.present.before(1000)
    });
  });
  //======================================
  describe('given bad Login', function () {

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

    it('should fail', function (client) {
      client
        .url(BASE_URL)
        .waitForElementVisible('body')
        .useCss()
        .setValue('.login-email-input .text-input', 'notgonnawork')
        .setValue('.login-pass-input .text-input', 'invalid password')
        .click('.login-submit')
        .waitForElementVisible('.error-modal')
        .execute("return window.store;", [], function (response) {
          var store = response.value;
          client.assert.equal(store.app.errorModal, true)
        })
        .assert.visible(".error-modal")
    });
  });
  //======================================
  describe('given good Login', function () {

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

    it('should go to About Page', function (client) {
      client
        .url(BASE_URL)
        .waitForElementVisible('body')
        .useCss()
        .setValue('.login-email-input .text-input', 'andrew@igocki.com')
        .setValue('.login-pass-input .text-input', 'testPass1a$')
        .click('.login-submit')
        .waitForElementVisible('.about-page')
        .execute("return window.store;", [], function (response) {
          var store = response.value;
          client.assert.equal(store.app.page, 'About')
        })
        .assert.visible(".about-page")
    });
  });

  //======================================
});
