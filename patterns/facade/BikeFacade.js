"use strict";

const BellModel = require("./BellModel");
const BrakeModel = require("./BrakeModel");
const SaddleModel = require("./SaddleModel");
const RudderModel = require("./RudderModel");
const PedalModel = require("./PedalModel");
const ChainModel = require("./ChainModel");
const WheelModel = require("./WheelModel");

class BikeFacade {
  constructor() {
    const chain = this.chain = new ChainModel();
    chain.wheels = this.wheels = [];
    chain.pedals = this.pedals = [];
    this.wheels.push(new WheelModel());
    this.wheels.push(new WheelModel());
    this.pedals.push(new PedalModel(chain));
    this.pedals.push(new PedalModel(chain));
    this.brakes = [];
    this.brakes.push(new BrakeModel());
    this.brakes.push(new BrakeModel());
    this.rudder = new RudderModel();
    this.saddle = new SaddleModel();
    this.bell = new BellModel();
  }

  go(direction, twirls) {
    this.brakes.forEach(brake => {
      brake.disable();
    });

    this.rudder.setDirection(direction);
    this.bell.ring();
    this.pedals[0].twirl(twirls);
    this.pedals[1].twirls = twirls;
  }
}

module.exports = BikeFacade;
