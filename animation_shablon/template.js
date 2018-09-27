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


    function get_time() {
        return new Date().getTime();
    }

    var last_redraw_time = get_time();

    function draw() {
        //здесь перерисовывается содержимое экрана
        //используем значение параметров анимации

    }

    function update_animation_parameters(elapsed_time_sec) {
        //здесь обновляем значение всех анимируемых параметров

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