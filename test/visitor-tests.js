"use strict";

const requireHelper = require("./_require_helper");
const testHelper = require("./_test_helper");
const BallsManagerClient = requireHelper("../patterns/visitor/BallsManagerClient"),
      BallsCollectionData = requireHelper("../patterns/visitor/BallsCollectionData"),
      BaseballBall = requireHelper("../patterns/visitor/BaseballBall"),
      BaseBall = requireHelper("../patterns/visitor/BaseBall"),
      FootballBall = requireHelper("../patterns/visitor/FootballBall"),
      KickBallVisitor = requireHelper("../patterns/visitor/KickBallVisitor"),
      ThrowBallVisitor = requireHelper("../patterns/visitor/ThrowBallVisitor"),
      ReturnBallVisitor = requireHelper("../patterns/visitor/ReturnBallVisitor"),
      BaseBallVisitor = requireHelper("../patterns/visitor/BaseBallVisitor"),
      GetStatisticVisitor = requireHelper("../patterns/visitor/GetStatisticVisitor");

QUnit.test("Check invalid arguments", (assert) => {
  testHelper.checkMethodInvalidArguments(
    FootballBall, "accept", ["baseBallVisitor"], [], assert);

  testHelper.checkMethodInvalidArguments(
    BaseballBall, "accept", ["baseBallVisitor"], [], assert);

  testHelper.checkMethodInvalidArguments(
    KickBallVisitor, "visitFootballBall", ["baseBall"], [], assert);

  testHelper.checkMethodInvalidArguments(
    ThrowBallVisitor, "visitBaseballBall", ["baseBall"], [], assert);

  testHelper.checkMethodInvalidArguments(
    GetStatisticVisitor, "visitFootballBall", ["baseBall"], [], assert);

  testHelper.checkMethodInvalidArguments(
    GetStatisticVisitor, "visitBaseballBall", ["baseBall"], [], assert);

  testHelper.checkMethodInvalidArguments(
    ReturnBallVisitor, "visitFootballBall", ["baseBall"], [], assert);

  testHelper.checkMethodInvalidArguments(
    ReturnBallVisitor, "visitBaseballBall", ["baseBall"], [], assert);
});

QUnit.test("Check abstract types", (assert) => {
  testHelper.checkAbstract(BaseBall, assert);
  testHelper.checkAbstractMethods(BaseBall,
    ["accept"], assert);

  testHelper.checkAbstract(BaseBallVisitor, assert);
  testHelper.checkAbstractMethods(BaseBallVisitor,
    ["visitFootballBall", "visitBaseballBall"], assert);
});

QUnit.test("FootballBall()", (assert) => {
  const result = new FootballBall();

  assert.strictEqual(result.state, FootballBall.states.inflated);
  assert.strictEqual(result.movingState, FootballBall.movingStates.lying);
  assert.strictEqual(result.height, 0);
  assert.strictEqual(result.distance, 0);
});

QUnit.test("KickBallVisitor.prototype.visitFootballBall(baseBall)", (assert) => {
  const ball = new FootballBall();
  const visitor = new KickBallVisitor();

  visitor.visitFootballBall(ball);

  assert.strictEqual(ball.state, FootballBall.states.inflated);
  assert.strictEqual(ball.movingState, FootballBall.movingStates.kickedOut);
  assert.strictEqual(ball.height, 20);
  assert.strictEqual(ball.distance, 30);
});

QUnit.test("FootballBall.prototype.accept(baseBallVisitor)", (assert) => {
  const ball = new FootballBall();
  const visitor = new KickBallVisitor();

  ball.accept(visitor);

  assert.strictEqual(ball.state, FootballBall.states.inflated);
  assert.strictEqual(ball.movingState, FootballBall.movingStates.kickedOut);
  assert.strictEqual(ball.height, 20);
  assert.strictEqual(ball.distance, 30);
});

QUnit.test("BaseballBall()", (assert) => {
  const result = new BaseballBall();

  assert.strictEqual(result.movingState, FootballBall.movingStates.lying);
  assert.strictEqual(result.height, 0);
  assert.strictEqual(result.distance, 0);
});

QUnit.test("ThrowBallVisitor.prototype.visitBaseballBall(baseBall)", (assert) => {
  const ball = new FootballBall();
  const visitor = new ThrowBallVisitor();

  visitor.visitBaseballBall(ball);

  assert.strictEqual(ball.movingState, BaseballBall.movingStates.throwed);
  assert.strictEqual(ball.height, 30);
  assert.strictEqual(ball.distance, 40);
});

QUnit.test("BaseballBall.prototype.accept(baseBallVisitor)", (assert) => {
  const ball = new BaseballBall();
  const visitor = new ThrowBallVisitor();

  ball.accept(visitor);

  assert.strictEqual(ball.movingState, BaseballBall.movingStates.throwed);
  assert.strictEqual(ball.height, 30);
  assert.strictEqual(ball.distance, 40);
});

QUnit.test("GetStatisticVisitor()", (assert) => {
  const result = new GetStatisticVisitor();

  assert.strictEqual(result.totalHeight, 0);
  assert.strictEqual(result.totalDistance, 0);
});

QUnit.test("GetStatisticVisitor.prototype.getStatistics(baseBall)", (assert) => {
  const ball = new BaseballBall();
  let visitor = new ThrowBallVisitor();
  ball.accept(visitor);

  visitor = new GetStatisticVisitor();
  ball.accept(visitor);

  assert.strictEqual(visitor.totalHeight, 30);
  assert.strictEqual(visitor.totalDistance, 40);
});

QUnit.test("GetStatisticVisitor.prototype.visitFootballBall(baseBall)", (assert) => {
  const ball = new FootballBall();
  let visitor = new KickBallVisitor();
  ball.accept(visitor);

  visitor = new GetStatisticVisitor();
  visitor.visitFootballBall(ball);

  assert.strictEqual(visitor.totalHeight, 20);
  assert.strictEqual(visitor.totalDistance, 30);
});

QUnit.test("GetStatisticVisitor.prototype.visitBaseballBall(baseBall)", (assert) => {
  const ball = new BaseballBall();
  let visitor = new ThrowBallVisitor();
  ball.accept(visitor);

  visitor = new GetStatisticVisitor();
  visitor.visitBaseballBall(ball);

  assert.strictEqual(visitor.totalHeight, 30);
  assert.strictEqual(visitor.totalDistance, 40);
});

QUnit.test("ReturnBallVisitor.prototype.visitBaseballBall(baseBall)", (assert) => {
  const ball = new BaseballBall();
  let visitor = new ThrowBallVisitor();
  ball.accept(visitor);

  visitor = new ReturnBallVisitor();
  visitor.visitBaseballBall(ball);

  assert.strictEqual(ball.height, 0);
  assert.strictEqual(ball.distance, 0);
});

QUnit.test("ReturnBallVisitor.prototype.visitFootballBall(baseBall)", (assert) => {
  const ball = new FootballBall();
  let visitor = new KickBallVisitor();
  ball.accept(visitor);

  visitor = new ReturnBallVisitor();
  visitor.visitFootballBall(ball);

  assert.strictEqual(ball.height, 0);
  assert.strictEqual(ball.distance, 0);
});

QUnit.test("BallsCollectionData()", (assert) => {
  const result = new BallsCollectionData();

  result.balls.forEach((ball) => {
    assert.ok(ball instanceof BaseBall);
  });

  assert.strictEqual(result.balls.length, 20);
});

QUnit.test("BallsManagerClient()", (assert) => {
  const result = new BallsManagerClient();

  assert.ok(result.data instanceof BallsCollectionData);
});

QUnit.test("BallsManagerClient.prototype.performDynamicActionOnAllBalls(visitor)", (assert) => {
  const client = new BallsManagerClient(),
    kickVisitor = new KickBallVisitor(),
    throwVisitor = new ThrowBallVisitor(),
    returnVisitor = new ReturnBallVisitor();

  client.performDynamicActionOnAllBalls(kickVisitor);
  const statisticsVisitor1 = new GetStatisticVisitor();
  client.performDynamicActionOnAllBalls(statisticsVisitor1);

  assert.strictEqual(statisticsVisitor1.totalHeight, 20 * 10);
  assert.strictEqual(statisticsVisitor1.totalDistance, 30 * 10);

  client.performDynamicActionOnAllBalls(throwVisitor);
  const statisticsVisitor2 = new GetStatisticVisitor();
  client.performDynamicActionOnAllBalls(statisticsVisitor2);

  assert.strictEqual(statisticsVisitor2.totalHeight, 20 * 10 + 30 * 10);
  assert.strictEqual(statisticsVisitor2.totalDistance, 40 * 10 + 30 * 10);

  client.performDynamicActionOnAllBalls(returnVisitor);
  const statisticsVisitor3 = new GetStatisticVisitor();
  client.performDynamicActionOnAllBalls(statisticsVisitor3);

  assert.strictEqual(statisticsVisitor3.totalHeight, 0);
  assert.strictEqual(statisticsVisitor3.totalDistance, 0);
});
