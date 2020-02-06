var assert = require("assert");
var moment = require("moment");
var sinon = require("sinon");
var MissionControl = require("../lib/models/mission_control");
var Mission = require("../lib/models/mission");
var db = require("../lib/db");

sinon.stub(db, "getMissionByLaunchDate").yields(null, null); //mock
sinon.stub(db, "createNextMission").yields(null, new Mission()); //mock

var missionControl = new MissionControl({ db: db });

describe("Mission Planning", function() {
  describe("No current mission", function() {
    var currentMission;
    before(function(done) {
      missionControl.currentMission(function(err, res) {
        currentMission = res;
        done();
      });
    });

    it("it is created if none exists", function() {
      assert(currentMission);
      assert(db.getMissionByLaunchDate.called);
    });
  });

  describe("Current mission exists", function() {
    var currentMission;
    before(function(done) {
      db.getMissionByLaunchDate.restore();
      sinon.stub(db, "getMissionByLaunchDate").yields(null, { id: 1000 }); //mock

      missionControl.currentMission(function(err, res) {
        currentMission = res;
        done();
      });
    });
    it("it return mission 1000", function() {
      assert.equal(currentMission.id, 1000);
      assert(db.getMissionByLaunchDate.called);
    });
  });
});
