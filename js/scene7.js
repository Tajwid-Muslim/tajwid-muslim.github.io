function scene7(){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();
    createjs.Touch.enable(stage);

    // ##### ASSET CREATION ##########################################

    var bg = new createjs.Bitmap("assets/scene2/background.png");
    bg.name = "bg";
    stage.addChild(bg);

    var close = new createjs.Bitmap("assets/scene2/back.png");
    close.name = 'close';
    close.scale = 0.5;
    close.setTransform(16,16,0.5,0.5);
    close.addEventListener('click', function(e){
        stop();
        stage.canvas = null;
        window.stage = scene1();
    });
    stage.addChild(close);

    var paper = new createjs.Bitmap("assets/scene2/paper.png");
    paper.regX = 300 / 2;
    paper.regY = (448 + 28) / 2;
    paper.x = scalingWidth(stage) / 2;
    paper.y = 640 / 2;
    paper.name = "bg";
    stage.addChild(paper);

    var arr = [
        new createjs.Bitmap("assets/scene7/page1.png"),
        new createjs.Bitmap("assets/scene7/page2.png"),
        new createjs.Bitmap("assets/scene7/page3.png"),
        new createjs.Bitmap("assets/scene7/page4.png")
    ];

    for(i=0; i<arr.length; i++){
        arr[i].regX = 280 / 2;
        arr[i].x = scalingWidth(stage) / 2;
        arr[i].y = 640 / 2;
        arr[i].name = `page${i}`;
        arr[i].visible = false;
        ((j)=>{
            arr[j].image.addEventListener("load", function(e){
                arr[j].regY = arr[j].getBounds().height / 2;
            });
        })(i)
        stage.addChild(arr[i]);
    }

    var i = 0;
    arr[i].visible = true;

    var btnBack = ButtonWood('Balik', 0);
    btnBack.name = 'back';
    btnBack.regX = 0;
    btnBack.regY = 0;
    btnBack.x = 32;
    btnBack.y = 448 + 92;
    btnBack.scale = 0.7;
    btnBack.addEventListener('click', function(e){
        arr[i--].visible = false;
        arr[i < 0 ? (i=arr.length-1) : i].visible = true;
    });
    stage.addChild(btnBack);

    var btnNext = ButtonWood('Lanjut', 0);
    btnNext.name = 'next';
    btnNext.regX = 183;
    btnNext.regY = 0;
    btnNext.x = scalingWidth(stage) - 32;
    btnNext.y = 448 + 92;
    btnNext.scale = 0.7;
    btnNext.addEventListener('click', function(e){
        arr[i++].visible = false;
        arr[i >= arr.length ? (i=0) : i].visible = true;
    });
    stage.addChild(btnNext);

    // ##### ACTION REGISTER #########################################

    createjs.Ticker.addEventListener("tick", update);

    function update(e){
        updateResolution(stage);
        stage.scale = stage.canvas.height / 640;

        ///
    
        stage.update();
    }

    function stop(){
        createjs.Ticker.removeEventListener("tick", update);
        stage.enableDOMEvents(false);
        stage.enableMouseOver(false);
        createjs.Touch.disable(stage);
    }

    return {
        stage,
        update,
        stop,
        throwBall,
        ball
    };
}