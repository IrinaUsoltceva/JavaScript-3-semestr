function init() {
    console.info("page loaded");
    var stage = new createjs.Stage("game");

    var osnova = new createjs.Shape();
    osnova.graphics
        .beginFill("brown")
        .drawRect(0,0,200,100);
    osnova.y = 100;

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
    okno.regX = 40; //pivot point
    okno.regY = 40;
    okno.x = 50; //где в контейнере
    okno.y = 150;

    var truba = new createjs.Shape();
    truba.graphics
        .beginFill("blue")
        .drawRect(150,10,40,90);

    var krisha = new createjs.Shape();
    krisha.graphics
        .beginFill("green")
        .moveTo(0, 100)
        .lineTo(200,100)
        .lineTo(100,0);

    var domic = new createjs.Container();
    domic.addChild(osnova, okno, truba, krisha);
    stage.addChild(domic);
    domic.regX = 100;
    domic.regY = 100;
    domic.x = 100;
    domic.y = 100;
    stage.update();

    var domic2 = domic.clone(true);
    domic2.regX = 100;
    domic2.regY = 100;
    domic2.x = 310;
    domic2.y = 100;

    var domic3 = domic.clone(true);
    domic3.regX = 100;
    domic3.regY = 100;
    domic3.x = 520;
    domic3.y = 100;

    stage.addChild(domic, domic2, domic3);
    stage.update();
}