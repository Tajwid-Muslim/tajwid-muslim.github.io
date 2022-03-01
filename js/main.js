function scene1({stage}){
    var bg = new createjs.Bitmap("/assets/scene1/background.png");
    bg.name = "bg";
    stage.addChild(bg);

    

    stage.scene.update = scene1__update;
}

function scene1__update({stage}){
    var bg = stage.getChildByName('bg');
    
    bg.scale = stage.canvas.clientHeight / 640;

    bg.x = (stage.canvas.width / 2) - (bg.scale * 360 / 2);
}

function scene1__destroy({stage}){
    //
}