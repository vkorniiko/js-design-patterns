const { BaseImageFlyweight, IconFlyweight, IconFlyweightFactory, FlyweightClient } = require('../patterns/flyweight/flyweight');

QUnit.test("IconFlyweight(imageData)", function (assert) {
	const actualImageData = "testData";
	const result = new IconFlyweight(actualImageData);
	
	assert.strictEqual(result.imageData, actualImageData);
});

QUnit.test("IconFlyweight.prototype.draw(context)", function (assert) {
	const actualImageData = "testData";
	const actualX = 100, actualY = 100;
	const flyweight = new IconFlyweight(actualImageData);
	let drawnImageData, movedToX, movedToY;

	const contextMock = {
		drawImage(imageData){
			drawnImageData = imageData;
		},
		moveTo(x, y){
			movedToX = x;
			movedToY = y;
		}
	};

	flyweight.draw(contextMock, actualX, actualY);

	assert.strictEqual(drawnImageData, flyweight.imageData);
	assert.strictEqual(actualImageData, drawnImageData);
	assert.strictEqual(actualX, movedToX);
	assert.strictEqual(actualY, movedToY);
});

QUnit.test("IconFlyweightFactory.prototype.getFlyweight(key)", function (assert) {
	const imageKey = "testIcon";
	let requestedImageKey;

	const loaderMock = {
		loadImageData(key){
			requestedImageKey = key;
			return "testIconData";
		}
	};

	const iconFlyweightFactory = new IconFlyweightFactory(loaderMock);

	const result1 = iconFlyweightFactory.getFlyweight(imageKey);

	assert.ok(result1 instanceof IconFlyweight);
	assert.ok(iconFlyweightFactory.flyweights.has(imageKey));
	assert.strictEqual(iconFlyweightFactory.flyweights.get(imageKey), result1);
	assert.strictEqual(requestedImageKey, imageKey);

	const result2 = iconFlyweightFactory.getFlyweight(imageKey);
	assert.strictEqual(result1, result2);
});

QUnit.test("FlyweightClient.prototype.drawMenu(flyweightFactory, menuDrawingContext)", function (assert) {
	const imageData = "testData";
	let drawnImageDataArray = [], movedToXArray = [], movedToYArray = [];

	const loaderMock = {
		loadImageData(key){ return imageData; }
	};

	const menuDrawingContext = {
		drawImage(imageData){
			drawnImageDataArray.push(imageData);
		},
		moveTo(x, y){
			movedToXArray.push(x);
			movedToYArray.push(y);
		}
	};

	const menuItemsEnum = [{ 
		key: "copy",
		x: 0,
		y: 0, 
	}, 
	{
		key: "paste",
		x: 48,
		y: 0,
	}];

	const iconFlyweightFactory = new IconFlyweightFactory(loaderMock);
	const flyweightClient = new FlyweightClient(menuItemsEnum);

	flyweightClient.drawMenu(iconFlyweightFactory, menuDrawingContext);

	assert.ok(iconFlyweightFactory.flyweights.has(flyweightClient.menuItemsEnum[0].key));
	assert.ok(iconFlyweightFactory.flyweights.has(flyweightClient.menuItemsEnum[1].key));
	
	assert.strictEqual(drawnImageDataArray[0], imageData);
	assert.strictEqual(drawnImageDataArray[1], imageData);
	assert.strictEqual(drawnImageDataArray[2], "specificImageData");
	
	assert.strictEqual(movedToXArray[0], 0);
	assert.strictEqual(movedToYArray[0], 0);
	
	assert.strictEqual(movedToXArray[1], 48);
	assert.strictEqual(movedToYArray[1], 0);

	assert.strictEqual(movedToXArray[2], 96);
	assert.strictEqual(movedToYArray[2], 0);
});