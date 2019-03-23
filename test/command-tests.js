"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const { ReminderCommand, TaskExecutor, CalendarInitiator, BaseCommand,
  SchedulerClient } = requireHelper("../patterns/command/command");

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseCommand, assert);
  testHelper.checkAbstractMethods(BaseCommand,
    ["execute"], assert);
});

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkConstructorInvalidArguments(
    ReminderCommand, ["executor"], [], assert);

  testHelper.checkMethodInvalidArguments(
    SchedulerClient, "createReminderCommand", ["executor", "initiator"], 
    [new TaskExecutor(), new CalendarInitiator()], assert);
});

QUnit.test("Check invalid properies", (assert) => {
  testHelper.checkInvalidProperties(
    CalendarInitiator, "invoke", ["command"], { command: new ReminderCommand(new TaskExecutor()) },
    [], assert);
});

QUnit.test("ReminderCommand()", (assert) => {
  const executor = new TaskExecutor();
  const result = new ReminderCommand(executor);

  assert.strictEqual(result.permissionGranted, false);
});

QUnit.test("ReminderCommand.prototype.checkPermission()", (assert) => {
  const executor = new TaskExecutor();
  const command = new ReminderCommand(executor);

  const result = command.checkPermission();

  assert.strictEqual(result, false);
});

QUnit.test("TaskExecutor.prototype.runAction()", (assert) => {
  const taskExecutor = new TaskExecutor();

  const result = taskExecutor.runAction();

  assert.ok(result instanceof Date);
  assert.ok(taskExecutor.runTime instanceof Date);
  assert.strictEqual(taskExecutor.runTime, result);
});

QUnit.test("ReminderCommand.prototype.execute()", (assert) => {
  const taskExecutor = new TaskExecutor();
  const reminderCommand = new ReminderCommand(taskExecutor);
  reminderCommand.permissionGranted = true;

  const result = reminderCommand.execute();

  assert.strictEqual(result, true);
  assert.ok(reminderCommand.executor.runTime instanceof Date);
});

QUnit.test("ReminderCommand.prototype.cancel()", (assert) => {
  const taskExecutor = new TaskExecutor();
  const reminderCommand = new ReminderCommand(taskExecutor);
  reminderCommand.permissionGranted = true;

  reminderCommand.execute();
  reminderCommand.cancel();

  assert.strictEqual(reminderCommand.executor.runTime, null);
});

QUnit.test("CalendarInitiator.prototype.invoke() success", (assert) => {
  const taskExecutor = new TaskExecutor();
  const reminderCommand = new ReminderCommand(taskExecutor);
  reminderCommand.permissionGranted = true;
  const initiator = new CalendarInitiator();
  initiator.command = reminderCommand;

  initiator.invoke();

  assert.ok(initiator.command.executor.runTime instanceof Date);
});

QUnit.test("CalendarInitiator.prototype.invoke() fail", (assert) => {
  const taskExecutor = new TaskExecutor();
  const reminderCommand = new ReminderCommand(taskExecutor);
  reminderCommand.permissionGranted = false;
  const initiator = new CalendarInitiator();
  initiator.command = reminderCommand;

  initiator.invoke();

  assert.strictEqual(initiator.command.executor.runTime, null);
});

QUnit.test("SchedulerClient.prototype.createReminderCommand()", (assert) => {
  const taskExecutor = new TaskExecutor();
  const calendarInitiator = new CalendarInitiator();
  const client = new SchedulerClient();

  client.createReminderCommand(taskExecutor, calendarInitiator);

  assert.ok(client.commands[0] instanceof ReminderCommand);
  assert.strictEqual(client.commands[0].permissionGranted, true);
  assert.strictEqual(calendarInitiator.command, client.commands[0]);
  assert.strictEqual(client.commands.length, 1);
});
