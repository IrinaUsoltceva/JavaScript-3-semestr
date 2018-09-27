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

    var balls = [{x:80, y:120, r:40, dx:10, dy:10},
                 {x:80, y:250, r:40, dx:20, dy:5},
                 {x:180, y:120, r:40, dx:40, dy:10},
                 {x:180, y:210, r:40, dx:30, dy:5}];

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 180);

    SPEED_x = 1000;
    SPEED_y = 1000;

    function get_time() {
        return new Date().getTime();
    }

    var last_redraw_time = get_time();

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

    function update_animation_parameters(elapsed_time_sec) {
        //здесь обновляем значение всех анимируемых параметров
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].x > rectX + rectWidth - balls[i].r || balls[i].x < rectX + balls[i].r)
                balls[i].dx = -balls[i].dx;
            if (balls[i].y > rectY + rectHeigth - balls[i].r || balls[i].y < rectY + balls[i].r)
                balls[i].dy = -balls[i].dy;
            balls[i].x += balls[i].dx * elapsed_time_sec;
            balls[i].y += balls[i].dy * elapsed_time_sec;
        }

        //x += SPEED_x * elapsed_time_sec;

        for (var i = 0; i < balls.length; i++)
            for (var j = i + 1; j < balls.length; j++)
                if ((balls[i].r + balls[j].r) * (balls[i].r + balls[j].r) >
                    (balls[i].x - balls[j].x) * (balls[i].x - balls[j].x) +
                    (balls[i].y - balls[j].y) * (balls[i].y - balls[j].y)) {

                    balls[i].dx = -balls[i].dx;
                    balls[i].dy = -balls[i].dy;
                    balls[j].dx = -balls[j].dx;
                    balls[j].dy = -balls[j].dy;
                }
    }

    function animation_step() {
        //эта функция должна постоянно вызываться
        requestAnimationFrame(animation_step);

        var current_time = get_time();
        var elapsed_time = current_time - last_redraw_time;
        last_redraw_time = current_time;

        if (elapsed_time > 1)
            elapsed_time = 1;

        update_animation_parameters(elapsed_time / 1000);
        draw();
    }

    requestAnimationFrame(animation_step);
}