var _ = require("underscore");
var assert = require("assert");

var Assignment = function(args) {
  var assignment = {};
  // an assignment has a passenger, role and mission
  assert(args.passenger && args.role && args.mission, "Need role, passenger and mission");
  var self = this;
  // drop the props
  _.extend(assignment, args);

  assignment.passengerIsCompatible = function() {
    // each role has a specific height, age and weight requirement
    var valid = false;
    if (this.role === "commander") {
      // age between 35 and 75, weight under 250, height under 7 feet
      valid =
        this.passenger.age > 35 &&
        this.passenger.age < 75 &&
        this.passenger.weight < 250 &&
        this.passenger.height < 84;
    } else if (this.role === "mav-pilot") {
      valid =
        this.passenger.age > 35 &&
        this.passenger.age < 55 &&
        this.passenger.weight < 180 &&
        this.passenger.height < 72;
    } else {
      // only 8 seats, cumulative weight has to be less than 1400 pounds
      // age between 35 and 55, weight under 200, height under 6 feet
      valid =
        //  this.mission.hasRoom &&
        //  this.mission.totalWeight < 1400 &&
        this.passenger.age > 35 &&
        this.passenger.age < 55 &&
        this.passenger.weight < 200 &&
        this.passenger.height < 72;
    }
    return valid;
  };

  return assignment;
};

module.exports = Assignment;
