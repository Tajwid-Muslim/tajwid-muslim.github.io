function ButtonWood(label, rotation){
    var con = new createjs.Container();
    
    var text = new createjs.Text(label, "bold 32px 'Comic Neue'", "#ffffff");
    var bounds = text.getBounds();
    text.name = 'label';

    var wood = new createjs.Shape();
    wood.name = 'wood';
    wood.graphics.setStrokeStyle(4).beginStroke("#FFFFFF")
                 .beginFill('#563232').drawRoundRect(0,0,183,59,8);
    
    con.addChild(wood, text);
    con.rotation = rotation;
    con.regX = 183/2;
    con.regY = 59/2;

    con.updateLabel = function(label){
        text.text = label;
        text.setTransform((183 - bounds.width + 5) / 2, (59 - bounds.height + 5) / 2);
    }

    function rot0(e){
        con.rotation = 0;
    }

    function rot(e){
        con.rotation = rotation;
    }

    con.updateLabel(label);

    con.addEventListener('mouseover', rot0);
    con.addEventListener('mousedown', rot0);
    con.addEventListener('mouseout', rot);
    
    return con;
}

function scene1_mainkan(){
    var conMainkan = new createjs.Container();

    var bgMainkan = new createjs.Shape();
    bgMainkan.graphics.beginFill("rgba(255,255,255,0.5)").drawRect(0,0,360,640);
    conMainkan.addChild(bgMainkan);

    var close = new createjs.Bitmap("assets/scene1/close.png");
    close.name = 'close';
    close.setTransform(16,16,0.5,0.5);
    close.addEventListener('click', function(e){
        conMainkan.parent.removeChild(conMainkan);
    });
    conMainkan.addChild(close);

    return conMainkan;
}

function scene1(stages){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();

    // ##### ASSET CREATION ###########################################

    var bg = new createjs.Bitmap("assets/scene1/background.png");
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
    btnMainkan.addEventListener('click', function(e){
        var conMainkan = scene1_mainkan();
        conMainkan.name = 'stage_mainkan';
        conMainkan.scale = bg.scale;
        stage.addChild(conMainkan);
    });
    stage.addChild(btnMainkan);

    var btnBuku = ButtonWood('Buku', 2);
    btnBuku.name = 'buku';
    btnBuku.addEventListener('click', function(e){
        stop();
        stage.removeAllChildren();
        // stage.clear();
        // stage.visible = false;
        window.stage = scene2();
    });
    stage.addChild(btnBuku);

    var btnKeluar = ButtonWood('Keluar', -2);
    btnKeluar.name = 'keluar';
    btnKeluar.addEventListener('click', window.close);
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

        btnMainkan.setTransform((stage.canvas.width - (20 * bg.scale)) / 2,
                             stage.canvas.height - wood_h + (100 * bg.scale),
                             bg.scale, bg.scale, btnMainkan.rotation, 0, 0,
                             btnMainkan.regX, btnMainkan.regY);
        
        btnBuku.setTransform((stage.canvas.width - (20 * bg.scale)) / 2,
                             stage.canvas.height - wood_h + (175 * bg.scale),
                             bg.scale, bg.scale, btnBuku.rotation, 0, 0,
                             btnBuku.regX, btnBuku.regY);

        btnKeluar.setTransform((stage.canvas.width - (20 * bg.scale)) / 2,
                             stage.canvas.height - wood_h + (250 * bg.scale),
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