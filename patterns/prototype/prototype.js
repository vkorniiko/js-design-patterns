"use strict";

class BasePrototype {
  constructor(){
    if(new.target === BasePrototype)
      throw new Error("Can't instantiate abstract type.");
  }

  clone(){
    throw new Error("Not implemented.");
  }
}

const characterTypes = { number: "number", letter: "letter", symbol: "symbol" };
class Character extends BasePrototype {
  static get characterTypes(){
    return characterTypes;
  }

  constructor(){
    super();

    this.type = null;
    this.character = null;
    this.row = 0;
    this.col = 0;
  }

  clone(){
    const clone = new Character();
    clone.row = this.row;
    clone.col = this.col;
    clone.character = this.character;
    clone.type = this.type;

    return clone;
  }
}

class Client {
  writeWord(context, word, row, col){
    const character = new Character();
    character.row = row;
    character.col = col;
    character.type = Character.characterTypes.letter;

    Array.prototype.forEach.call(word, (char, i) => {
      const characterPrototype = character.clone();
      characterPrototype.col += i;
      characterPrototype.character = char;
      context.write(characterPrototype);
    });
  }
}

module.exports = {
  BasePrototype,
  Character,
  Client
};
