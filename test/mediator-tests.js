const { HelloMediator, ButtonColleague, HelloButtonColleague, SaveButtonColleague, TextFieldColleague } = require('../patterns/mediator/mediator');

QUnit.test("HelloMediator()", function (assert) {
	const result = new HelloMediator();
	
	assert.ok(result.helloButton instanceof HelloButtonColleague);
	assert.ok(result.saveButton instanceof SaveButtonColleague);
	assert.ok(result.textField instanceof TextFieldColleague);
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

QUnit.test("ButtonColleague(baseMediator)", function (assert) {
	const helloMediator = new HelloMediator();

	const result = new ButtonColleague(helloMediator);

	assert.strictEqual(result.mediator, helloMediator);
	assert.strictEqual(result.enabled, true);
});

QUnit.test("HelloButtonColleague.prototype.clickHandler()", function (assert) {
	const helloMediator = new HelloMediator();
	const colleague = new HelloButtonColleague(helloMediator);

	colleague.clickHandler();

	assert.strictEqual(helloMediator.textField.text, "Hello!");
	assert.strictEqual(helloMediator.saveButton.enabled, true);
});

QUnit.test("TextFieldColleague()", function (assert) {
	const helloMediator = new HelloMediator();
	const colleague = new TextFieldColleague(helloMediator);
	helloMediator.textField = colleague;

	assert.strictEqual(colleague.text, "");
	assert.strictEqual(colleague.mediator, helloMediator);
});

QUnit.test("TextFieldColleague.prototype.changedHandler()", function (assert) {
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

QUnit.test("TextFieldColleague.prototype.setText(text)", function (assert) {
	const helloMediator = new HelloMediator();
	const colleague = new TextFieldColleague(helloMediator);
	helloMediator.textField = colleague;
	const actualText = "test";

	colleague.setText(actualText);
	assert.strictEqual(helloMediator.saveButton.enabled, true);
	assert.strictEqual(colleague.text, actualText);
});