"use strict";

class WheelModel{
  constructor(){
    this.rotations = 0;
  }

  rotate(rotations){
    return this.rotations += rotations;
  }
}

class ChainModel {
  constructor(pedals, wheels){
    this.pedals = pedals;
    this.wheels = wheels;
    this.cycles = 0;
  }

  cycle(cycles){
    const coef = 5;
    this.cycles += cycles;

    this.wheels.forEach(wheel => {
      wheel.rotate(cycles * coef);
    });

    return this.cycles;
  }
}

class PedalModel {
  constructor(chain){
    this.chain = chain;
    this.twirls = 0;
  }

  twirl(count){
    const coef = 0.5;

    this.twirls += count;
    this.chain.cycle(count * coef);

    return this.twirls;
  }
}

class RudderModel {
  constructor(){
    this.direction = null;
  }

  setDirection(direction){
    return this.direction = direction;
  }
}

class SaddleModel {

}

class BrakeModel {
  constructor(){
    this.isEnabled = true;
  }

  enable(){
    return this.isEnabled = true;
  }

  disable(){
    return this.isEnabled = false;
  }
}

class BellModel {
  constructor(){
    this.isRang = false;
  }

  ring(){
    return this.isRang = true;
  }
}

class BikeFacade{
  constructor(){
    const chain = this.chain = new ChainModel();

    chain.wheels = this.wheels = [];
    this.wheels.push(new WheelModel());
    this.wheels.push(new WheelModel());

    chain.pedals = this.pedals = [];
    this.pedals.push(new PedalModel(chain));
    this.pedals.push(new PedalModel(chain));

    this.brakes = [];
    this.brakes.push(new BrakeModel());
    this.brakes.push(new BrakeModel());

    this.rudder = new RudderModel();
    this.saddle = new SaddleModel();
    this.bell = new BellModel();
  }

  go(direction, twirls){
    this.brakes.forEach(brake => {
      brake.disable();
    });

    this.rudder.setDirection(direction);

    this.bell.ring();

    this.pedals[0].twirl(twirls);
    this.pedals[1].twirls = twirls;
  }
}

module.exports = {
  BikeFacade,
  BellModel,
  BrakeModel,
  SaddleModel,
  RudderModel,
  PedalModel,
  ChainModel,
  WheelModel
};
