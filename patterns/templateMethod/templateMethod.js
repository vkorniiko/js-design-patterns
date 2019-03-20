class BaseHouse {
	constructor(){
		if(new.target === BaseHouse)
			throw new Error("Can't instantiate abstract type.");

		this.builtParts = [];
	}

	build(){
		this.digFoundationPit();
		this.layFoundation();
		this.buildWalls();
		this.installRoof();
	}

	digFoundationPit(){
		throw new Error("Not implemented.");
	}

	layFoundation(){
		throw new Error("Not implemented.");
	}

	buildWalls(){
		this.installDoors();
		this.installWindows();
	}

	installDoors(){
		throw new Error("Not implemented.");
	}

	installWindows(){
		throw new Error("Not implemented.");
	}

	installRoof(){
		throw new Error("Not implemented.");
	}
}

const parts = { 
	foundationPit: "foundationPit", 
	foundation: "foundation",
	walls: "walls", 
	doors: "doors", 
	windows: "windows", 
	roof: "roof" 
};

class House extends BaseHouse {
	static get parts(){
		return parts;
	}

	digFoundationPit(){
		this.builtParts.push(House.parts.foundationPit);
	}

	layFoundation(){
		this.builtParts.push(House.parts.foundation);
	}

	buildWalls(){
		this.builtParts.push(House.parts.walls);
		super.buildWalls();
	}

	installDoors(){
		this.builtParts.push(House.parts.doors);
	}

	installWindows(){
		this.builtParts.push(House.parts.windows);
	}

	installRoof(){
		this.builtParts.push(House.parts.roof);
	}
}

module.exports = {
	BaseHouse,
	House
};