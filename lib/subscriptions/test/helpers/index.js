var MembershipApplication = require("../../lib/models/membership_application");
var Mission = require("../../lib/models/mission");
var DB = require("../../lib/db");
var sinon = require("sinon");

exports.validApplication = new MembershipApplication({
  first: "Test",
  last: "User",
  email: "test@test.com",
  age: 30,
  height: 66,
  weight: 180
});

exports.stubDb = function(args) {
  args || (args = {});
  var mission = args.mission || new Mission();
  var db = new DB();
  sinon.stub(db, "getMissionByLaunchDate").yields(null, null);
  sinon.stub(db, "createNextMission").yields(null, mission);
  return db;
};

exports.goodStripeResponse = function(args) {
  var plan = args.plan || "commander";
  return {
    object: plan,
    created: 1234567890,
    id: "cus_5pmBAvK75LCn23",
    livemode: false,
    description: "test user",
    email: "test@test.com",
    delinquent: false,
    metadata: {},
    subscriptions: {
      object: "list",
      total_count: 1,
      has_more: false,
      url: "/v1/customers/cus_5pmBAvK75LCn23/subscriptions",
      data: []
    },
    discount: null,
    account_balance: 0,
    currency: "usd",
    sources: {
      object: "list",
      total_count: 1,
      has_more: false,
      url: "/v1/customers/cus_5pmBAvK75LCn23/sources",
      data: []
    },
    default_source: "card_5pmBMDXibfUer6"
  };
};
