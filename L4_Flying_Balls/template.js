function init() {
    console.info("page loaded");

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');


    ctx.fillStyle = "cyan";

    var rectWidth = 560;
    var rectHeigth = 480;
    var rectX = 40;
    var rectY = 80;
    var sx = 11;

    ctx.fillRect(rectX, rectY, rectWidth, rectHeigth);

    //заведем параметры анимации
    var balls = [{x:100, y:140, r:35, dx:1, dy:1},
                 {x:80, y:400, r:30, dx:1, dy:1},
                 {x:400, y:300, r:25, dx:1, dy:1}];

    SPEED_x = 2000;
    SPEED_y = 2000;

    function get_time() {
        return new Date().getTime();
    }

    var last_redraw_time = get_time();

    function draw() {
        //здесь перерисовывается содержимое экрана
        //используем значение параметров анимации
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(rectX, rectY, rectWidth, rectHeigth);
        ctx.fillStyle = "white";
        ctx.fillRect(rectX + 1, rectY + 1, rectWidth - 2, rectHeigth - 2);


        for (var i = 0; i < balls.length; i++) {
            ctx.drawImage(ball, sx, 11, 28, 28, balls[i].x, balls[i].y, balls[i].r * 1.4, balls[i].r * 1.4);
        }
    }

    function update_animation_parameters(elapsed_time_sec) {
        //здесь обновляем значение всех анимируемых параметров

        for (var i = 0; i < balls.length; i++) {
            if (balls[i].x > rectX + rectWidth - balls[i].r || balls[i].x < rectX + balls[i].r)
                balls[i].dx = -balls[i].dx;
            if (balls[i].y > rectY + rectHeigth - balls[i].r || balls[i].y < rectY + balls[i].r)
                balls[i].dy = -balls[i].dy;
            balls[i].x += balls[i].dx * elapsed_time_sec * SPEED_x;
            balls[i].y += balls[i].dy * elapsed_time_sec * SPEED_y;
        }

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

        if (sx > 400)
            sx = sx - 400;
        else
            sx += 50;
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