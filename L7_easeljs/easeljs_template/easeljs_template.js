function init() {
    console.info("page loaded");
    var stage = new createjs.Stage("game");
    //указываем id для canvas
    /* stage - это сцена, на которой расположены все объекты
    какие объекты можно располагать на сцене
    * text - объекты с текстом, настраивать текст, шрифт
    * Shape - статичные рисунки, на которых может быть нарисовано то же,
    *         что на canvas, линии, круги, прямоугольники
    * Sprite - анимированное изображение, настраивается через SpriteSheets
    * Bitmap - это картинки <img>, другие canvas или даже <video>
    * Container - контнейнер для элементов, на нем тоже могут быть Shape,
    *            Sprite, Bitmap, Text и другие контейнеры
    *
    *всё это - DisplayObject, объекты, которые можно располагать на сцене.
    * У них у всех есть размеры (высота, ширина), координаты (где они находятся)
    * и трансформации (сжатия, растяжения, повороты)
     */

    //НАчнем с создания Shape:
    var circle = new createjs.Shape();
    //после создания шэйп пустой, на нем ничего не нарисовано. А мы хотим кружок
    var g = circle.graphics; //graphics - это холст, на нем можно рисовать. мохоже на ctx

    g
        .beginFill("red")
        .drawCircle(0, 0, 40); //рисуем закрашенный круг в 0,0
    //координаты в shape
    //это назвается flow-стиль

    circle.x = 100;//координаты круга в контейнере на сцене
    circle.y = 100;//т.е. мы говорим, где в контейнере начало координат у shape

    //надо добавить на сцену обхект, иначе не увидим
    stage.addChild(circle);

    //добавим на сцену еще шэйп, пусть это будет треугольник
    var triangle = new createjs.Shape();
    triangle.graphics
        .beginFill("green")
        .moveTo(-20,0)
        .lineTo(20,0)
        .lineTo(0,-20);
    //все методы туть:
    //http://www.createjs.com/docs/easeljs/classes/Graphics.html

    stage.addChild(triangle);
    triangle.x = 100;
    triangle.y = 100;

    //когда мы указали x,y, для треугольника,  мы дали координаты для центра его,
    //в нашем случае - середина основания

    //сделаем еще один такой треугольник, но будем располагать по-другому
    var triangle2 = new createjs.Shape();
    triangle2.graphics
        .beginFill(" blue")
        .moveTo(-20,0)
        .lineTo(20,0)
        .lineTo(0,-20);

    stage.addChild(triangle2);
    triangle2.x = 100;
    triangle2.y = 100;
    triangle2.regX = 0; //(0, -20) - это точка в треугольнике - верхняя вершина
    triangle2.regY = -20; //значит,  в контейнере мы будем указывать координаты верхней вершины
    //меняет точку отсчета, она же опорная точка, она же pivot point

    //добавим bitmap для примера
    var img = new createjs.Bitmap("cat.jpg");
    stage.addChild(img);


    //обновить stage
    stage.update(); //хдесь скорее всего не успееет загрузиться, поэтому сделаем апдейт через 2сек

    setTimeout(function () {
        //узнаем размер картинки, когда она загрузится
        //это универсальный метод для любого объекта на сцене
        var rect = img.getBounds();
        //rect.width  - ширина

        img.scaleX = 50 / rect.width;
        img.scaleY = 50 / rect.height;
        img.x = 100;
        img.y = 100;
        stage.update();

    }, 2000);

    //это таймер, один классс на всю программу
    //его не надо создавать, он уже есть
    createjs.Ticker
        .addEventListener("tick", stage);
    //мы добавили сцену как слушателя "tick", это событие срабатывает 60 раз в секунду
    //т.е. апдэйт теперь не нужен
    //теперь все объекты на сцене тоже получают событие tick
    //по этому событию можно анимировать объекты

    img.addEventListener("tick", function () {
        img.x += 1;
        img.y += 1;
    });

    //нет большой разницы, на какое событие повесить событие тик
    //можно было бы на тот же треугольник, но логично действие про картинку повесить на картинку

    //скорость анимации
    createjs.Ticker.framerate = 60; //60 в секунду
    createjs.Ticker.interval = 20; // 20 мс между срабатываниями (50 раз в сек)
    //режим
    createjs.Ticker.timerMode = createjs.Ticker.RAF_SYNCHED;
    //RAF = requestAnimationFrame, это как мы делали. Но в этом режиме неьлзя настраивать скорость
    //RAF_SYCHED - это тоже reqestAnimationFrame, но с попыткой
    //синхронизировать скорость срабатываеия с указаной
    //TIMEOUT -
}