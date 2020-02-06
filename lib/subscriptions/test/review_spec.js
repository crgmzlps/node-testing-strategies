var assert = require("assert");
var sinon = require("sinon");
var ReviewProcess = require("../lib/processes/review");
var Helpers = require("./helpers");

describe("The review Process", function() {
  describe("Receiving a valid application", function() {
    var decision;
    var app = Helpers.validApplication;
    var review = new ReviewProcess({ application: app });
    sinon.spy(review, "ensureAppValid");
    sinon.spy(review, "findNextMission");
    sinon.spy(review, "roleIsAvailable");
    sinon.spy(review, "ensureRoleCompatible");
    before(function(done) {
      review.processApplication(function(err, result) {
        decision = result;
        done();
      });
    });
    it("returns success", function() {
      assert(decision.success, decision.message);
    });
    it("ensure the application is valid", function() {
      assert(review.ensureAppValid.called);
    });
    it("selects a mission", function() {
      assert(review.findNextMission.called);
    });
    it("ensures a role exists", function() {
      assert(review.roleIsAvailable.called);
    });
    it("ensures role compatibility", function() {
      assert(review.ensureRoleCompatible.called);
    });
  });
});
