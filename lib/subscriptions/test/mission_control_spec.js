var assert = require("assert");
var moment = require("moment");
var sinon = require("sinon");
var MissionControl = require("../lib/models/mission_control");
var db = require("../lib/db");

sinon.stub(db, "find").yields(null, { id: 1 }); //mock
var missionControl = new MissionControl({ db: db });

describe("Mission Control", function() {
  describe("The current mission", function() {
    var currentMission;
    before(function(done) {
      missionControl.currentMission(function(err, res) {
        currentMission = res;
        done();
      });
    });
    it("is created if none exists", function() {
      assert(currentMission);
    });
  });
});
