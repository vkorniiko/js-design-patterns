"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const HelloMediator = requireHelper("../patterns/mediator/HelloMediator"), 
  ButtonColleague = requireHelper("../patterns/mediator/ButtonColleague"), 
  HelloButtonColleague = requireHelper("../patterns/mediator/HelloButtonColleague"), 
  SaveButtonColleague = requireHelper("../patterns/mediator/SaveButtonColleague"), 
  BaseMediator = requireHelper("../patterns/mediator/BaseMediator"), 
  BaseColleague = requireHelper("../patterns/mediator/BaseColleague"),
  TextFieldColleague = requireHelper("../patterns/mediator/TextFieldColleague");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseMediator, assert);
  testHelper.checkAbstractMethods(BaseMediator,
    ["notify"], assert);

  testHelper.checkAbstract(BaseColleague, assert);
});

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkConstructorInvalidArguments(
    ButtonColleague, ["baseMediator"], [], assert);

  testHelper.checkConstructorInvalidArguments(
    HelloButtonColleague, ["baseMediator"], [], assert);

  testHelper.checkConstructorInvalidArguments(
    SaveButtonColleague, ["baseMediator"], [], assert);

  testHelper.checkConstructorInvalidArguments(
    TextFieldColleague, ["baseMediator"], [], assert);
});

QUnit.test("HelloMediator()", (assert) => {
  const result = new HelloMediator();
  assert.ok(result.helloButton instanceof HelloButtonColleague);
  assert.ok(result.saveButton instanceof SaveButtonColleague);
  assert.ok(result.textField instanceof TextFieldColleague);
});

QUnit.test("HelloMediator.prototype.setText(text)", (assert) => {
  const helloMediator = new HelloMediator();
  const actualText = "test";

  helloMediator.setText(actualText);

  assert.strictEqual(actualText, helloMediator.textField.text);
});

QUnit.test("HelloMediator.prototype.refreshSaveButton()", (assert) => {
  const helloMediator = new HelloMediator();
  const actualText = "test";

  helloMediator.refreshSaveButton();

  assert.strictEqual(helloMediator.saveButton.enabled, false);

  helloMediator.setText(actualText);

  assert.strictEqual(helloMediator.saveButton.enabled, true);
});

QUnit.test("HelloMediator.prototype.notify(event, target)", (assert) => {
  const helloMediator = new HelloMediator();

  helloMediator.notify("helloButtonClicked");

  assert.strictEqual(helloMediator.textField.text, "Hello!");
  assert.strictEqual(helloMediator.saveButton.enabled, true);

  helloMediator.notify("textFieldChanged");
  helloMediator.setText("");
  assert.strictEqual(helloMediator.saveButton.enabled, false);
});

QUnit.test("ButtonColleague(baseMediator)", (assert) => {
  const helloMediator = new HelloMediator();

  const result = new ButtonColleague(helloMediator);

  assert.strictEqual(result.mediator, helloMediator);
  assert.strictEqual(result.enabled, true);
});

QUnit.test("HelloButtonColleague.prototype.clickHandler()", (assert) => {
  const helloMediator = new HelloMediator();
  const colleague = new HelloButtonColleague(helloMediator);

  colleague.clickHandler();

  assert.strictEqual(helloMediator.textField.text, "Hello!");
  assert.strictEqual(helloMediator.saveButton.enabled, true);
});

QUnit.test("TextFieldColleague()", (assert) => {
  const helloMediator = new HelloMediator();
  const colleague = new TextFieldColleague(helloMediator);
  helloMediator.textField = colleague;

  assert.strictEqual(colleague.text, "");
  assert.strictEqual(colleague.mediator, helloMediator);
});

QUnit.test("TextFieldColleague.prototype.changedHandler()", (assert) => {
  const helloMediator = new HelloMediator();
  const colleague = new TextFieldColleague(helloMediator);
  helloMediator.textField = colleague;

  colleague.text = "";
  colleague.changedHandler();
  assert.strictEqual(helloMediator.saveButton.enabled, false);

  colleague.text = "test";
  colleague.changedHandler();
  assert.strictEqual(helloMediator.saveButton.enabled, true);
});

QUnit.test("TextFieldColleague.prototype.setText(text)", (assert) => {
  const helloMediator = new HelloMediator();
  const colleague = new TextFieldColleague(helloMediator);
  helloMediator.textField = colleague;
  const actualText = "test";

  colleague.setText(actualText);
  assert.strictEqual(helloMediator.saveButton.enabled, true);
  assert.strictEqual(colleague.text, actualText);
});
