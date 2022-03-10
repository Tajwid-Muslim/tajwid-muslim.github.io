function uniqueNumber(a, b){
    var x = math.range(0, 5).toArray();

    return function(){
        var i = math.randomInt(0, x.length);
        var y = x.splice(i, 1);
        return y[0]
    }
}

function scene4_tiles(){
    var con = new createjs.Container();

    var rCA = uniqueNumber();
    var rA = uniqueNumber();
    var rCB = uniqueNumber();
    var rB = uniqueNumber();

    var colors = [];
    var a = [];
    var b = [];

    for(i=0; i<5; i++){
        colors.push(chroma.random().hex());
        a.push([rA(), rCA()]);
        var t = rB();
        b.push([t, rCB()]);
        if(i > 0 && b[i-1][0] == a[i-1][0]){
            console.log([i, b[i-1][0], a[i-1][0]]);
            var z = b[i-1][0];
            b[i-1][0] = b[i][0];
            b[i][0] = z;
        }
    }

    console.log({colors, a, b});

    for(i=0; i<5; i++){
        for(j=0; j<5; j++){
            var tile = new createjs.Shape();
            var color = j == a[i][0] ? colors[a[i][1]] : j == b[i][0] ? colors[b[i][1]] : '#000000';
            tile.graphics.beginFill(color).drawRect(j * 360 / 5,i * 360 / 5,360 / 5,360 / 5);
            con.addChild(tile);
        }
    }

    return con;
}

// Connect - 2m 30s
function scene4(){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();

    // var main = new createjs.Container();
    // main.name = 'main';
    // main.setBounds(0,0,360,640);
    // stage.addChild(main);

    // ##### ASSET CREATION ##########################################

    var bg = new createjs.Shape();
    bg.graphics.beginFill("#000000").drawRect(0,0,360,640);
    stage.addChild(bg);

    var pause = new createjs.Bitmap("assets/pause.png");
    pause.name = "pause";
    pause.setTransform(16,16 - 4);
    stage.addChild(pause);

    var poin = new createjs.Text('P9999', "bold 32px 'Comic Neue'", "#ffffff");
    poin.name = 'poin';
    poin.setTransform(16 + 40 + 16, 16 + 2);
    stage.addChild(poin);

    var bgProg = new createjs.Shape();
    bgProg.graphics.beginFill("#222222").drawRect(0,64,360,216);
    stage.addChild(bgProg);

    var prog = new createjs.Shape();
    prog.graphics.beginFill("#56C90D").drawRect(0,64,360 * 40 / 60,216);
    stage.addChild(prog);

    var tiles = scene4_tiles();
    tiles.setTransform(0, 280);
    stage.addChild(tiles);

    // ##### ACTION REGISTER #########################################

    createjs.Ticker.addEventListener("tick", update);

    function update(){
        updateResolution(stage);

        stage.scale = stage.canvas.height / 640;
    
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