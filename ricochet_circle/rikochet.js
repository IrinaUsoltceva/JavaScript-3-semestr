var WIDTH = 640;
var HEIGHT = 640;

var BRICK_R = 50;
var BRICK_X0 = 100;
var BRICK_Y0 = 100;

var CAR_W = 100;
var CAR_H = 30;

var BALL_RADIUS = 10;

function init() {
    console.info("page loaded");
    var stage = new createjs.Stage("game");

//сами объекты
    function create_brick() {
        var brick = new createjs.Shape();

        brick.graphics
            .beginFill("black")
            .drawCircle(0, 0, BRICK_R)
            .beginFill("#50afe4")
            .drawCircle(0, 0, BRICK_R - 2);
        brick.regX = 0;
        brick.regY = 0;

        return brick;
    }

    //кирпичи на уровне
    var bricks = [
        [
            {x: BRICK_X0, y: BRICK_Y0},
            //{x: BRICK_X0 + BRICK_R, y: BRICK_Y0},
            {x: BRICK_X0 + 4 * BRICK_R, y: BRICK_Y0},
            //{x: BRICK_X0 + 6 * BRICK_R, y: BRICK_Y0},
            {x: BRICK_X0 + 8 * BRICK_R, y: BRICK_Y0}
        ], [
            //{x: BRICK_X0 + 2 * BRICK_R, y: BRICK_Y0 + BRICK_H}
        ]
    ];

    //контейнер с кирпичами для нарисования
    var bricksContainer = new createjs.Container();
    for (var i = 0; i < bricks.length; i++) {
        for (var j = 0; j < bricks[i].length; j++) {
            var bricki = create_brick();
            bricki.x = bricks[i][j].x;
            bricki.y = bricks[i][j].y;
            bricksContainer.addChild(bricki);
        }
    }

    //машина
    var car = new createjs.Shape();
    car.graphics
        .beginFill("black")
        .drawRect(0, 0, CAR_W, CAR_H)
        .beginFill("#50afe4")
        .drawRect(1, 1, CAR_W - 2, CAR_H - 2);
    car.regX = CAR_W / 2;
    car.regY = CAR_H / 2;

    car.x = 50;
    car.y = HEIGHT - CAR_H / 2;

    //мяч
    var ball = new createjs.Shape;
    ball.x = car.x;
    ball.y = HEIGHT - CAR_H - BALL_RADIUS;
    ball.dx = 2;
    ball.dy = -2;
    ball.r = BALL_RADIUS;
    ball.graphics
        .beginFill("Black")
        .drawCircle(0, 0, ball.r)
        .beginFill("#50afe4")
        .drawCircle(0, 0, ball.r  - 1);
    ball.addEventListener('tick', ball_tick);

    //текст, когда конец
    var text = new createjs.Text("конец", "20px Arial", "#50afe4");
    text.x = WIDTH / 2;
    text.y = HEIGHT / 2;

    var stage_condition = 1;

    stage.addChild(bricksContainer, car, ball);


//функции для работы

    function ball_tick(e) {
        var ball = e.target;
        ball.x += ball.dx;
        ball.y += ball.dy;

        //стенки
        if (ball.x > WIDTH - BALL_RADIUS || ball.x < BALL_RADIUS)
            ball.dx *= -1;
        if (ball.y < BALL_RADIUS)
            ball.dy *= -1;

        //4 стена
        if (ball.y > HEIGHT - BALL_RADIUS) {
            stage.removeChild(ball);
            stage.addChild(text);
            stage_condition = 0;
        }

        if (stage_condition === 0)
            stage.addEventListener("stagemousedown", function () {
                ball.x = car.x;
                ball.y = HEIGHT - CAR_H - BALL_RADIUS;
                ball.dx = 5;
                ball.dy = -5;
                stage.removeChild(text);
                stage.addChild(ball);
                stage_condition = 1;
            });

        //машина
        if (ball.y >= HEIGHT - CAR_H - BALL_RADIUS &&
            ball.x <= car.x + CAR_W / 2 &&
            ball.x >= car.x - CAR_W / 2)
            ball.dy *= -1;
        }

        //брики


    stage.addEventListener('stagemousemove', function (e) {
        car.x = e.stageX;
    });


    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.framerate = 60; //60 в секунду
    createjs.Ticker.timerMode = createjs.Ticker.RAF_SYNCHED;
}