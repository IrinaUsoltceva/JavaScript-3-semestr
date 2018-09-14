function init() {
    console.info("page loaded");

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');


    ctx.fillStyle = "red";  //цвета как в CSS. Можно “#FF0000”
                            //Или можно “rgb(255, 0, 0)”,
                            //Или “rgba(rgba(255, 0, 0, 0.5)”
                            // - это полупрозрачный
    ctx.fillRect(0, 0, 100, 100);   //координаты левого верхнего
                                    //угла, и потом высоту и ширину
    ctx.strokeStyle = "blue";
    ctx.strokeRect(10, 10, 100, 100);   //нарисовали прямоугольник
                                        //по границе.

    ctx.clearRect(0, 0, 640, 480) //очистить прямоугольник.

    ctx.beginPath(); //обязательная команда, она говорит, что надо начать новый путь.
                     //Без нее вы продолжите старый путь и будете удивляться тому, что нарисовалось.
    ctx.moveTo(120, 120); //переместить карандаш в такую-то точку
    ctx.lineTo(200, 140); //провести карандаш в точку
    ctx.lineTo(140, 200); //опять провести карандаш
    ctx.closePath(); //провести карандаш в начало путь. Это можно не делать.
    ctx.fill(); //закрасить внутренность. Используется цвет fillStyle
    ctx.stroke(); //используется цвет strokeStyle.

    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI);
    ctx.lineTo(200, 220);
    ctx.bezierCurveTo(210, 210, 240, 240, 250, 270);
    ctx.stroke();

    // Cubic curves example
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fill();

    ctx.clearRect(0, 0, 640, 480)

    for (var i = 0; i < 11; i++) {
        ctx.fillStyle = "rgb(" + 25 * i + ", " + 25 * i + ", " + 25 * i + ")";
        ctx.fillRect(10 + i * 50, 10, 50, 50);
    }

    for (var j = 10; j > 0; j--) {
        for (var i = 0; i < 10; i++) {
            ctx.fillStyle = "rgb(" + 25 * j + ", " + 25 * i + ", " + 25 * i + ")";
            ctx.fillRect(60 + i * 50, 50 + j * 50, 50, 50);
        }
    }

    for (var j = 10; j > 0; j--) {
        for (var i = 0; i < 10; i++) {
            ctx.fillStyle = "rgb(" + 25 * i + ", " + (240  - 25 * j) + ", " + 25 * j + ")";
            ctx.fillRect(60 + i * 50, 50 + j * 50, 50, 50);
        }
    }
    ctx.clearRect(0, 0, 640, 480);

//Анимация
    var x = 0;
    function draw() {
        ctx.clearRect(0, 0, 640, 480);
        ctx.fillStyle = "blue";
        ctx.fillRect(x, 10, 100, 100);
        x = x + 1;
    }
    setInterval(draw, 500 / 60);

}