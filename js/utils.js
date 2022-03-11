// ##### ASSETS #########################

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

function ButtonColor(label, color){
    var con = new createjs.Container();

    var text = new createjs.Text(label, "bold 24px 'Comic Neue'", "#ffffff");
    text.name = 'label';

    var bg = new createjs.Shape();
    bg.name = 'bg';
    bg.graphics.setStrokeStyle(4).beginFill(color)
                 .drawRect(0,0,248,56);

    con.addChild(bg, text);

    con.updateLabel = function(label){
        text.text = label;
        var bounds = text.getBounds();
        text.setTransform((248 - bounds.width + 5) / 2, (56 - bounds.height + 5) / 2);
    }

    con.updateLabel(label);

    return con;
}

function generateIcon(unique=false){
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

    var rand = math.randomInt(0, 5);

    if(unique){
        if(typeof window._uniqueGenerateIcon == 'undefined')
            window._uniqueGenerateIcon = uniqueNumber(0, 5);

        rand = window._uniqueGenerateIcon();

        if(rand == false){
            window._uniqueGenerateIcon = uniqueNumber(0, 5);
            rand = window._uniqueGenerateIcon();
            console.log("regenerate");
        }
    }

    var key = Object.keys(icons)[rand];
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

function PauseScreen({name, highScore, conti, restart, back}){
    var con = new createjs.Container();

    var bg = new createjs.Shape();
    bg.graphics.beginFill('#563232').beginStroke('#ffffff').setStrokeStyle(4)
               .drawRoundRect(0,0,280,300,8).endFill().endStroke();
    con.addChild(bg);

    var textName = new createjs.Text(name, "bold 32px 'Comic Neue'", '#ffffff');
    var bName = textName.getBounds();
    textName.setTransform(24, 18);
    con.addChild(textName);

    var close = new createjs.Bitmap(`assets/close.png`);
    close.x = 226;
    close.y = 16;
    close.scale = 0.6
    close.addEventListener('click', function(e){
        conti(e);
        con.parent.removeChild(con);
    });
    con.addChild(close);

    var textHScore = new createjs.Text(highScore, "bold 64px 'Comic Neue'", '#ffffff');
    var bHScore = textHScore.getBounds();
    textHScore.setTransform((280 - bHScore.width + 5) / 2, 92);
    con.addChild(textHScore);

    var textLHScore = new createjs.Text('Skor tertinggi', "bold 24px 'Comic Neue'", '#ffffff');
    var bLHScore = textLHScore.getBounds();
    textLHScore.setTransform((280 - bLHScore.width + 5) / 2, 156);
    con.addChild(textLHScore);

    var kembali = ButtonWood('Kembali', 0);
    kembali.scale = 0.6;
    kembali.regX = 0;
    kembali.regY = 0;
    kembali.x = 24;
    kembali.y = 238;
    kembali.addEventListener('click', back);
    con.addChild(kembali);

    var ulangi = ButtonWood('Ulangi', 0);
    ulangi.scale = 0.6;
    ulangi.regX = 0;
    ulangi.regY = 0;
    ulangi.x = 146;
    ulangi.y = 238;
    ulangi.addEventListener('click', restart);
    con.addChild(ulangi);

    return con;
}

function EndScreen({name, score, highScore, back, restart}){
    var con = new createjs.Container();

    var bg = new createjs.Shape();
    bg.graphics.beginFill('#563232').beginStroke('#ffffff').setStrokeStyle(4)
               .drawRoundRect(0,0,280,300,8);
    con.addChild(bg);

    var textName = new createjs.Text(name, "bold 32px 'Comic Neue'", '#ffffff');
    var bName = textName.getBounds();
    textName.setTransform((280 - bName.width + 5) / 2, 18);
    con.addChild(textName);

    var textScore = new createjs.Text(score, "bold 64px 'Comic Neue'", '#ffffff');
    var bScore = textScore.getBounds();
    textScore.setTransform((280 - bScore.width + 5) / 2, 60);
    con.addChild(textScore);

    var textLScore = new createjs.Text('Skor kamu', "bold 24px 'Comic Neue'", '#ffffff');
    var bLScore = textLScore.getBounds();
    textLScore.setTransform((280 - bLScore.width + 5) / 2, 124);
    con.addChild(textLScore);

    var textHScore = new createjs.Text(highScore, "bold 36px 'Comic Neue'", '#ffffff');
    var bHScore = textHScore.getBounds();
    textHScore.setTransform((280 - bHScore.width + 5) / 2, 164);
    con.addChild(textHScore);

    var textLHScore = new createjs.Text('Skor tertinggi', "bold 14px 'Comic Neue'", '#ffffff');
    var bLHScore = textLHScore.getBounds();
    textLHScore.setTransform((280 - bLHScore.width + 5) / 2, 196);
    con.addChild(textLHScore);

    var kembali = ButtonWood('Kembali', 0);
    kembali.scale = 0.6;
    kembali.regX = 0;
    kembali.regY = 0;
    kembali.x = 24;
    kembali.y = 238;
    kembali.addEventListener('click', back);
    con.addChild(kembali);

    var ulangi = ButtonWood('Ulangi', 0);
    ulangi.scale = 0.6;
    ulangi.regX = 0;
    ulangi.regY = 0;
    ulangi.x = 146;
    ulangi.y = 238;
    ulangi.addEventListener('click', restart);
    con.addChild(ulangi);

    return con;
}

// ##### UTILITIES ###################################

function uniqueNumber(a, b){
    var x = math.range(a, b).toArray();

    return function(){
        if(x.length == 0) return false;
        var i = math.randomInt(0, x.length);
        var y = x.splice(i, 1);
        return y[0]
    }
}

function updateResolution(stage){
    stage.canvas.width = stage.canvas.clientWidth;
    stage.canvas.height = stage.canvas.clientHeight;
}

function openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
    }
}