function init() {
    console.info("page loaded");

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    var ball = document.getElementById("ball");

    var rectWidth = 560;
    var rectHeigth = 480;
    var rectX = 40;
    var rectY = 80;

    //drawImage(aImg, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    //заведем параметры анимации
    var sx = 11;

    function get_time() {
        return new Date().getTime();
    }

    var last_redraw_time = get_time();


    function draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(rectX, rectY, rectWidth, rectHeigth);
        //здесь перерисовывается содержимое экрана
        //используем значение параметров анимации
        ctx.drawImage(ball, sx, 11, 28, 28, 290, 290, 60, 60);
    }

    function update_animation_parameters(elapsed_time_sec, current_time) {
        //здесь обновляем значение всех анимируемых параметров
        //var frame_index = Math.floor((get_time() - animation_start_time) * FPS) % num_frames;

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

        update_animation_parameters(elapsed_time / 1000, current_time / 1000);
        draw();
    }

    requestAnimationFrame(animation_step);
}