function ButtonColor(label, color){
    var con = new createjs.Container();

    var text = new createjs.Text(label, "bold 24px 'Comic Neue'", "#ffffff");
    text.name = 'label';

    var bg = new createjs.Shape();
    bg.name = 'bg';
    bg.graphics.setStrokeStyle(4).beginFill(color)
                 .drawRect(0,0,248,56);

    con.addChild(bg, text);
    // con.regX = 248/2;
    // con.regY = 56/2;

    con.updateLabel = function(label){
        text.text = label;
        var bounds = text.getBounds();
        text.setTransform((248 - bounds.width + 5) / 2, (56 - bounds.height + 5) / 2);
    }

    con.updateLabel(label);

    return con;
}

function scene2(){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();

    // ##### ASSET CREATION ##########################################

    var bg = new createjs.Bitmap("/assets/scene2/background.png");
    bg.name = "bg";
    stage.addChild(bg);

    var conBtn = new createjs.Container();
    conBtn.name = 'buttons';
    conBtn.regX = 248 / 2;
    conBtn.regY = ((56 * 6) + (56 / 2)) / 2;

    var btnIdzhar = ButtonColor("Idzhar", "#7ED958");
    var btnIdBigunnah = ButtonColor("Idgham Bigunnah", "#AD4516");
    var btnIdBilagunnah = ButtonColor("Idgham Bilagunnah", "#FE9E02");
    var btnIqlab = ButtonColor("Iqlab", "#2980B9");
    var btnIkhfa = ButtonColor("Ikhfa", "#8E44AD");
    var btnKembali = ButtonWood("Kembali", 0);
    btnIdBigunnah.y = 56;
    btnIdBilagunnah.y = 56 * 2;
    btnIqlab.y = 56 * 3;
    btnIkhfa.y = 56 * 4;

    btnKembali.regY = 0;
    btnKembali.y = (56 * 5) + (56 / 2);
    btnKembali.x = (248 + 5) / 2;
    btnKembali.scale = 0.8;
    btnKembali.addEventListener('click', function(e){
        stop();
        stage.removeAllChildren();
        // stage.clear();
        window.stage = scene1();
    });
    
    conBtn.addChild(btnIdzhar, btnIdBigunnah, btnIdBilagunnah, btnIqlab, btnIkhfa, btnKembali);
    stage.addChild(conBtn);

    // ##### ACTION REGISTER #########################################

    createjs.Ticker.addEventListener("tick", update);

    function update(){
        updateResolution(stage);

        bg.scale = stage.canvas.height / 640;
        bg.x = (stage.canvas.width / 2) - (bg.scale * 360 / 2);

        conBtn.scale = bg.scale;
        conBtn.x = (stage.canvas.width / 2);
        conBtn.y = (stage.canvas.height / 2);
    
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