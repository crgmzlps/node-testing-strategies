var assert = require("assert");

var MembershipApplication = require("../lib/membership_application");

describe("Membership application requirements", function() {
  var validApp = {};

  before(function() {
    validApp = new MembershipApplication({
      first: "Test",
      last: "User",
      email: "test@test.com",
      age: 30,
      height: 66,
      weight: 180
    });
  });

  describe("application valid if...", function() {
    it("all validators successful", function() {
      assert(validApp.isValid(), "Application not valid");
    });
  });
  describe("application invalid if...", function() {
    it("is past the validUntil date", function() {
      var app = new MembershipApplication({ validUntil: Date.parse("01/01/2019") });
      assert(app.expired());
    });
    it("email is 4 characters or less", function() {
      var app = new MembershipApplication({ email: "aa" });
      assert(!app.emailIsValid());
    });
    it("email does not contain @", function() {
      var app = new MembershipApplication({ email: "cccc.com" });
      assert(!app.emailIsValid());
    });
    it("email is omitted", function() {
      var app = new MembershipApplication({});
      assert(!app.emailIsValid());
    });
    it("height is less than 60 inches", function() {
      var app = new MembershipApplication({ height: 10 });
      assert(!app.heightIsValid());
    });
    it("height is more than 75 inches", function() {
      var app = new MembershipApplication({ height: 80 });
      assert(!app.heightIsValid());
    });
    it("height is omitted", function() {
      var app = new MembershipApplication({});
      assert(!app.heightIsValid());
    });
    it("age is more than 100", function() {
      var app = new MembershipApplication({ age: 101 });
      assert(!app.ageIsValid());
    });
    it("age is less than 15", function() {
      var app = new MembershipApplication({ age: 14 });
      assert(!app.ageIsValid());
    });
    it("age is omitted", function() {
      var app = new MembershipApplication({});
      assert(!app.ageIsValid());
    });
    it("weight is less than 100", function() {
      var app = new MembershipApplication({ weight: 99 });
      assert(!app.weightIsValid());
    });
    it("weight is more than 300", function() {
      var app = new MembershipApplication({ weight: 301 });
      assert(!app.weightIsValid());
    });
    it("weight is omitted", function() {
      var app = new MembershipApplication({});
      assert(!app.weightIsValid());
    });
    it("first is omitted", function() {
      var app = new MembershipApplication({});
      assert(!app.nameIsValid());
    });
    it("last is omitted", function() {
      var app = new MembershipApplication({});
      assert(!app.nameIsValid());
    });
  });
});
