function init() {
    console.info("page loaded");
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');

//создание поля
    var rectWidth = 560;
    var rectHeight = 480;
    var rectX = 40;
    var rectY = 80;
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);


//завод параметров анимации
    var balls = [{x:100, y:140, r:35, dx:1, dy:1},
                 {x:80, y:400, r:30, dx:1, dy:1},
                 {x:400, y:300, r:25, dx:1, dy:1}]


//перерисовать содержимое экрана
    function draw() {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

         for (var i = 0; i < balls.length; i++) {
             ctx.beginPath();
             ctx.arc(balls[i].x, balls[i].y, balls[i].r, 0, 180);
             ctx.stroke();
         }
    }

//обновить значение всех анимируемых параметров
    function update_animation_parameters() {
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].x > rectX + rectWidth - balls[i].r || balls[i].x < rectX + balls[i].r)
                balls[i].dx = -balls[i].dx;
            if (balls[i].y > rectY + rectHeight - balls[i].r || balls[i].y < rectY + balls[i].r)
                balls[i].dy = -balls[i].dy;
            balls[i].x += balls[i].dx * 3;
            balls[i].y += balls[i].dy * 3;
        }

    }


//эта функция должна постоянно вызываться
    function animation_step() {

        requestAnimationFrame(animation_step);

        update_animation_parameters();
        draw();
    }


    requestAnimationFrame(animation_step);
}