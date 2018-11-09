/*var BRICK_W = 100;
var BRICK_H = 30;
var BRICK_X0 = 0;
var BRICK_Y0 = 0;
var BRICKS_IN_LINE = 5;
var BRICKS_IN_COL = 2;

var level = {
    bricks: [[1, 2, 1, 2, 1], [0, 0, 1, 0, 0]],            // 1 2 1 2 1
                                                           //     1
    car: {x: 50},
    ball: {x: 0, y: 0}
};

function init() {
    var brickViews = createViews(); //создать список brickView (Shape) для всех кирпичиков (не 0)
    var carView = ... //shape
    var ballView = ... //shape

    //Timer
}*/
var BRICK_W = 100;
var BRICK_H = 30;
var BRICK_X0 = 100;
var BRICK_Y0 = 100;

function init() {
    console.info("page loaded");
    var stage = new createjs.Stage("game");

    //сами объекты
    var brick = new createjs.Shape;
    brick.graphics
        .beginFill("black")
        .drawRect(0, 0, BRICK_W, BRICK_H)
        .beginFill("#50afe4")
        .drawRect(1, 1, BRICK_W - 2, BRICK_H - 2);
    brick.regX = BRICK_W / 2;
    brick.regY = BRICK_H / 2;

    var bricks = [[{x:BRICK_X0, y:BRICK_Y0},{x:BRICK_X0 + BRICK_W, y:BRICK_Y0},{x:BRICK_X0 + 2 * BRICK_W, y:BRICK_Y0},{x:BRICK_X0 + 3 * BRICK_W, y:BRICK_Y0},{x:BRICK_X0 + 4 * BRICK_W, y:BRICK_Y0}]
                    [{x:BRICK_X0 + 2 * BRICK_W, y:BRICK_Y0 + BRICK_Y0}]];
    brick.x = 100;
    brick.y = 100;

    var bricksContainer = new createjs.Container();
    for (var i = 0; i < bricks.length; i++)
        for (var j = 0; j < bricks[i].length; j++)
            bricksContainer.addChild(bricks[i][j]);

    brick2 = brick.clone(true);
    brick2.x = 100;
    brick2.y = 132;

    stage.addChild(bricksContainer);


    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.framerate = 60; //60 в секунду
    createjs.Ticker.timerMode = createjs.Ticker.RAF_SYNCHED;
}