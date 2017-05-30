
const expect = require('chai').expect;
const BASE_URL = 'http://localhost:8100/';

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

describe('Register Workflow', function () {
  //======================================
  describe('/register (Register Page)', function () {


    it('should load without error', function (client) {
      client
        .url(BASE_URL + '#/register')
        .execute("return window.store;", [], function (response) {
          var store = response.value;
          client.assert.equal(store.app.page, 'Register')
        })
        .expect.element('body').to.be.present.before(1000)
    });
  });
  //======================================
  describe('clicking on signup button', function () {

    it('should take you to register page', function (client) {
      client
        .url(BASE_URL)
        .waitForElementVisible('body')
        .useCss()
        .click('.register-button')
        .waitForElementVisible('.register-page')
        .execute("return window.store;", [], function (response) {
          var store = response.value;
          client.assert.equal(store.app.page, 'Register')
        })
    });
  });
  //======================================

  //======================================
  describe('signing up with valid inputs', function () {
    var randomNumber = Math.floor(Math.random() * 10000) + 1 + '';
    it('should take you to register-confirm page', function (client) {
      client
        .url(BASE_URL + '#/register')
        .waitForElementVisible('.register-page')
        .execute("return window.store;", [], function (response) {
          var store = response.value;
          client.assert.equal(store.app.page, 'Register')
        })
        .useCss()
        .setValue('.first-name-input .text-input', 'dceTestUser')
        .setValue('.last-name-input .text-input', ('Random') + randomNumber)
        .setValue('.postal-code-church-input .text-input', '78216')
        .setValue('.email-input .text-input', 'dceTestUser' + randomNumber + '@mailinator.com')
        .setValue('.pass-input .text-input', 'testPass1a$')
        .setValue('.confirm-pass-input .text-input', 'testPass1a$')
        .click('.register-submit')
        .waitForElementVisible('.confirm-register-page')
        .execute("return window.store;", [], function (response) {
          var store = response.value;
          client.assert.equal(store.app.page, 'Confirm-Register')
        })
        .assert.visible(".confirm-register-page")
    });
  });
  //======================================

});
