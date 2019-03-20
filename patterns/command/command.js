class BaseCommand{
	constructor(){
		if(new.target === BaseCommand)
			throw new Error("Can't instantiate abstract type.");

		this.permissionGranted = false;
	}

	checkPermission(){
		return this.permissionGranted;
	}

	execute(){
		throw new Error("Not implemented.");
	}
}

class ReminderCommand extends BaseCommand {
	constructor(executor){
		super();
		this.executor = executor;
	}

	execute(){
		var result = false;

		if(this.checkPermission()){
			this.executor.runAction();
			result = true;
		}

		return result;
	}

	cancel(){
		if(this.executor.runTime)
			this.executor.runTime = null;
	}
}

class CalendarInitiator{
	constructor(){
		this.command = null;
	}

	invoke(){
		if(!(this.command instanceof BaseCommand))
			throw new Error("Invalid property 'command'.");

		if(!this.command.execute())
			this.command.cancel();
	}
}

class TaskExecutor{
	constructor(){
		this.runTime = null;
	}

	runAction(){
		return this.runTime = new Date();
	}
}

class SchedulerClient {
	constructor(){
		this.commands = [];
	}

	createReminderCommand(executor, initiator){
		var reminderCommand = new ReminderCommand(executor);
		reminderCommand.permissionGranted = true;
		initiator.command = reminderCommand;
		this.commands.push(reminderCommand);
	}
}

module.exports = {
	CalendarInitiator,
	BaseCommand,
	ReminderCommand,
	TaskExecutor,
	SchedulerClient
};