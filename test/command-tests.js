const { BaseCommand, ReminderCommand, TaskExecutor, CalendarInitiator, SchedulerClient } = require('../patterns/command/command');

QUnit.test("ReminderCommand()", function (assert) {
	const executor = new TaskExecutor();
	const result = new ReminderCommand(executor);
	
	assert.strictEqual(result.permissionGranted, false);
});

QUnit.test("ReminderCommand.prototype.checkPermission()", function (assert) {
	const executor = new TaskExecutor();
	const command = new ReminderCommand(executor);
	
	const result = command.checkPermission();

	assert.strictEqual(result, false);
});

QUnit.test("TaskExecutor.prototype.runAction()", function (assert) {
	const taskExecutor = new TaskExecutor();
	
	const result = taskExecutor.runAction();

	assert.ok(result instanceof Date);
	assert.ok(taskExecutor.runTime instanceof Date);
	assert.strictEqual(taskExecutor.runTime, result);
});

QUnit.test("ReminderCommand.prototype.execute()", function (assert) {
	const taskExecutor = new TaskExecutor();	
	const reminderCommand = new ReminderCommand(taskExecutor);
	reminderCommand.permissionGranted = true;

	const result = reminderCommand.execute();

	assert.strictEqual(result, true);
	assert.ok(reminderCommand.executor.runTime instanceof Date);
});

QUnit.test("CalendarInitiator.prototype.invoke()", function (assert) {
	const taskExecutor = new TaskExecutor();	
	const reminderCommand = new ReminderCommand(taskExecutor);
	reminderCommand.permissionGranted = true;
	const initiator = new CalendarInitiator();
	initiator.command = reminderCommand;

	initiator.invoke();

	assert.ok(initiator.command.executor.runTime instanceof Date);
});

QUnit.test("SchedulerClient.prototype.createReminderCommand()", function (assert) {
	const taskExecutor = new TaskExecutor();
	const calendarInitiator = new CalendarInitiator();
	const client = new SchedulerClient();

	client.createReminderCommand(taskExecutor, calendarInitiator);

	assert.ok(client.commands[0] instanceof ReminderCommand);
	assert.strictEqual(client.commands[0].permissionGranted, true);
	assert.strictEqual(calendarInitiator.command, client.commands[0]);
	assert.strictEqual(client.commands.length, 1);
});