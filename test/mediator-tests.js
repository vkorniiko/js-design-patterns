const { HelloMediator, ButtonCollegue, HelloButtonCollegue, SaveButtonCollegue, TextFieldCollegue } = require('../patterns/mediator/mediator');

QUnit.test("HelloMediator()", function (assert) {
	const result = new HelloMediator();
	
	assert.ok(result.helloButton instanceof HelloButtonCollegue);
	assert.ok(result.saveButton instanceof SaveButtonCollegue);
	assert.ok(result.textField instanceof TextFieldCollegue);
});

QUnit.test("HelloMediator.prototype.setText(text)", function (assert) {
	const helloMediator = new HelloMediator();
	const actualText = "test";

	helloMediator.setText(actualText);

	assert.strictEqual(actualText, helloMediator.textField.text);
});

QUnit.test("HelloMediator.prototype.refreshSaveButton()", function (assert) {
	const helloMediator = new HelloMediator();
	const actualText = "test";

	helloMediator.refreshSaveButton();

	assert.strictEqual(helloMediator.saveButton.enabled, false);

	helloMediator.setText(actualText);

	assert.strictEqual(helloMediator.saveButton.enabled, true);
});

QUnit.test("HelloMediator.prototype.notify(event, target)", function (assert) {
	const helloMediator = new HelloMediator();
	const actualText = "test";

	helloMediator.notify("helloButtonClicked");

	assert.strictEqual(helloMediator.textField.text, "Hello!");
	assert.strictEqual(helloMediator.saveButton.enabled, true);

	helloMediator.notify("textFieldChanged");
	helloMediator.setText("");
	assert.strictEqual(helloMediator.saveButton.enabled, false);
});

QUnit.test("ButtonCollegue(baseMediator)", function (assert) {
	const helloMediator = new HelloMediator();

	const result = new ButtonCollegue(helloMediator);

	assert.strictEqual(result.mediator, helloMediator);
	assert.strictEqual(result.enabled, true);
});

QUnit.test("HelloButtonCollegue.prototype.clickHandler()", function (assert) {
	const helloMediator = new HelloMediator();
	const collegue = new HelloButtonCollegue(helloMediator);

	collegue.clickHandler();

	assert.strictEqual(helloMediator.textField.text, "Hello!");
	assert.strictEqual(helloMediator.saveButton.enabled, true);
});

QUnit.test("TextFieldCollegue()", function (assert) {
	const helloMediator = new HelloMediator();
	const collegue = new TextFieldCollegue(helloMediator);
	helloMediator.textField = collegue;

	assert.strictEqual(collegue.text, "");
	assert.strictEqual(collegue.mediator, helloMediator);
});

QUnit.test("TextFieldCollegue.prototype.changedHandler()", function (assert) {
	const helloMediator = new HelloMediator();
	const collegue = new TextFieldCollegue(helloMediator);
	helloMediator.textField = collegue;

	collegue.text = "";
	collegue.changedHandler();
	assert.strictEqual(helloMediator.saveButton.enabled, false);

	collegue.text = "test";
	collegue.changedHandler();
	assert.strictEqual(helloMediator.saveButton.enabled, true);
});

QUnit.test("TextFieldCollegue.prototype.setText(text)", function (assert) {
	const helloMediator = new HelloMediator();
	const collegue = new TextFieldCollegue(helloMediator);
	helloMediator.textField = collegue;
	const actualText = "test";

	collegue.setText(actualText);
	assert.strictEqual(helloMediator.saveButton.enabled, true);
	assert.strictEqual(collegue.text, actualText);
});