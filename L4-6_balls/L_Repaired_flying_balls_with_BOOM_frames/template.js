function init() {
    console.info("page loaded");
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');

    canvas.onclick = function (event) {
        clickBall(event.offsetX, event.offsetY);
    };

    var ball = document.getElementById('ball');

//создание поля
    var rectWidth = 560;
    var rectHeight = 480;
    var rectX = 40;
    var rectY = 80;
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

//завод параметров анимации
    //sx - где по х находится мяч на картинке с мячами
    //sy - где по у на картинке находится мяч
    //sWidth - ширина и высота мяча на картинке с мячами
    //sHeight
    //dFrame - расстояние между мячами на картинке (от левого угла до левого угла)
    //numFrame - сколько всего кадров
    //FPS

    var startOfAllAnimation = get_time();
    var current_time = startOfAllAnimation;

    var animation_rotate = {sx:11, sy:11, sWidth:28, sHeight:28,
                            dFrame:50, numFrame:10, FPS:6};
    var animation_explode = {sx:0, sy:50, sWidth:50, sHeight:50,
                            dFrame:50, numFrame:10, FPS:6}; //тут сменить что где

    var balls = [{x:100, y:140, r:35, dx:1, dy:1, anim:animation_rotate,
                animation_start_time:startOfAllAnimation, last_redraw_time:startOfAllAnimation,
                elapsed_time:0, frame_index:0},
                 {x:80, y:400, r:30, dx:1, dy:1, anim:animation_rotate,
                 animation_start_time:startOfAllAnimation, last_redraw_time:startOfAllAnimation,
                 elapsed_time:0, frame_index:0}];

    var SPEED_x = 50; // скороксть пикселей в секунду
    var SPEED_y = 50; // скорость пикселей в секунду

//дает время от начала эпохи
    function get_time() {
        return new Date().getTime();
    }

//перерисовать содержимое экрана
    function draw() {
         ctx.clearRect(0, 0, canvas.width, canvas.height);

         for (var i = 0; i < balls.length; i++) {
             ctx.drawImage(ball, balls[i].anim.sx, balls[i].anim.sy, balls[i].anim.sWidth, balls[i].anim.sHeight,
                 balls[i].x - balls[i].r, balls[i].y - balls[i].r, // где по х левый верхний угол, где по y левый верхний угол
                 balls[i].r * 2, balls[i].r * 2);                  //dWidth ширина, dHeight высота, 2r
         }

        ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
    }

//клик
    function clickBall(offsetX, offsetY) {
        console.log('clicked');

        var ballDeleted = false;
        for (var i = 0; i < balls.length; i++)
            if (balls[i].x - balls[i].r - 20 < offsetX && offsetX < balls[i].x + balls[i].r + 20 &&
                balls[i].y - balls[i].r - 20 < offsetY && offsetY < balls[i].y + balls[i].r + 20) {
                balls[i].anim = animation_explode;
                ballDeleted = true;
            }

        if (!ballDeleted) {
            var ball_created_time = get_time();
            balls.push({x: offsetX, y: offsetY, r: 30, dx: 1, dy: 1, anim:animation_rotate,
                        animation_start_time:ball_created_time, last_redraw_time:ball_created_time,
                        elapsed_time:0, frame_index:0});
            console.log('создался мяч:' + balls.length);
        }
    }


//обновить значение всех анимируемых параметров
    function update_animation_parameters() {
    //для каждого мяча
        for (i = 0; i < balls.length; i++) {

            //проверяет, не коснулся ли стенок по х или у
            /*if (balls[i].x >= rectX + rectWidth - balls[i].r || balls[i].x <= rectX + balls[i].r)
                balls[i].dx = -balls[i].dx;*/
            /*if (balls[i].y >= rectY + rectHeight - balls[i].r || balls[i].y <= rectY + balls[i].r)
                balls[i].dy = -balls[i].dy;*/
            var delta;

            if (balls[i].x >= rectX + rectWidth - balls[i].r) {
                delta = balls[i].x - (rectX + rectWidth - balls[i].r);
                balls[i].x -= 2 * delta;
                balls[i].dx = -balls[i].dx;
            }

            if (balls[i].x <= rectX + balls[i].r) {
                delta = (rectX + balls[i].r) - balls[i].x;
                balls[i].x += 2 * delta;
                balls[i].dx = -balls[i].dx;
            }

            if (balls[i].y >= rectY + rectHeight - balls[i].r) {
                delta = balls[i].y - (rectY + rectHeight - balls[i].r);
                balls[i].y -= 2 * delta;
                balls[i].dy = -balls[i].dy;
            }

            if (balls[i].y <= rectY + balls[i].r) {
                delta = (rectY + balls[i].r) - balls[i].y;
                balls[i].y += 2 * delta;
                balls[i].dy = -balls[i].dy;
            }

            //проверяет среди оставшихся непроверенных мячей
            for (var j = i + 1; j < balls.length; j++)
                //если (r1 + r2)^2 > ((x1 - x2)^2 + (y1-y2)^2)
                //иными словами, если сумма радиусов больше, чем расстояние между центрами
                //значит, мячи столкнулись, и их надо направить в разные стороны
                if ((balls[i].r + balls[j].r) * (balls[i].r + balls[j].r) >=
                    (balls[i].x - balls[j].x) * (balls[i].x - balls[j].x) +
                    (balls[i].y - balls[j].y) * (balls[i].y - balls[j].y)) {

                    balls[i].dx = -balls[i].dx;
                    balls[i].dy = -balls[i].dy;
                    balls[j].dx = -balls[j].dx;
                    balls[j].dy = -balls[j].dy;
                }

            //изменяет местоположение
            balls[i].x += balls[i].dx * balls[i].elapsed_time * SPEED_x;
            //точка х += направление по х * прошедшее время в сек * скорость px/сек
            balls[i].y += balls[i].dy * balls[i].elapsed_time * SPEED_y;
        }


    //изменяет кадр
        //frame_index = (frame_index + 1) % numFrame;
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].anim === animation_explode && balls[i].frame_index === balls[i].anim.numFrame - 1) {
                balls.splice(i, 1);
                console.log('удалился мяч:' + balls.length);
            }
            else {
                balls[i].frame_index = Math.floor((current_time - balls[i].animation_start_time)
                    / 1000 * balls[i].anim.FPS) % balls[i].anim.numFrame;
                balls[i].anim.sx = 11 + (balls[i].frame_index) * balls[i].anim.dFrame;
            }
        }

    }

//эта функция должна постоянно вызываться
    function animation_step() {

        requestAnimationFrame(animation_step);

        current_time = get_time();
        for (var i = 0; i < balls.length; i++) {
            balls[i].elapsed_time = (current_time - balls[i].last_redraw_time) / 1000; //высчитывает, сколько прошло милисек
            balls[i].last_redraw_time = current_time;

            if (balls[i].elapsed_time > 1000) //если нас не было на странице больше 100 милисек,
                balls[i].elapsed_time = 1; //то будет считать, что нас не было ровно 100 милисек
        }
        update_animation_parameters();
        draw();
    }

    requestAnimationFrame(animation_step);
}