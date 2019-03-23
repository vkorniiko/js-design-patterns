"use strict";

class BaseEmitter {
  constructor(){
    if(new.target === BaseEmitter)
      throw new Error("Can't instantiate abstract type.");

    this.observers = [];
  }

  attach(observer){
    if(!(observer instanceof BaseObserver))
      throw new Error("Invalid argument 'observer'.");

    this.observers.push(observer);
  }

  detach(observer){
    if(!(observer instanceof BaseObserver))
      throw new Error("Invalid argument 'observer'.");

    const idx = this.observers.indexOf(observer);
    this.observers.splice(idx, 1);
  }

  notify(){
    this.observers.forEach(o => o.update());
  }
}

class BaseObserver {
  constructor(){
    if(new.target === BaseObserver)
      throw new Error("Can't instantiate abstract type.");
  }

  update(){
    throw new Error("Not implemented.");
  }
}

class TimeoutEmitter extends BaseEmitter {
  getTime(){
    return new Date();
  }

  run(){
    const timeout = 100;
    setTimeout(() => this.notify(), timeout);
  }
}

class LoggerObserver extends BaseObserver {
  constructor(timeoutEmitter){
    super();

    if(!(timeoutEmitter instanceof TimeoutEmitter))
      throw new Error("Invalid argument 'timeoutEmitter'.");

    this.lastUpdateTime = null;
    this.emitter = timeoutEmitter;
    this.emitter.attach(this);
  }

  update(){
    const emitter = this.emitter;
    this.lastUpdateTime = emitter.getTime();
  }
}

module.exports = {
  BaseEmitter,
  BaseObserver,
  TimeoutEmitter,
  LoggerObserver
};
