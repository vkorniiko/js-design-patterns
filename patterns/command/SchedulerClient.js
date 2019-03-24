"use strict";

const TaskExecutor = require("./TaskExecutor");
const CalendarInitiator = require("./CalendarInitiator");
const ReminderCommand = require("./ReminderCommand");

class SchedulerClient {
  constructor() {
    this.commands = [];
  }
  createReminderCommand(executor, initiator) {
    if (!(executor instanceof TaskExecutor))
      throw new Error("Invalid argument 'executor'.");

    if (!(initiator instanceof CalendarInitiator))
      throw new Error("Invalid argument 'initiator'.");

    const reminderCommand = new ReminderCommand(executor);
    reminderCommand.permissionGranted = true;
    initiator.command = reminderCommand;
    this.commands.push(reminderCommand);
  }
}

module.exports = SchedulerClient;
