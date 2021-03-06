"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const Client = requireHelper("../patterns/prototype/Client"),
      Character = requireHelper("../patterns/prototype/Character"),
      BasePrototype = requireHelper("../patterns/prototype/BasePrototype");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BasePrototype, assert);
  testHelper.checkAbstractMethods(BasePrototype,
    ["clone"], assert);
});

QUnit.test("Character()", (assert) => {
  const result = new Character();

  assert.strictEqual(result.character, null);
  assert.strictEqual(result.type, null);
  assert.strictEqual(result.row, 0);
  assert.strictEqual(result.col, 0);
});

QUnit.test("Character.prototype.clone()", (assert) => {
  const character = new Character();
  character.row = 0;
  character.col = 0;
  character.type = Character.characterTypes.letter;
  character.character = "a";

  const result = character.clone();

  assert.strictEqual(result.character, "a");
  assert.strictEqual(result.row, 0);
  assert.strictEqual(result.col, 0);
  assert.strictEqual(result.type, Character.characterTypes.letter);
});

QUnit.test("Client.prototype.writeWord(context)", (assert) => {
  const client = new Client();
  const word = "abc";
  const chars = [];
  const context = {
    write(character){
      chars.push(character);
    }
  };

  client.writeWord(context, word, 5, 5);

  assert.strictEqual(chars[0].character, "a");
  assert.strictEqual(chars[0].row, 5);
  assert.strictEqual(chars[0].col, 5);
  assert.strictEqual(chars[0].type, Character.characterTypes.letter);

  assert.strictEqual(chars[1].character, "b");
  assert.strictEqual(chars[1].row, 5);
  assert.strictEqual(chars[1].col, 6);
  assert.strictEqual(chars[1].type, Character.characterTypes.letter);

  assert.strictEqual(chars[2].character, "c");
  assert.strictEqual(chars[2].row, 5);
  assert.strictEqual(chars[2].col, 7);
  assert.strictEqual(chars[2].type, Character.characterTypes.letter);
});
