const { BallsManagerClient, BallsCollectionData, BaseballBall, FootballBall, KickBallVisitor, ThrowBallVisitor, ReturnBallVisitor, GetStatisticVisitor } = require('../patterns/visitor/visitor');

QUnit.test("FootballBall()", function (assert) {
	const result = new FootballBall();
	
	assert.strictEqual(result.state, FootballBall.states.inflated);
	assert.strictEqual(result.movingState, FootballBall.movingStates.lying);
	assert.strictEqual(result.height, 0);
	assert.strictEqual(result.distance, 0);
});

QUnit.test("KickBallVisitor.prototype.visitFootballBall(baseBall)", function (assert) {
	const ball = new FootballBall();
	const visitor = new KickBallVisitor();
	
	visitor.visitFootballBall(ball);

	assert.strictEqual(ball.state, FootballBall.states.inflated);
	assert.strictEqual(ball.movingState, FootballBall.movingStates.kickedOut);
	assert.strictEqual(ball.height, 20);
	assert.strictEqual(ball.distance, 30);
});

QUnit.test("FootballBall.prototype.accept(baseBallVisitor)", function (assert) {
	const ball = new FootballBall();
	const visitor = new KickBallVisitor();
	
	ball.accept(visitor);

	assert.strictEqual(ball.state, FootballBall.states.inflated);
	assert.strictEqual(ball.movingState, FootballBall.movingStates.kickedOut);
	assert.strictEqual(ball.height, 20);
	assert.strictEqual(ball.distance, 30);
});

QUnit.test("BaseballBall()", function (assert) {
	const result = new BaseballBall();
	
	assert.strictEqual(result.movingState, FootballBall.movingStates.lying);
	assert.strictEqual(result.height, 0);
	assert.strictEqual(result.distance, 0);
});

QUnit.test("ThrowBallVisitor.prototype.visitBaseballBall(baseBall)", function (assert) {
	const ball = new FootballBall();
	const visitor = new ThrowBallVisitor();
	
	visitor.visitBaseballBall(ball);

	assert.strictEqual(ball.movingState, BaseballBall.movingStates.throwed);
	assert.strictEqual(ball.height, 30);
	assert.strictEqual(ball.distance, 40);
});

QUnit.test("BaseballBall.prototype.accept(baseBallVisitor)", function (assert) {
	const ball = new BaseballBall();
	const visitor = new ThrowBallVisitor();
	
	ball.accept(visitor);

	assert.strictEqual(ball.movingState, BaseballBall.movingStates.throwed);
	assert.strictEqual(ball.height, 30);
	assert.strictEqual(ball.distance, 40);
});

QUnit.test("GetStatisticVisitor()", function (assert) {
	const result = new GetStatisticVisitor();
	
	assert.strictEqual(result.totalHeight, 0);
	assert.strictEqual(result.totalDistance, 0);
});

QUnit.test("GetStatisticVisitor.prototype.getStatistics(baseBall)", function (assert) {
	const ball = new BaseballBall();
	let visitor = new ThrowBallVisitor();
	ball.accept(visitor);
	
	visitor = new GetStatisticVisitor();
	ball.accept(visitor);
	
	assert.strictEqual(visitor.totalHeight, 30);
	assert.strictEqual(visitor.totalDistance, 40);
});

QUnit.test("GetStatisticVisitor.prototype.visitFootballBall(baseBall)", function (assert) {
	const ball = new FootballBall();
	let visitor = new KickBallVisitor();
	ball.accept(visitor);
	
	visitor = new GetStatisticVisitor();
	visitor.visitFootballBall(ball);
	
	assert.strictEqual(visitor.totalHeight, 20);
	assert.strictEqual(visitor.totalDistance, 30);
});

QUnit.test("GetStatisticVisitor.prototype.visitBaseballBall(baseBall)", function (assert) {
	const ball = new BaseballBall();
	let visitor = new ThrowBallVisitor();
	ball.accept(visitor);
	
	visitor = new GetStatisticVisitor();
	visitor.visitBaseballBall(ball);
	
	assert.strictEqual(visitor.totalHeight, 30);
	assert.strictEqual(visitor.totalDistance, 40);
});

QUnit.test("ReturnBallVisitor.prototype.visitBaseballBall(baseBall)", function (assert) {
	const ball = new BaseballBall();
	let visitor = new ThrowBallVisitor();
	ball.accept(visitor);
	
	visitor = new ReturnBallVisitor();
	visitor.visitBaseballBall(ball);
	
	assert.strictEqual(ball.height, 0);
	assert.strictEqual(ball.distance, 0);
});

QUnit.test("ReturnBallVisitor.prototype.visitFootballBall(baseBall)", function (assert) {
	const ball = new FootballBall();
	let visitor = new KickBallVisitor();
	ball.accept(visitor);
	
	visitor = new ReturnBallVisitor();
	visitor.visitFootballBall(ball);
	
	assert.strictEqual(ball.height, 0);
	assert.strictEqual(ball.distance, 0);
});

QUnit.test("BallsCollectionData()", function (assert) {
	const result = new BallsCollectionData();
	
	result.footballBalls.forEach(ball => {
		assert.ok(ball instanceof FootballBall);
	});

	result.baseballBalls.forEach(ball => {
		assert.ok(ball instanceof BaseballBall);
	});

	assert.strictEqual(result.footballBalls.length, 10);
	assert.strictEqual(result.baseballBalls.length, 10);
});

QUnit.test("BallsManagerClient()", function (assert) {
	const result = new BallsManagerClient();
	
	assert.ok(result.data instanceof BallsCollectionData);
});

QUnit.test("BallsManagerClient.prototype.performDynamicActionOnAllBalls(visitor)", function (assert) {
	const client = new BallsManagerClient();
	const kickVisitor = new KickBallVisitor();
	const throwVisitor = new ThrowBallVisitor();
	const returnVisitor = new ReturnBallVisitor();

	client.performDynamicActionOnAllBalls(kickVisitor);
	const getStatisticsVisitor1 = new GetStatisticVisitor();
	client.performDynamicActionOnAllBalls(getStatisticsVisitor1);

	assert.strictEqual(getStatisticsVisitor1.totalHeight, 20 * 10);
	assert.strictEqual(getStatisticsVisitor1.totalDistance, 30 * 10);

	client.performDynamicActionOnAllBalls(throwVisitor);
	const getStatisticsVisitor2 = new GetStatisticVisitor();
	client.performDynamicActionOnAllBalls(getStatisticsVisitor2);

	assert.strictEqual(getStatisticsVisitor2.totalHeight, 20 * 10 + 30 * 10);
	assert.strictEqual(getStatisticsVisitor2.totalDistance, 40 * 10 + 30 * 10);

	client.performDynamicActionOnAllBalls(returnVisitor);
	const getStatisticsVisitor3 = new GetStatisticVisitor();
	client.performDynamicActionOnAllBalls(getStatisticsVisitor3);

	assert.strictEqual(getStatisticsVisitor3.totalHeight, 0);
	assert.strictEqual(getStatisticsVisitor3.totalDistance, 0);
});