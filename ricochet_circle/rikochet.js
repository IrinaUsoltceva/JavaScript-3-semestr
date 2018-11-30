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
    ball.dx = 1;
    ball.dy = -1;
    ball.speed = 5;
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

    function collide(x0, y0, x, y, dx, dy) {
        var vx = x - x0;
        var vy = y - y0;
        // var mod_v = Math.sqrt(vx * vx + vy * vy);
        var mod_v2 = vx * vx + vy * vy;
        console.log(vx, vy, mod_v2);
        // ball.dx -= 2 * (vx / mod_v) *
        //     ((vx * ball.dx + vy * ball.dy) / mod_v);
        // ball.dy -= 2 * (vy / mod_v) *
        //     ((vx * ball.dx + vy * ball.dy) / mod_v);

        console.log('^', dx, dy);

        var dot_prod = vx * dx + vy * dy;
        dx -= 2 * (vx / mod_v2) * dot_prod;
        dy -= 2 * (vy / mod_v2) * dot_prod;

        console.log(2 * (vx / mod_v2) * (dot_prod), 2 * (vy / mod_v2) * (dot_prod));
        console.log(dx, dy);

        return [dx, dy];
    }

    console.log('c', collide(1, 3, 0, 0, 4, 7));

    function ball_tick(e) {
        var ball = e.target;
        ball.x += ball.dx * ball.speed;
        ball.y += ball.dy * ball.speed;

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
                ball.dx = 1;
                ball.dy = -1;
                ball.speed = 5;
                stage.removeChild(text);
                stage.addChild(ball);
                stage_condition = 1;
            });

        //машина
        if (ball.y >= HEIGHT - CAR_H - BALL_RADIUS &&
            ball.x <= car.x + CAR_W / 2 &&
            ball.x >= car.x - CAR_W / 2)
            ball.dy *= -1;

        //брики
        for (var i = 0; i < bricks.length; i++) {
            for (var j = 0; j < bricks[i].length; j++) {
                //иными словами, если сумма радиусов больше, чем расстояние между центрами
                //значит, мячи столкнулись
                if ((BRICK_R + BALL_RADIUS) * (BRICK_R + BALL_RADIUS) >=
                    (bricks[i][j].x - ball.x) * (bricks[i][j].x - ball.x) +
                    (bricks[i][j].y - ball.y) * (bricks[i][j].y - ball.y)
                ) {
                    var d = collide(bricks[i][j].x, bricks[i][j].y, ball.x, ball.y, ball.dx, ball.dy);

                    ball.dx = d[0];
                    ball.dy = d[1];

                    console.log("boom", ball.dx * ball.dx + ball.dy * ball.dy);

                }
            }
        }
    }



    stage.addEventListener('stagemousemove', function (e) {
        car.x = e.stageX;
    });


    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.framerate = 60; //60 в секунду
    createjs.Ticker.timerMode = createjs.Ticker.RAF_SYNCHED;
}