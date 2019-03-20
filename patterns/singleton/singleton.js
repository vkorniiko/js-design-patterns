class ApplicationSingleton {
	static instance(){
		return new ApplicationSingleton();
	}

	constructor(){
		if(!ApplicationSingleton.uniqueInstance){
			Object.defineProperty(ApplicationSingleton, "uniqueInstance", {
				enumerable: true,
				configurable: false,
				writable: false,
				value: this
			});

			this.isInitialized = false;
		}

		return ApplicationSingleton.uniqueInstance;
	}

	initialize(){
		this.isInitialized = true;
	}
}

module.exports = {
	ApplicationSingleton
};