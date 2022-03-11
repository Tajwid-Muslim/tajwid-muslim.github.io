function scene2_materi(name){
    var conMateri = new createjs.Container();
    conMateri.addEventListener('click', (e)=>{});
    conMateri.addEventListener('mouseover', (e)=>{});
    conMateri.addEventListener('mousedown', (e)=>{});
    conMateri.addEventListener('mouseout', (e)=>{});

    var back = new createjs.Bitmap(`assets/scene2/back.png`);
    back.name = "back";
    back.scale = 0.5;
    back.addEventListener('click', (e)=>conMateri.parent.removeChild(conMateri));
    conMateri.addChild(back);
    
    var bg = new createjs.Bitmap("assets/scene2/paper.png");
    bg.y = (64 * back.scale) + 8;
    bg.name = "bg";
    conMateri.addChild(bg);

    if(!(/^(Idzhar|Idgham Bigunnah|Idgham Bilagunnah|Iqlab|Ikhfa)$/.test(name))) return conMateri;

    var materi = new createjs.Bitmap(`assets/scene2/${name}.png`);
    materi.name = "materi";
    materi.image.onload = function(e){
        materi.regX = 280 / 2;
        materi.regY = materi.getBounds().height / 2;
        materi.x = 300 / 2;
        materi.y = (64 * back.scale) + 8 + (448 / 2);
    }
    conMateri.addChild(materi);

    return conMateri;
}

function scene2(){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();

    // ##### ASSET CREATION ##########################################

    var bg = new createjs.Bitmap("assets/scene2/background.png");
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

    btnIdzhar.addEventListener('click', ()=>showPaper("Idzhar"));
    btnIdBigunnah.addEventListener('click', ()=>showPaper("Idgham Bigunnah"));
    btnIdBilagunnah.addEventListener('click', ()=>showPaper("Idgham Bilagunnah"));
    btnIqlab.addEventListener('click', ()=>showPaper("Iqlab"));
    btnIkhfa.addEventListener('click', ()=>showPaper("Ikhfa"));

    btnKembali.regY = 0;
    btnKembali.y = (56 * 5) + (56 / 2);
    btnKembali.x = (248 + 5) / 2;
    btnKembali.scale = 0.8;
    btnKembali.addEventListener('click', function(e){
        stop();
        stage.enableDOMEvents(false);
        stage.canvas = null;
        window.stage = scene1();
    });

    var paper = null;
    
    conBtn.addChild(btnIdzhar, btnIdBigunnah, btnIdBilagunnah, btnIqlab, btnIkhfa, btnKembali);
    stage.addChild(conBtn);

    // ##### ACTION REGISTER #########################################

    createjs.Ticker.addEventListener("tick", update);

    function showPaper(name){
        paper = scene2_materi(name);
        paper.regX = 300 / 2;
        paper.regY = (448 + 64 + 8) / 2;
        stage.addChild(paper);
    }

    function update(){
        updateResolution(stage);

        bg.scale = stage.canvas.height / 640;
        bg.x = (stage.canvas.width / 2) - (bg.scale * 360 / 2);

        conBtn.scale = bg.scale;
        conBtn.x = (stage.canvas.width / 2);
        conBtn.y = (stage.canvas.height / 2);

        if(paper != null){
            paper.scale = bg.scale;
            paper.x = (stage.canvas.width / 2);
            paper.y = (stage.canvas.height / 2);
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