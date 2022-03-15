function scene5_platform(stage, y){
    var pf = new createjs.Bitmap("assets/scene5/platform.png");
    pf.x = math.random(0, scalingWidth(stage) - 80.66);
    pf.y = y;
    return pf;
}

function scene5(){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();

    // ##### CONFIGURATION ##########################################

    // add configuration here

    // ##### ASSET CREATION ##########################################

    var bg = new createjs.Bitmap("assets/scene5/background.png");
    bg.name = "bg";
    stage.addChild(bg);

    var cat = new createjs.Bitmap("assets/scene5/cat.png");
    cat.name = 'cat';
    cat.regX = 43.2 / 2;
    cat.regY = 56;
    stage.addChild(cat);

    // ##### ACTION REGISTER #########################################

    createjs.Ticker.addEventListener("tick", update);

    var cheight = 1; // current height
    var pheight = 100; // platform height
    var vplatform = 1; // velocity of platform 
    var platforms = [];
    var tamus = [];

    var time = 0;
    var frame = -1;
    var cfrm = 0;
    var g = 0.6 * stage.scale;
    var ycat = 0;
    var vcat = 14 * stage.scale;

    update({time:0});
    for(cheight=0; cheight < 640 && cheight % pheight == 0; 
        cheight += pheight - (cheight % pheight)){
            var y = 640 - (cheight % 640);
            var pf = scene5_platform(stage, y);
            platforms.push(pf);
            stage.addChild(pf);

            if(math.randomInt(1, 25) % 3 == 0){
                var icon = generateIcon(true);
                icon.x = pf.x + ((80.66 - (icon.scale * 3937)) / 2);
                icon.y = y - (icon.scale * 3937);
                tamus.push(icon);
                stage.addChild(icon);
            }

            if(platforms.length == 3){
                cat.y = ycat = y + (stage.scale * 5);
                cat.x = pf.x + (80.66 / 2);
            }
    }

    cheight = 640;

    document.addEventListener('keypress', hdlkey);
    document.addEventListener('keydown', hdlkey);
    window.addEventListener('deviceorientation', hdldevor);

    function hdldevor(e){
        var gm = e.gamma;
        if(gm < -45) gm = -45;
        else if(gm > 45) gm = 45;

        if(gm < 0) moveLeft(-gm * 2 * bg.scale / 45);
        else moveRight(gm * 2 * bg.scale / 45);
    }

    function hdlkey(e){
        // console.log(e);
        if(e.key == "ArrowLeft") moveLeft(2 * bg.scale);
        else if(e.key == "ArrowRight") moveRight(2 * bg.scale);
    }

    function isPass(x, y, x0, x1, y0, y1){
        return x >= x0 && x <= x1 && y >= y0 && y <= y1;
    }

    function moveRight(v){
        cat.x += v;
        if(cat.x > 360 * stage.scale) cat.x = 0;
    }
    function moveLeft(v){
        cat.x -= v;
        if(cat.x < 0 * stage.scale) cat.x = 360 * stage.scale;
    }

    function restart(e){
        stop();
        stage.canvas = null;
        window.stage = scene5();
    }

    function updateStage(e){
        if(cheight % pheight == 0){
            var y = (640 % pheight);
            var pf = scene5_platform(stage, y);
            platforms.push(pf);
            stage.addChild(pf);

            if(math.randomInt(1, 25) % 3 == 0){
                var icon = generateIcon(true);
                icon.x = pf.x + ((80.66 - (icon.scale * 3937)) / 2);
                icon.y = y - (icon.scale * 3937);
                tamus.push(icon);
                stage.addChild(icon);
            }
        }

        var t = frame - cfrm;
        var vt = vcat - (g * t);
        cat.y = ycat - ((vcat * t) - (g * t * t / 2));

        for(i=0; i<platforms.length; i++){
            platforms[i].y+=vplatform;
            if(tamus.length - 1 >= i) tamus[i].y+=vplatform; 

            if(vt < 0){
                var pos = platforms[i].globalToLocal(cat.x, cat.y);
                if(isPass(cat.x, cat.y, 
                          platforms[i].x, platforms[i].x + (80.66 * stage.scale), 
                          platforms[i].y, platforms[i].y + (27.34 * stage.scale))){
                    ycat = platforms[i].y;
                    cfrm = frame;
                }

                if(tamus.length - 1 >= i 
                   && isPass(cat.x, cat.y, 
                             tamus[i].x, tamus[i].x + (3937 * tamus[i].scale * stage.scale),
                             tamus[i].y, tamus[i].y + (3937 * tamus[i].scale * stage.scale))){
                    var sapi = new SpeechSynthesisUtterance(tamus[i].key);
                    sapi.lang = 'id-id';
                    speechSynthesis.speak(sapi);
                    tamus[i].parent.removeChild(tamus[i]);
                    tamus.splice(i,1);
                    // console.log("Line 145");
                }
            }

            if(platforms[i].y >= 640){
                platforms[i].parent.removeChild(platforms[i]);
                platforms.shift();
            }

            if(tamus.length - 1 >= i && tamus[i].y >= 640){
                tamus[i].parent.removeChild(tamus[i]);
                tamus.shift();
            }
        }

        cheight+=vplatform;
        frame++;
    }

    function update(e){
        updateResolution(stage);
        stage.scale = stage.canvas.height / 640;

        if(cat.y < 640) updateStage(e);
        else {
            restart();
            // console.log('restart');
        }
    
        stage.update();
    }

    function stop(){
        createjs.Ticker.removeEventListener("tick", update);
        stage.enableDOMEvents(false);
        stage.enableMouseOver(false);
        document.removeEventListener('keypress', hdlkey);
        document.removeEventListener('keydown', hdlkey);
        window.removeEventListener('deviceorientation', hdldevor);
    }

    return {
        stage,
        update,
        stop
    };
}