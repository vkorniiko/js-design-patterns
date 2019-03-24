"use strict";

const Character = require("./Character");

class Client {
  writeWord(context, word, row, col) {
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

module.exports = Client;
