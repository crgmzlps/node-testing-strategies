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
    it("email is 4 or more chars and contains an @", function() {
      assert(validApp.emailIsValid(), "Email is not valid");
    });
    it("height is between 60 and 75 inches", function() {
      assert(validApp.heightIsValid(), "Height is not valid");
    });
    it("age is between 15 and 100", function() {
      assert(validApp.ageIsValid(), "Age is not valid");
    });
    it("weight is between 100 and 300", function() {
      assert(validApp.weightIsValid(), "Weight is not valid");
    });
    it("first and last name are provided", function() {
      assert(validApp.nameIsValid(), "Name is not valid");
    });
  });
});
