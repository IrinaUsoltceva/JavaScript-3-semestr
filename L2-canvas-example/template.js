function init() {
    console.info("page loaded");

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');


    ctx.fillStyle = "cyan";

    var rectWidth = 560;
    var rectHeigth = 480;
    var rectX = 40;
    var rectY = 80;

    ctx.fillRect(rectX, rectY, rectWidth, rectHeigth);

    //заведем параметры анимации
    var r = 40;
    var x = rectX + r;
    var y = rectY + r;

    var dx = 1;
    var dy = 1;

    var balls = [{x:80, y:120, r:40, dx:1, dy:1},
                 {x:80, y:250, r:40, dx:2, dy:0.5},
                 {x:180, y:120, r:40, dx:4, dy:1},
                 {x:180, y:210, r:40, dx:3, dy:0.5}];

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 180);
    ctx.stroke();

    function get_time() {
        return new Date().getTime();
    }

    function draw() {
        //здесь перерисовывается содержимое экрана
        //используем значение параметров анимации
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "cyan";
        ctx.fillRect(rectX, rectY, rectWidth, rectHeigth);

        for (var i = 0; i < balls.length; i++) {
            ctx.beginPath();
            ctx.arc(balls[i].x, balls[i].y, balls[i].r, 0, 180);
            ctx.stroke();
        }
    }


    function update_animation_parameters() {
        //здесь обновляем значение всех анимируемых параметров
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].x > rectX + rectWidth - balls[i].r || balls[i].x < rectX + balls[i].r)
                balls[i].dx = -balls[i].dx;
            if (balls[i].y > rectY + rectHeigth - balls[i].r || balls[i].y < rectY + balls[i].r)
                balls[i].dy = -balls[i].dy;
            balls[i].x += balls[i].dx;
            balls[i].y += balls[i].dy;
        }

        /*for (var i = 0; i < balls.length; i++)
            for (var j = 0; j < balls.length; j++)
                if ((balls[i].r + balls[j].r) * (balls[i].r + balls[j].r) >
                    (balls[i].x - balls[j].x) * (balls[i].x - balls[j].x) +
                    (balls[i].y - balls[j].y) * (balls[i].y - balls[j].y)) {

                    balls[i].dx = -balls[i].dx;
                    balls[i].dy = -balls[i].dy;
                    balls[j].dx = -balls[j].dx;
                    balls[j].dy = -balls[j].dy;
                }*/
    }

    function animation_step() {
        //эта функция должна постоянно вызываться
        requestAnimationFrame(animation_step);
        update_animation_parameters();
        draw();
    }

    requestAnimationFrame(animation_step);
}