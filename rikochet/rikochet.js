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
var WIDTH = 640;
var HEIGHT = 640;

var BRICK_W = 100;
var BRICK_H = 30;
var BRICK_X0 = 100;
var BRICK_Y0 = 100;

var CAR_W = 100;
var CAR_H = 30;

var BALL_RADIUS = 10;

function init() {
    console.info("page loaded");
    var stage = new createjs.Stage("game");

//сами объекты
    //кирпич для постройки
    var brick = new createjs.Shape;
    brick.graphics
        .beginFill("black")
        .drawRect(0, 0, BRICK_W, BRICK_H)
        .beginFill("#50afe4")
        .drawRect(1, 1, BRICK_W - 2, BRICK_H - 2);
    brick.regX = BRICK_W / 2;
    brick.regY = BRICK_H / 2;

    //кирпичи на уровне
    var bricks = [
        [
            {x: BRICK_X0, y: BRICK_Y0},
            //{x: BRICK_X0 + BRICK_W, y: BRICK_Y0},
            {x: BRICK_X0 + 2 * BRICK_W, y: BRICK_Y0},
            //{x: BRICK_X0 + 3 * BRICK_W, y: BRICK_Y0},
            {x: BRICK_X0 + 4 * BRICK_W, y: BRICK_Y0}
        ], [
            //{x: BRICK_X0 + 2 * BRICK_W, y: BRICK_Y0 + BRICK_H}
        ]
    ];

    //контейнер с кирпичами для нарисования
    var bricksContainer = new createjs.Container();
    for (var i = 0; i < bricks.length; i++) {
        for (var j = 0; j < bricks[i].length; j++) {
            var bricki = brick.clone(true);
            bricki.x = bricks[i][j].x;
            bricki.y = bricks[i][j].y;
            bricksContainer.addChild(bricki);
        }
    }

    //машина
    var car = brick.clone(true);
    car.x = WIDTH / 2;
    car.y = HEIGHT - CAR_H / 2;

    //мяч
    var ball = new createjs.Shape;
    ball.x = WIDTH / 2 + 80;
    ball.y = HEIGHT - CAR_H - BALL_RADIUS;
    ball.dx = 5;
    ball.dy = 5;
    ball.r = BALL_RADIUS;
    ball.graphics
        .beginFill("Black")
        .drawCircle(0, 0, ball.r)
        .beginFill("#50afe4")
        .drawCircle(0, 0, ball.r  - 1);
    ball.addEventListener('tick', ball_tick);

    stage.addChild(bricksContainer, car, ball);

//функции для работы

    function ball_tick(e) {
        var ball = e.target;
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x > WIDTH - BALL_RADIUS || ball.x < BALL_RADIUS)
            ball.dx *= -1;
        if (ball.y > HEIGHT - BALL_RADIUS || ball.y < BALL_RADIUS)
            ball.dy *= -1;
        //если расстояние между центром круга и горизонтальной линией кирпича
        //меньше, чем радиус, то dx на противоположный
        /*for (var i = 0; i < bricks.length; i++)
            for (var j = 0; j < bricks[i].length; j++)
                if (
                    (
                        Math.abs(ball.y - (bricks[i][j].y + BRICK_H / 2)) <= BALL_RADIUS
                        ||
                        Math.abs((bricks[i][j].y - BRICK_H / 2) - ball.y) <= BALL_RADIUS
                    ) && (
                        ball.x >= bricks[i][j].x - BALL_RADIUS
                        &&
                        ball.x <= bricks[i][j].x + BALL_RADIUS
                    )
                ){
                    console.log("напр");
                    ball.dy *= -1;
                }*/
    }

    car.addE


    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.framerate = 60; //60 в секунду
    createjs.Ticker.timerMode = createjs.Ticker.RAF_SYNCHED;
}