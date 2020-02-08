var assert = require("assert");
var sinon = require("sinon");
var ReviewProcess = require("../lib/processes/review");
var Billing = require("../lib/processes/billing");
var Mission = require("../lib/models/mission");
var Helpers = require("./helpers");
var DB = require("../lib/db");

describe("The review Process", function() {
  var db = Helpers.stubDb();
  var billing = new Billing({ stripeKey: "xxx" });
  var mock = sinon.mock(billing);
  describe("Receiving a valid application", function() {
    var decision,
      review,
      app = Helpers.validApplication;
    app.role = "commander";

    before(function(done) {
      sinon.stub(db, "saveAssignment").yields(null, { saved: true });

      mock.expects("createSubscription").yields(null, Helpers.goodStripeResponse);
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
  describe("Valid application, failed billing", function() {
    var decision,
      review,
      badBillingApp = Helpers.validApplication;
    badBillingApp.card = 2;
    before(function(done) {
      mock.expects("createSubscription").yields("Card was declined", null);
      review = new ReviewProcess({
        application: badBillingApp,
        db: db,
        billing: billing
      });
      review.processApplication(function(err, result) {
        decision = result;
        done();
      });
    });
    it("returns false for success", function() {
      assert(!decision.success);
    });
  });
});
