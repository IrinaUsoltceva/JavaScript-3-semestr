function init() {
    console.info("page loaded");

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    var aImg = document.getElementById("a-img");

    ctx.drawImage(aImg, 150, 125, 300, 200, 10, 70, 620, 500);

    //drawImage(aImg,  sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}