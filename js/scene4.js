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

    var coors = [ // [j,i]
        [ [[0,0],[4,2]], [[0,1],[1,3]], [[1,1],[0,4]], [[2,1],[3,2]], [[3,4],[4,4]] ],
        [ [[0,2],[1,1]], [[2,0],[4,0]], [[1,2],[3,1]], [[0,3],[3,2]], [[4,1],[0,4]] ],
        [ [[0,1],[4,0]], [[1,1],[1,3]], [[0,4],[2,2]], [[4,1],[4,4]], [[1,4],[3,4]] ],
        [ [[0,4],[1,2]], [[2,2],[4,0]], [[1,3],[3,1]], [[4,1],[4,3]], [[1,4],[4,4]] ],
        [ [[0,0],[3,0]], [[4,0],[1,2]], [[0,3],[3,1]], [[0,4],[3,3]], [[4,3],[2,4]] ],
        [ [[0,0],[3,1]], [[1,0],[3,0]], [[4,0],[4,4]], [[0,2],[3,3]], [[2,3],[3,4]] ],
    ];

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

    var colors = [];
    var tiles = [];

    for(i=0; i<5; i++){
        if(typeof tiles[i] == 'undefined') tiles[i] = [];
        colors.push(chroma.random().hex());
        
        var keys = Object.keys(icons)[math.randomInt(0, 5)];
        var color = icons[keys][0];
        var icon = icons[keys][Math.randomInt(1, icons[keys].length)];
        // colors.push([keys, color, icon]);

        for(j=0; j<5; j++){
            tiles[i][j] = new createjs.Shape();
            tiles[i][j].graphics
                .setStrokeStyle(4).beginStroke("#222222")
                .beginFill('#000000').drawRect(j * 360 / 5, i * 360 / 5, 360 / 5, 360 / 5);
            con.addChild(tiles[i][j]);
        }
    }

    var tile = coors[math.randomInt(0, coors.length)];
    for(i=0; i<tile.length; i++){
        var color = colors[i];
        var a = tile[i][0];
        var b = tile[i][1];

        var _tile = Object.assign({}, tiles[a[1]][a[0]].graphics.command);
        tiles[a[1]][a[0]].graphics.clear();
        tiles[a[1]][a[0]].graphics.beginFill(color)
            .drawRect(_tile.x, _tile.y, _tile.w, _tile.h);
        
        tiles[a[1]][a[0]].color = color;
        tiles[a[1]][a[0]].coor = tile[i];
        tiles[a[1]][a[0]].target = b;

        _tile = Object.assign({}, tiles[b[1]][b[0]].graphics.command);
        tiles[b[1]][b[0]].graphics.clear();
        tiles[b[1]][b[0]].graphics.beginFill(color)
            .drawRect(_tile.x, _tile.y, _tile.w, _tile.h);
        
        tiles[b[1]][b[0]].color = color;
        tiles[b[1]][b[0]].coor = tile[i];
        tiles[b[1]][b[0]].target = a;
    }

    con.coor = tile;
    con.colors = colors;
    con.tiles = tiles;

    return con;
}

// Connect - 2m 30s
function scene4(){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();

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