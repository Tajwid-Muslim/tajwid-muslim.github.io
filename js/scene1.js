function scene1_mainkan_game(label, image){
    var conImg = new createjs.Container();

    var icon = new createjs.Bitmap(image);
    icon.name = "icon";

    var text = new createjs.Text(label, "bold 56px 'Comic Neue'", "#000000");
    var bounds = text.getBounds();
    text.name = 'label';
    text.regX = bounds.width / 2;
    text.x = 300 / 2;
    text.y = 300 + 16;

    conImg.addChild(icon, text);

    return conImg;
}

function scene1_mainkan({stage, stop}){
    var conMainkan = new createjs.Container();
    conMainkan.addEventListener('click', (e)=>{});
    conMainkan.addEventListener('mouseover', (e)=>{});
    conMainkan.addEventListener('mousedown', (e)=>{});
    conMainkan.addEventListener('mouseout', (e)=>{});

    var bgMainkan = new createjs.Shape();
    bgMainkan.graphics.beginFill("rgba(255,255,255,0.5)").drawRect(0,0,360,640);
    conMainkan.addChild(bgMainkan);

    var close = new createjs.Bitmap("assets/close.png");
    close.name = 'close';
    close.setTransform(16,16,0.5,0.5);
    close.addEventListener('click', function(e){
        conMainkan.parent.removeChild(conMainkan);
    });
    conMainkan.addChild(close);

    var conGames = new createjs.Container();
    conGames.name = 'container';
    conGames.regX = 
    conGames.regY = (300 + 96) * 0.3;
    conGames.x = 360 / 2;
    conGames.y = 640 / 2;
    conMainkan.addChild(conGames);

    var btnTamuDrop = scene1_mainkan_game('Tamu Drop', 'assets/scene1/TamuDrop.png');
    btnTamuDrop.scale = 0.3;
    btnTamuDrop.addEventListener('click', function(e){
        stop();
        stage.enableDOMEvents(false);
        stage.enableMouseOver(false);
        stage.canvas = null;
        window.stage = scene3();
    });

    var btnConnect = scene1_mainkan_game('Connect', 'assets/scene1/Connect.png');
    btnConnect.scale = 0.3;
    btnConnect.x = (300 + 96) * 0.3;
    btnConnect.addEventListener('click', function(e){
        stop();
        stage.enableDOMEvents(false);
        stage.canvas = null;
        window.stage = scene4();
    });

    var btnCatJump = scene1_mainkan_game('Cat Jump', 'assets/scene1/CatJump.png');
    btnCatJump.scale = 0.3;
    btnCatJump.y = (300 + 96) * 0.3;

    var btnGoalQuest = scene1_mainkan_game('Goal Quest', 'assets/scene1/GoalQuest.png');
    btnGoalQuest.scale = 0.3;
    btnGoalQuest.x = (300 + 96) * 0.3;
    btnGoalQuest.y = (300 + 96) * 0.3;

    conGames.addChild(btnTamuDrop, btnConnect, btnCatJump, btnGoalQuest);

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
        var conMainkan = scene1_mainkan({stop, stage});
        conMainkan.name = 'stage_mainkan';
        conMainkan.scale = bg.scale;
        stage.addChild(conMainkan);
    });
    stage.addChild(btnMainkan);

    var btnBuku = ButtonWood('Buku', 2);
    btnBuku.name = 'buku';
    btnBuku.addEventListener('click', function(e){
        stop();
        stage.enableDOMEvents(false);
        stage.canvas = null;
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