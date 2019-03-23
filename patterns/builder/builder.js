"use strict";

class ArrayDirector {
  constructor(baseBuilder, data){
    if(!(baseBuilder instanceof BaseBuilder))
      throw new Error("Invalid argument 'baseBuilder'.");

    this.builder = baseBuilder;
    this.data = data;
  }

  construct(){
    this.data.forEach(element => {
      this.builder.buildNode(element);
    });
  }
}

class BaseBuilder{
  constructor(){
    if(new.target === BaseBuilder)
      throw new Error("Can't instantiate abstract type.");
  }

  buildNode(data){ //eslint-disable-line no-unused-vars
    throw new Error("Not implemented.");
  }
}

class ListBuilder extends BaseBuilder {
  constructor(){
    super();
    this.firstListNode = new ListNode(null);
    this.currentListNode = this.firstListNode;
  }

  buildNode(data){
    const previousListNode = this.currentListNode;
    previousListNode.next = new ListNode(data);
    this.currentListNode = previousListNode.next;
    this.currentListNode.previous = previousListNode;
  }

  createList(){
    return new List();
  }

  getResult(){
    const list = this.createList();
    list.firstChild = this.firstListNode.next;

    if(list.firstChild instanceof ListNode) {
      list.firstChild.previous = null;
      list.lastChild = this.currentListNode;
    }

    return list;
  }
}

class ListNode {
  constructor(data){
    this.previous = null;
    this.data = data;
    this.next = null;
  }
}

class List {
  constructor(){
    this.firstChild = null;
    this.lastChild = null;
  }
}

module.exports = {
  BaseBuilder,
  ArrayDirector,
  ListBuilder,
  ListNode,
  List
};
