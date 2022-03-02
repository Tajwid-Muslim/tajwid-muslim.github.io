function scene1(){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();

    // ##### ASSET CREATION ###########################################

    var bg = new createjs.Bitmap("/assets/scene1/background.png");
    bg.name = "bg";
    stage.addChild(bg);

    var wood = new createjs.Shape();
    wood.name = 'wood';
    wood.graphics.setStrokeStyle(4).beginStroke("#FFFFFF")
                 .beginFill('#563232').drawRoundRect(0,0,30,325,8);
    wood.rotation = 4;
    stage.addChild(wood);

    var btnMainkan = ButtonWood('Mainkan', -2);
    btnMainkan.name = 'mainkan';
    stage.addChild(btnMainkan);

    var btnBuku = ButtonWood('Buku', 2);
    btnBuku.name = 'buku';
    stage.addChild(btnBuku);

    var btnKeluar = ButtonWood('Keluar', -2);
    btnKeluar.name = 'Keluar';
    stage.addChild(btnKeluar);

    // ##### ACTION REGISTER #########################################

    createjs.Ticker.addEventListener("tick", update);

    function update(){
        updateResolution(stage);

        bg.scale = stage.canvas.height / 640;
        bg.x = (stage.canvas.width / 2) - (bg.scale * 360 / 2);

        var wood_w = 30 * bg.scaleX;
        var wood_h = 325 * bg.scaleX;
        wood.setTransform((stage.canvas.width - wood_w) / 2,
                           stage.canvas.height - wood_h + (40 * bg.scale),
                           bg.scaleX, bg.scaleY, wood.rotation);

        btnMainkan.setTransform((stage.canvas.width - (203 * bg.scale)) / 2,
                             stage.canvas.height - wood_h + (80 * bg.scale),
                             bg.scale, bg.scale, btnMainkan.rotation, 0, 0,
                             btnMainkan.regX, btnMainkan.regY);
        
        btnBuku.setTransform((stage.canvas.width - (203 * bg.scale)) / 2,
                             stage.canvas.height - wood_h + (150 * bg.scale),
                             bg.scale, bg.scale, btnBuku.rotation, 0, 0,
                             btnBuku.regX, btnBuku.regY);

        btnKeluar.setTransform((stage.canvas.width - (203 * bg.scale)) / 2,
                             stage.canvas.height - wood_h + (235 * bg.scale),
                             bg.scale, bg.scale, btnKeluar.rotation, 0, 0,
                             btnKeluar.regX, btnKeluar.regY);

        stage.update();
    }

    function stop(){
        createjs.Ticker.removeEventListener("tick", update);
    }

    return {
        stage,
        update,
        stop
    };
}