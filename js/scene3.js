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
    var statePause = false;

    // ##### ASSET CREATION ##########################################

    var bg = new createjs.Bitmap("assets/scene3/background.png");
    bg.name = "bg";
    stage.addChild(bg);

    var pause = new createjs.Bitmap("assets/pause.png");
    pause.name = "pause";
    pause.setTransform(16,16 - 4);
    pause.addEventListener('click', function(e){
        statePause = true;

        var pauseScreen = PauseScreen({
            name: 'Tamu Drop',
            score: poin,
            highScore: localStorage.scene3_poin,
            conti,
            back,
            restart
        });
        pauseScreen.regX = 280 / 2;
        pauseScreen.x = 360 / 2;
        pauseScreen.regY = 300 / 2;
        pauseScreen.y = 640 / 2;
        stage.addChild(pauseScreen);
    });
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
    var lastTime = -1;
    var bonusTime = (2 * 60) + 30;
    var time = 0;
    var isEnd = false;

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

    function conti(e){
        statePause = false;
    }

    function back(e){
        stop();
        stage.enableDOMEvents(false);
        stage.canvas = null;
        window.stage = scene1();
    }

    function restart(e){
        stop();
        stage.enableDOMEvents(false);
        stage.canvas = null;
        window.stage = scene3();
    }

    function updateGame(e){
        time = Math.floor(e.time / 1000);
        if(lastTime == -1){
            bonusTime += time;
            lastTime = 0;
        }

        if(time % 4 == 0 && time != lastTime){
            icons.push(generateIcon(true));
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
                    poin = poin <= 0 ? 0 : poin - 1;
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

        if(bonusTime - time > 0 && statePause == false) updateGame(e);
        else if(isEnd == false && statePause == false){
            if(typeof localStorage.scene3_poin == 'undefined' || poin > localStorage.scene3_poin)
                localStorage.scene3_poin = poin;
            
            var endScreen = EndScreen({
                name: 'Tamu Drop',
                score: poin,
                highScore: localStorage.scene3_poin,
                back,
                restart
            });
            endScreen.regX = 280 / 2;
            endScreen.x = 360 / 2;
            endScreen.regY = 300 / 2;
            endScreen.y = 640 / 2;
            stage.addChild(endScreen);
            isEnd = true;
        }

        if(statePause){
            if(Math.floor(e.time / 1000) != lastTime) bonusTime++;
            lastTime = Math.floor(e.time / 1000);
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