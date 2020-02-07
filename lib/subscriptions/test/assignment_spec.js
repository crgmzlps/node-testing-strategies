var assert = require("assert");
var _ = require("underscore")._;
var Assignment = require("../lib/models/assignment");
var Mission = require("../lib/models/mission");
var Helpers = require("./helpers");
var goodSpecs = { age: 40, height: 60, weight: 190 };

describe("Assignments", function() {
  describe("Commander with valid app", function() {
    var assignment;
    before(function() {
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({ id: 1000 }),
        role: "commander"
      });
    });
    it("compatible", function() {
      assert(assignment.passengerIsCompatible());
    });
  });
  describe("Commander overweight", function() {
    var assignment;
    before(function() {
      assignment = new Assignment({
        passenger: { weight: 300 },
        mission: new Mission({ id: 1000 }),
        role: "commander"
      });
    });
    it("no compatibility", function() {
      assert(!assignment.passengerIsCompatible());
    });
  });
  describe("Commander too tall", function() {
    var assignment;
    before(function() {
      assignment = new Assignment({
        passenger: { height: 300 },
        mission: new Mission({ id: 1000 }),
        role: "commander"
      });
    });
    it("no compatibility", function() {
      assert(!assignment.passengerIsCompatible());
    });
  });
  describe("Passenger availability - empty mission", function() {
    var assignment;
    before(function() {
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({ id: 1000 }),
        role: "space-tourist"
      });
    });
    it("available with no passengers", function() {
      assert(assignment.passengerIsCompatible());
    });
  });
});
