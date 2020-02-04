var assert = require("assert");
var ReviewProcess = require("../lib/processes/review");
var MembershipApplication = require("../lib/membership_application");

describe("The review Process", function() {
  describe("Receiving a valid application", function() {
    var decision;
    before(function(done) {
      var app = new MembershipApplication({
        first: "Test",
        last: "User",
        email: "test@test.com",
        age: 30,
        height: 66,
        weight: 180
      });
      var review = new ReviewProcess();
      review.processApplication(app, function(err, result) {
        decision = result;
        done();
      });
    });
    it("returns success", function() {
      assert(decision.success, decision.message);
    });
  });
});
