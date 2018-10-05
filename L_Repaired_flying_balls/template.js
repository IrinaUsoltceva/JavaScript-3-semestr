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
    var balls = [{x:100, y:140, r:35, dx:1, dy:1}, //dx dy отвечает за направление
                 {x:80, y:400, r:30, dx:1, dy:1},  //полета, могут быть +-1
                 {x:400, y:300, r:25, dx:1, dy:1}]

    /*var balls = [{x:100, y:140, r:35, dx:1, dy:1},
                 {x:80, y:400, r:30, dx:1, dy:1},
                 {x:400, y:300, r:25, angle:180, dx:Math.cos(this.angle), dy:Math.sin(this.angle)}]*/

    SPEED_x = 100; // скороксть пикселей в секунду
    SPEED_y = 100; // скорость пикселей в секунду

//задание параметров для картинки
    var sx = 11; //где по х находится мяч на картинке с мячами - меняется
    var sy = 11; //где по у на картинке находится мяч - стабильно
    var sWidth = 28; //ширина и высота мяча на картинке с мячами
    var sHeight = 28;

    var dFrame = 50; //расстояние между мячами на картинке (от левого угла до левого угла)
    var numFrame = 10; //сколько всего кадров
    var frame_index = 0;
    FPS = 30;

//дает время от начала эпохи
    function get_time() {
        return new Date().getTime();
    }

    var animation_start_time = get_time();
    var last_redraw_time = animation_start_time;

//рисуем все в первый раз
    for (var i = 0; i < balls.length; i++)
        ctx.drawImage(ball, sx, sy, sWidth, sHeight,
           balls[i].x - balls[i].r, balls[i].y - balls[i].r, // где по х левый верхний угол, где по y левый верхний угол
           balls[i].r * 2, balls[i].r * 2);                  //dWidth ширина, dHeight высота, 2r

//перерисовать содержимое экрана
    function draw() {
         ctx.clearRect(0, 0, canvas.width, canvas.height);

         //была арка  в виде круга, теперь вместо нее картинка
         /*for (var i = 0; i < balls.length; i++) {
             ctx.beginPath();
             ctx.arc(balls[i].x, balls[i].y, balls[i].r, 0, 180);
             ctx.stroke();
         }*/
         for (var i = 0; i < balls.length; i++)
            ctx.drawImage(ball, sx, sy, sWidth, sHeight,
                           balls[i].x - balls[i].r, balls[i].y - balls[i].r, // где по х левый верхний угол, где по y левый верхний угол
                           balls[i].r * 2, balls[i].r * 2);                  //dWidth ширина, dHeight высота, 2r

        ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
    }

//обновить значение всех анимируемых параметров
    function update_animation_parameters(elapsed_time, current_time) {
    //для каждого мяча
        for (var i = 0; i < balls.length; i++) {
            //проверяет, не коснулся ли стенок по х или у
            if (balls[i].x > rectX + rectWidth - balls[i].r || balls[i].x < rectX + balls[i].r)
                balls[i].dx = -balls[i].dx;
            if (balls[i].y > rectY + rectHeight - balls[i].r || balls[i].y < rectY + balls[i].r)
                balls[i].dy = -balls[i].dy;
        }

    //для каждого мяча
        for (var i = 0; i < balls.length; i++)
            //проверяет среди оставшихся непроверенных мячей
            for (var j = i + 1; j < balls.length; j++)
                //если (r1 + r2)^2 > ((x1 - x2)^2 + (y1-y2)^2)
                //иными словами, если сумма радиусов больше, чем расстояние между центрами
                //значит, мячи столкнулись, и их надо направить в разные стороны
                if ((balls[i].r + balls[j].r) * (balls[i].r + balls[j].r) >
                    (balls[i].x - balls[j].x) * (balls[i].x - balls[j].x) +
                    (balls[i].y - balls[j].y) * (balls[i].y - balls[j].y)) {

                    balls[i].dx = -balls[i].dx;
                    balls[i].dy = -balls[i].dy;
                    balls[j].dx = -balls[j].dx;
                    balls[j].dy = -balls[j].dy;
                }

    //для каждого мяча
        for (var i = 0; i < balls.length; i++) {
            //изменяет местоположение
            balls[i].x += balls[i].dx * elapsed_time * SPEED_x;
            //точка х += направление по х * прошедшее время в сек * скорость px/сек
            balls[i].y += balls[i].dy * elapsed_time * SPEED_y;
        }

    //изменяет кадр
        //frame_index = (frame_index + 1) % numFrame; //работает
        //не работает
        frame_index = Math.floor((current_time - animation_start_time) / 1000 * FPS) % numFrame;


        //изменяет картинку в соответствии с кадром
        sx = 11 + (frame_index) * dFrame;

    }


//эта функция должна постоянно вызываться
    function animation_step() {

        requestAnimationFrame(animation_step);

        var current_time = get_time();
        var elapsed_time = current_time - last_redraw_time; //высчитывает, сколько прошло милисек
        last_redraw_time = current_time;

        if (elapsed_time > 100) //если нас не было на странице больше 100 милисек,
            elapsed_time = 100; //то будет считать, что нас не было ровно 100 милисек

        update_animation_parameters(elapsed_time / 1000, current_time); //отправляем прошедшее время в милисек
        draw();
    }


    requestAnimationFrame(animation_step);
}