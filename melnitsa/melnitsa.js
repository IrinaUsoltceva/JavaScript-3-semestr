function init() {
    console.info("page loaded");
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');


    //дает время от начала эпохи
    function get_time() {
            return new Date().getTime();
        }
    var animation_start_time = get_time();
    var last_redraw_time = animation_start_time;

    //создание поля
    var rectWidth = 560;
    var rectHeight = 480;
    var rectX = 40;
    var rectY = 80;
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

//завод параметров анимации
    var a = 0;
    var r = 20;
    var L = 80;
    var R = 200;
    var GPS = 10;

//перерисовать содержимое экрана
    function draw() {
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

        ctx.translate(320, 300);

        for (var i = 0; i < 12; i++) {
            ctx.save();
            ctx.rotate(a + i * 2 * Math.PI / 12);
            drawLopast(R);
            ctx.translate(0, R);
            ctx.rotate(- (a + i * 2 * Math.PI / 12));
            drawRope();
            ctx.translate(0, L);
            ctx.rotate(a * 20);
            draw12Sticks();
            ctx.restore();
        }

        ctx.restore();
    }

//рисуем одну палочку
    function drawOneStick() {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(0, 0); //переместить карандаш в такую-то точку
        ctx.lineTo(0, r); //провести карандаш в точку
        ctx.stroke();

        ctx.restore();
    }

//рисуем 12 палочек
    function draw12Sticks() {
        ctx.save();
        for (var i = 0; i < 12; i++) {
            drawOneStick(r);
            ctx.rotate(Math.PI / 6);
        }
        ctx.restore();
    }

//рисуем веревку
    function drawRope() {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(0, 0); //переместить карандаш в такую-то точку
        ctx.lineTo(0, L); //провести карандаш в точку
        ctx.stroke();

        ctx.restore();
    }

//рисуем лопасть
    function drawLopast() {
        ctx.save();

        ctx.beginPath();
        ctx.strokeStyle = "rgb(" + Math.floor((255 - 42.5 * a) % 255) + "," +
                                   Math.floor((255 - 42.5 * a) % 255) + ",0)";
        ctx.moveTo(0, 0); //переместить карандаш в такую-то точку
        ctx.lineTo(0, R); //провести карандаш в точку
        ctx.stroke();
        ctx.restore();
    }

//обновить значение всех анимируемых параметров
    function update_animation_parameters(elapsed_time) {
        a += (GPS * Math.PI / 180) * elapsed_time;
    }


//эта функция должна постоянно вызываться
    function animation_step() {

        requestAnimationFrame(animation_step);

        var current_time = get_time();
        var elapsed_time = current_time - last_redraw_time; //высчитывает, сколько прошло милисек
        last_redraw_time = current_time;

        if (elapsed_time > 1000) //если нас не было на странице больше 100 милисек,
            elapsed_time = 0; //то будет считать, что нас не было ровно 100 милисек

        update_animation_parameters(elapsed_time / 1000); //отправляем прошедшее время в сек
        draw();
    }


    requestAnimationFrame(animation_step);
}