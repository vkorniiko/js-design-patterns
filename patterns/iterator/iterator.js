"use strict";

class BaseItemsStorage{
  constructor(){
    if(new.target === BaseItemsStorage)
      throw new Error("Can't instantiate abstract type.");
  }

  createIterator(){
    throw new Error("Not implemented.");
  }
}

class List extends BaseItemsStorage {
  constructor(){
    super();

    this.firstChild = null;
    this.lastChild = null;
  }

  createIterator(){
    return new ListIterator(this);
  }
}

class BaseIterator {
  constructor(){
    if(new.target === BaseIterator)
      throw new Error("Can't instantiate abstract type.");
  }

  reset(){
    throw new Error("Not implemented.");
  }

  moveNext(){
    throw new Error("Not implemented.");
  }

  checkCompletion(){
    throw new Error("Not implemented.");
  }

  getCurrent(){
    throw new Error("Not implemented.");
  }
}

class ListIterator extends BaseIterator {
  constructor(list){
    super();
    this.list = list;
    this.current = list.firstChild;
  }

  reset(){
    this.current = this.list.firstChild;
  }

  moveNext(){
    this.current = this.current.next;
  }

  checkCompletion(){
    return this.current === null;
  }

  getCurrent(){
    return this.current === null ? null : this.current.data;
  }
}

class ES6List extends List {
  createIterator(){
    return new ES6ListIterator(this);
  }
}
class ES6ListIterator extends ListIterator {
  [Symbol.iterator](){
    return { 
      next: () => {
        const done = this.checkCompletion(),
          result = { value: this.getCurrent(), done: done };

        if(!done)
          this.moveNext();

        return result;
      }
    };
  }
}

class Client {
  constructor(baseItemsStorage){
    if(!(baseItemsStorage instanceof BaseItemsStorage))
      throw new Error("Invalid argument 'baseItemsStorage'.");

    this.itemsStorage = baseItemsStorage;
  }

  iterate(callback){
    const iterator = this.itemsStorage.createIterator();

    while(!iterator.checkCompletion()){
      callback(iterator.getCurrent());
      iterator.moveNext();
    }
  }
}

module.exports = {
  BaseItemsStorage,
  BaseIterator,
  List,
  ListIterator,
  ES6List,
  ES6ListIterator,
  Client
};
