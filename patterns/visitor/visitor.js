"use strict";

class BaseBall {
  constructor(){
    if(new.target === BaseBall)
      throw new Error("Can't instantiate abstract type.");

    this.height = 0;
    this.distance = 0;
  }

  accept(baseBallVisitor){ /* eslint-disable-line no-unused-vars*/
    throw new Error("Not implemented.");
  }
}

const movingStates = { lying: "lying", kickedOut: "kickedOut" },
  states = { inflated: "inflated", deflated: "deflated" };
class FootballBall extends BaseBall {
  static get movingStates(){
    return movingStates;
  }

  static get states(){
    return states;
  }

  constructor(){
    super();
    this.state = FootballBall.states.inflated;
    this.movingState = FootballBall.movingStates.lying;
  }

  accept(baseBallVisitor){
    if(!(baseBallVisitor instanceof BaseBallVisitor))
      throw new Error("Invalid argument 'baseBallVisitor'.");

    baseBallVisitor.visitFootballBall(this);
  }
}

class BaseballBall extends BaseBall {
  static get movingStates(){
    return { lying: "lying", throwed: "throwed" };
  }

  constructor(){
    super();
    this.movingState = FootballBall.movingStates.lying;
  }

  accept(baseBallVisitor){
    if(!(baseBallVisitor instanceof BaseBallVisitor))
      throw new Error("Invalid argument 'baseBallVisitor'.");

    baseBallVisitor.visitBaseballBall(this);
  }
}

/* eslint-disable no-unused-vars*/
class BaseBallVisitor {
  constructor(){
    if(new.target === BaseBallVisitor)
      throw new Error("Can't instantiate abstract type.");
  }

  visitFootballBall(baseBall){
    throw new Error("Not implemented.");
  }

  visitBaseballBall(baseBall){
    throw new Error("Not implemented.");
  }
}
/* eslint-enable no-unused-vars*/

class KickBallVisitor extends BaseBallVisitor {
  visitFootballBall(baseBall){
    if(!(baseBall instanceof BaseBall))
      throw new Error("Invalid argument 'baseBall'.");

    baseBall.movingState = FootballBall.movingStates.kickedOut;
    baseBall.height = 20;
    baseBall.distance = 30;
  }

  visitBaseballBall(baseBall){} /* eslint-disable-line no-unused-vars*/
}

class ThrowBallVisitor extends BaseBallVisitor {
  visitFootballBall(baseBall){ } /* eslint-disable-line no-unused-vars*/

  visitBaseballBall(baseBall){
    if(!(baseBall instanceof BaseBall))
      throw new Error("Invalid argument 'baseBall'.");

    baseBall.movingState = BaseballBall.movingStates.throwed;
    baseBall.height = 30;
    baseBall.distance = 40;
  }
}

class GetStatisticVisitor extends BaseBallVisitor {
  constructor(){
    super();
    this.totalDistance = 0;
    this.totalHeight = 0;
  }

  getStatistics(baseBall){
    this.totalDistance += baseBall.distance;
    this.totalHeight += baseBall.height;
  }

  visitFootballBall(baseBall){
    if(!(baseBall instanceof BaseBall))
      throw new Error("Invalid argument 'baseBall'.");

    this.getStatistics(baseBall);
  }

  visitBaseballBall(baseBall){
    if(!(baseBall instanceof BaseBall))
      throw new Error("Invalid argument 'baseBall'.");

    this.getStatistics(baseBall);
  }
}

class ReturnBallVisitor extends BaseBallVisitor {
  returnBall(baseBall){
    baseBall.height = 0;
    baseBall.distance = 0;
  }

  visitFootballBall(baseBall){
    if(!(baseBall instanceof BaseBall))
      throw new Error("Invalid argument 'baseBall'.");

    baseBall.movingState = FootballBall.movingStates.lying;
    this.returnBall(baseBall);
  }

  visitBaseballBall(baseBall){
    if(!(baseBall instanceof BaseBall))
      throw new Error("Invalid argument 'baseBall'.");

    baseBall.movingState = BaseballBall.movingStates.lying;
    this.returnBall(baseBall);
  }
}

class BallsCollectionData {
  constructor(){
    this.footballBalls = [];
    this.baseballBalls = [];

    const ballsCount = 10;

    for(let i = 0; i < ballsCount; ++i)
      this.footballBalls.push(new FootballBall());

    for(let i = 0; i < ballsCount; ++i)
      this.baseballBalls.push(new BaseballBall());
  }
}

class BallsManagerClient {
  constructor(){
    this.data = new BallsCollectionData();
  }

  performDynamicActionOnAllBalls(visitor){
    this.data.footballBalls.forEach(ball =>
      visitor.visitFootballBall(ball));

    this.data.baseballBalls.forEach(ball =>
      visitor.visitBaseballBall(ball));
  }
}

module.exports = {
  BaseBall,
  BaseballBall,
  BaseBallVisitor,
  FootballBall,
  KickBallVisitor,
  ThrowBallVisitor,
  GetStatisticVisitor,
  ReturnBallVisitor,
  BallsCollectionData,
  BallsManagerClient
};
