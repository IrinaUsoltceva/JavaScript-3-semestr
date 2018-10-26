function init() {
    console.info("page loaded");
    var stage = new createjs.Stage("game");

    var osnova = new createjs.Shape();
    osnova.graphics
        .beginFill("brown")
        .drawRect(0,0,200,100);
    //osnova.x = 100;
    //osnova.y = 100;
    stage.addChild(osnova);

    var okno = new createjs.Shape();
    okno.graphics
        .beginFill("blue")
        .drawRect(0,0,80,80)
        .endFill()
        .beginStroke("black")
        .setStrokeStyle(4)
        .drawRect(2,2,80,80)
        .moveTo(0,30)
        .lineTo(80,30)
        .moveTo(40,30)
        .lineTo(40,80)
        .moveTo(40,55)
        .lineTo(80,55)
        .endStroke();
    stage.addChild(okno);



/*
    var circle = new createjs.Shape();
    circle.graphics
        .beginFill("red")
        .drawCircle(0, 0, 40);
    circle.x = 100;//координаты круга в контейнере на сцене
    circle.y = 100;//т.е. мы говорим, где в контейнере начало координат у shape
    stage.addChild(circle);

    var triangle = new createjs.Shape();
    triangle.graphics
        .beginFill("green")
        .moveTo(-20, 0)
        .lineTo(20, 0)
        .lineTo(0, -20);
    stage.addChild(triangle);
    triangle.x = 100;
    triangle.y = 100;

    var triangle2 = new createjs.Shape();
    triangle2.graphics
        .beginFill(" blue")
        .moveTo(-20, 0)
        .lineTo(20, 0)
        .lineTo(0, -20);
    stage.addChild(triangle2);
    triangle2.x = 100;
    triangle2.y = 100;
    triangle2.regX = 0; //(0, -20) - это точка в треугольнике - верхняя вершина
    triangle2.regY = -20; //значит,  в контейнере мы будем указывать координаты верхней вершины
    //меняет точку отсчета, она же опорная точка, она же pivot point*/
    stage.update();
}