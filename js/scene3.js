function generateIcon(){
    var icons = {
        "Idgham Bigunnah": ["#753e04", "Mim!.png", "Nun!.png", "Wau!.png", "Yaa!.png"],
        "Idgham Bilagunnah": ["#ff8400", "Lam!.png", "Ra!.png"],
        "Idzhar": ["#2a8b0c", "Ain!.png", "Alif!.png", "Ghain!.png", "ha!.png", "Hamzah!.png",
                              "Hha!.png", "Kha!.png"],
        "Ikhfa": ["#ffdb14", "Dal.png", "Dhad.png", "Dzal.png", "Dzha.png", "Fa!.png", "Jim!.png",
                             "Kaf!.png", "Qaf!.png", "Shad!.png", "Sin!.png", "Syin!.png", "Ta!.png", 
                             "Tha!.png", "Tsa!.png", "Zain!.png"],
        "Iqlab": ["#164906", "Ba.png"],
    };

    var key = Object.keys(icons)[math.randomInt(0, 5)];
    var color = icons[key][0];
    var icon = icons[key][math.randomInt(1, icons[key].length)];

    var objIcon = new createjs.Bitmap(`assets/Tajwid/${key}/${icon}`);
    objIcon.scale = 0.015;
    objIcon.key = key;
    objIcon.color = color;
    objIcon.icon = icon;

    return objIcon;
}

function Label(label, color){
    var con = new createjs.Container();

    var text = new createjs.Text(label, "bold 14px 'Comic Neue'", color);
    text.name = 'label';

    var bg = new createjs.Shape();
    bg.name = 'bg';
    bg.graphics.setStrokeStyle(2).beginStroke(color).beginFill('#000000')
                 .drawRect(0,0,96,24);

    con.addChild(bg, text);

    con.updateLabel = function(label){
        text.text = label;
        var bounds = text.getBounds();
        text.setTransform((96 - bounds.width + 5) / 2, (24 - bounds.height + 5) / 2);
    }

    con.updateLabel(label);

    return con;
}

function ProgressBar(val){
    var shape = new createjs.Shape();
    shape.graphics.beginFill('#56C90D').drawRoundRectComplex(0,0, 144 * val,40, 8,0,0,8 ).endFill();
    shape.graphics.beginStroke('#ffffff').setStrokeStyle(4).drawRoundRect(0,0,144,40,8).endStroke();
    return shape;
}

function scene3(){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();

    // CONFIGURATION

    var list = {
        "Id Bigunnah": ["#753e04", "Mim!.png", "Nun!.png", "Wau!.png", "Yaa!.png"],
        "Id Bilagunnah": ["#ff8400", "Lam!.png", "Ra!.png"],
        "Idzhar": ["#2a8b0c", "Ain!.png", "Alif!.png", "Ghain!.png", "ha!.png", "Hamzah!.png",
                              "Hha!.png", "Kha!.png"],
        "Ikhfa": ["#ffdb14", "Dal.png", "Dhad.png", "Dzal.png", "Dzha.png", "Fa!.png", "Jim!.png",
                             "Kaf!.png", "Qaf!.png", "Shad!.png", "Sin!.png", "Syin!.png", "Ta!.png", 
                             "Tha!.png", "Tsa!.png", "Zain!.png"],
        "Iqlab": ["#164906", "Ba.png"],
    };

    // ##### ASSET CREATION ##########################################

    var bg = new createjs.Bitmap("assets/scene3/background.png");
    bg.name = "bg";
    stage.addChild(bg);

    var pause = new createjs.Bitmap("assets/pause.png");
    pause.name = "pause";
    pause.setTransform(16,16 - 4);
    stage.addChild(pause);

    var t = (2 * 60) + 30;
    var timer = null;
    function updateTimer(time){
        if(timer != null) timer.parent.removeChild(timer);
        timer = ProgressBar(time / ((2 * 60) + 30));
        timer.x = 66;
        timer.y = 13;
        stage.addChild(timer);
    }

    updateTimer(t);

    var poin = 0;
    var txtPoin = new createjs.Text('P0', "bold 32px 'Comic Neue'", '#000000');
    txtPoin.x = 226;
    txtPoin.y = 14 + 4;
    stage.addChild(txtPoin);

    var conBucket = new createjs.Container();
    stage.addChild(conBucket);

    var bucket = new createjs.Bitmap("assets/scene3/bucket.png");
    bucket.name = "bucket";
    conBucket.addChild(bucket);

    var key = Object.keys(list)[math.randomInt(0, 5)];
    var color = list[key][0];
    var text = Label(key, color);
    text.x = 4;
    text.y = 28;
    conBucket.addChild(text);
    key = key.substr(0,3) == 'Id ' ? 'Idgham ' + key.slice(3) : key;
    console.log(key);
    
    conBucket.y = 567;
    conBucket.regX = 106 / 2;
    conBucket.x = 360 / 2;
    conBucket.addEventListener('mousedown', pressDown);
    conBucket.addEventListener('pressup', pressUp);

    stage.addEventListener('stagemousemove', mousemove);

    // ##### ACTION REGISTER #########################################

    createjs.Ticker.addEventListener("tick", update);

    var isPressed = false;
    var icons = [];
    var lastTime = 0;
    var bonusTime = (2 * 60) + 30;
    var time = 0;

    function pressDown(e){
        isPressed = true;
    }

    function mousemove(e){
        if(isPressed){
            conBucket.x = e.stageX;
        }
    }

    function pressUp(e){
        isPressed = false;
    }

    function updateGame(e){
        time = Math.floor(e.time / 1000);
        if(time % 4 == 0 && time != lastTime){
            icons.push(generateIcon());
            icons[icons.length - 1].x = math.random(0, 360 - (0.015 * 3937));
            stage.addChild(icons[icons.length - 1]);
            lastTime = time;
        }

        updateTimer(bonusTime - time);

        for(i=0; i<icons.length; i++){
            icons[i].y += 5;
            var pos = conBucket.globalToLocal(icons[i].x, icons[i].y + (0.015 * 3937 / 2));
            if(icons[i].y > 640 || conBucket.hitTest(pos.x, pos.y)){
                if((icons[i].y < 640 && icons[i].key == key)
                   || (icons[i].y > 640 && icons[i].key != key)){
                       var curr = (bonusTime - time + 10) * 2 < (2 * 60) + 30;
                    bonusTime += curr ? 10 : 0;
                    poin += 1;
                    txtPoin.text = 'P' + poin;
                }else if((icons[i].y < 640 && icons[i].key != key)
                      || (icons[i].y > 640 && icons[i].key == key)){
                    bonusTime -= 10;
                    poin -= 1;
                    txtPoin.text = 'P' + poin;
                }

                stage.removeChild(icons[i]);
                icons.shift();
            }
        }
    }

    function update(e){
        updateResolution(stage);

        stage.scale = stage.canvas.height / 640;

        if(bonusTime - time > 0) updateGame(e);
        else{
            if(typeof localStorage.scene3_poin == 'undefined' || poin > localStorage.scene3_poin)
                localStorage.scene3_poin = poin;
        }

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