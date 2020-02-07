var assert = require("assert");
var sinon = require("sinon");
var ReviewProcess = require("../lib/processes/review");
var Billing = require("../lib/processes/billing");
var Mission = require("../lib/models/mission");
var Helpers = require("./helpers");
var DB = require("../lib/db");

describe("The review Process", function() {
  describe("Receiving a valid application", function() {
    var decision,
      review,
      app = Helpers.validApplication;
    app.role = "commander";

    before(function(done) {
      var db = Helpers.stubDb();
      sinon.stub(db, "saveAssignment").yields(null, { saved: true });
      var billing = new Billing({ stripeKey: "xxx" });
      sinon.stub(billing, "createSubscription").yields(null, Helpers.goodStripeResponse());
      review = new ReviewProcess({
        application: app,
        db: db,
        billing: billing
      });
      sinon.spy(review, "ensureAppValid");
      sinon.spy(review, "findNextMission");
      sinon.spy(review, "roleIsAvailable");
      sinon.spy(review, "ensureRoleCompatible");
      review.processApplication(function(err, result) {
        decision = result;
        done();
      });
    });

    it("returns success", function() {
      assert(decision.success, decision.message);
    });
    it("returns an assignment", function() {
      assert(decision.assignment);
    });
    it("returns a subscription", function() {
      assert(decision.subscription);
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
