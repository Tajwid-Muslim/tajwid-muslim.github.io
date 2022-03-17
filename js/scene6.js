function bigBoxText(text, fontSize, bgcolor, w, h){
    var con = new createjs.Container();

    var box = new createjs.Shape();
    box.name = 'box';
    box.graphics.beginFill(bgcolor).drawRect(0,0,w,h);
    
    var m = 8;
    var label = new createjs.Text(text, `bold ${fontSize} 'Comic Neue'`, "#ffffff");
    label.maxWidth = w - (m*2);
    label.textAlign = 'center';
    var bounds = label.getBounds();
    // label.regX = bounds.width / 2;
    label.regY = bounds.height / 2;
    // label.x = w / 2;
    label.y = h / 2;
    label.x = (bounds.width / 2) + m;
    label.name = 'label';
    // console.log([bounds, label]);

    con.addChild(box, label);
    con.label = label;
    con.box = box;
    return con;
}

function scene6(){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();
    createjs.Touch.enable(stage);

    // ##### CONFIGURATION ##########################################

    var questions = [
        ["Tajwid manakah yang\ndibaca dengung?", 0, ["Idgham", "Iqlab", "Ikhfa"]],
        ["Huruf nun mati bila bertemu\nizhar akan dibaca...", 1, ["Samar", "Jelas", "Mim"]],
        ["Num mati bila bertemu\nhuruf Ba akan dibaca...", 2, ["Samar", "Jelas", "Mim"]],
        ["Huruf Ikhfa salah satunya ialah...", 2, ["Alif", "Ba", "Ta"]],
        ["Apa bila huruf Syin Fatah\nTanwin bertemu huruf Mim,\nmaka tanwinnya dibaca", 1, ["Samar", "Dengung", "Jelas"]],
    ];

    var statePause = false;
    var t = (2 * 60) + 30;
    var lastTime = -1;
    var time = 0;
    var poin = 0;

    // ##### ASSET CREATION ##########################################

    var bg = new createjs.Bitmap("assets/scene6/background.png");
    bg.name = "bg";
    stage.addChild(bg);

    var pause = new createjs.Bitmap("assets/pause.png");
    pause.name = "pause";
    pause.setTransform(16,16 - 4);
    pause.addEventListener('click', function(e){
        statePause = true;
        t = t + lastTime - time;

        ball.removeEventListener('mousedown', pressDown);

        var pauseScreen = PauseScreen({
            name: 'Goal Quest',
            highScore: localStorage.scene5_poin ?? 0,
            conti,
            back,
            restart
        });
        pauseScreen.regX = 280 / 2;
        pauseScreen.x = scalingWidth(stage) / 2;
        pauseScreen.regY = 300 / 2;
        pauseScreen.y = 640 / 2;
        stage.addChild(pauseScreen);
    });
    stage.addChild(pause);

    var timer = null;
    function updateTimer(time){
        if(timer != null) timer.parent.removeChild(timer);
        timer = ProgressBar(time / ((2 * 60) + 30));
        timer.x = 66;
        timer.y = 13;
        stage.addChild(timer);
    }

    updateTimer(t);

    var txtPoin = new createjs.Text('P0', "bold 32px 'Comic Neue'", '#000000');
    txtPoin.x = 226;
    txtPoin.y = 14 + 4;
    stage.addChild(txtPoin);

    var goal = new createjs.Bitmap("assets/scene6/goal.png");
    goal.name = "goal";
    goal.x = 22;
    goal.y = 286;
    stage.addChild(goal);

    var q=null, qs, ans1, ans2, ans3, ball;
    function generateScene() {
        if(q != null){
            stage.removeChild(qs);
            stage.removeChild(ball);
            stage.removeChild(ans1);
            stage.removeChild(ans2);
            stage.removeChild(ans3);
            ball.removeEventListener('mousedown', pressDown);
        }

        if(typeof window._uniqueGenerateQuestions == 'undefined') 
            window._uniqueGenerateQuestions = uniqueNumber(0, questions.length, true);
        var _qi = _uniqueGenerateQuestions();
        if(_qi == false){
            window._uniqueGenerateQuestions = uniqueNumber(0, questions.length, true);
            _qi = _uniqueGenerateQuestions();
        }

        q = questions[_qi];

        qs = bigBoxText(q[0], "32px", "rgba(0,0,0,0.5)", 316, 158);
        qs.x = 22;
        qs.y = 115;
        stage.addChild(qs);

        ans1 = bigBoxText(q[2][0], "32px", "rgba(0,0,0,0.5)", 99.33, 117);
        ans1.x = 31;
        ans1.y = 292;
        stage.addChild(ans1);

        ans2 = bigBoxText(q[2][1], "32px", "rgba(0,0,0,0.5)", 99.33, 117);
        ans2.x = 131.33;
        ans2.y = 292;
        stage.addChild(ans2);

        ans3 = bigBoxText(q[2][2], "32px", "rgba(0,0,0,0.5)", 99.33, 117);
        ans3.x = 231.33;
        ans3.y = 292;
        stage.addChild(ans3);

        ball = new createjs.Bitmap("assets/scene6/ball.png");
        ball.name = "ball";
        ball.regX = 69 / 2;
        ball.regY = 69;
        ball.x = 146 + (69 / 2);
        ball.y = 544 + 69;
        ball.addEventListener('mousedown', pressDown);
        stage.addChild(ball);
    }

    generateScene();

    // ##### ACTION REGISTER #########################################

    createjs.Ticker.addEventListener("tick", update);

    function throwBall(x, y){
        var ballX = 146 + (69 / 2);
        var ballY = 544 + 69;
        ball.scale = 1;
        return new createjs.Tween(ball).to({
            scale:0.5,
            // guide:{ path:[ball.x, ball.y, ball.x + ((x - ball.x) * 3 / 4), goal.y-123, x, y]}
            guide:{ path:[ballX, ballY, ballX + ((x - ballX) * 3 / 4), goal.y-123, x, y]}
        }, 800, createjs.Ease.getPowOut(2.2));
    }

    function pressDown(epd){
        stage.addEventListener('stagemousemove', mouseMove);
        ball.addEventListener('pressup', pressUp);

        function mouseMove(emm){
            var pos = ball.globalToLocal(emm.stageX, emm.stageY);
            if(!ball.hitTest(pos.x, pos.y) && emm.stageY < epd.stageY){
                var x = (403 - epd.stageY) * (emm.stageX - epd.stageX) / (emm.stageY - epd.stageY);
                x += epd.stageX;
                var tw = throwBall(x,403);
                pressUp(emm);
                tw.addEventListener('complete', function(){
                    var anss = [ans1, ans2, ans3];
                    var ans = anss[q[1]];
                    var pos = ans.globalToLocal(ball.x, ball.y);
                    var tans;

                    if(ans.hitTest(pos.x, pos.y)){
                        tans = bigBoxText(q[2][q[1]], "32px", "rgba(0,255,0,0.6)", 99.33, 117);
                        poin += 1;
                        console.log([t, (2 * 60) + 30, t >= (2 * 60) + 30, (t >= (2 * 60) + 30) ? 0 : 5]);
                        if(t + lastTime - time + 5 < (2 * 60) + 30) t += 5;
                        txtPoin.text = `P${poin}`;
                    }else{
                        tans = bigBoxText(q[2][q[1]], "32px", "rgba(0,0,255,0.6)", 99.33, 117);
                        poin -= poin <=0 ? 0 : 1;
                        if(t + lastTime - time - 5 > 0) t -= 5;
                        txtPoin.text = `P${poin}`;
                    }

                    tans.x = ans.x;
                    tans.y = ans.y;
                    stage.addChild(tans);
                    stage.removeChild(ans);

                    setTimeout(function(){
                        stage.removeChild(tans);
                        generateScene();
                    }, 500);
                });
            }
        }
        function pressUp(epu){
            stage.removeEventListener('stagemousemove', mouseMove);
            ball.removeEventListener('pressUp', pressUp);
        }
    }

    function conti(e){
        statePause = false;
        lastTime = time;
        ball.addEventListener('mousedown', pressDown);
    }

    function back(e){
        stop();
        stage.canvas = null;
        window.stage = scene1();
    }

    function restart(e){
        window.stage = scene6();
        stop();
        stage.canvas = null;
    }

    function update(e){
        time = Math.floor(e.time / 1000);
        updateResolution(stage);
        stage.scale = stage.canvas.height / 640;

        if(lastTime == -1){
            lastTime += time;
        }

        if(t + lastTime - time > 0){
            if(statePause == false) updateTimer(t + lastTime - time);
        }else{
            if(typeof localStorage.scene6_poin == 'undefined' || poin > localStorage.scene6_poin)
                localStorage.scene6_poin = poin;

            ball.removeEventListener('mousedown', pressDown);
            
            var endScreen = EndScreen({
                name: 'Goal Quest',
                score: poin,
                highScore: localStorage.scene6_poin,
                back,
                restart
            });
            endScreen.regX = 280 / 2;
            endScreen.x = 360 / 2;
            endScreen.regY = 300 / 2;
            endScreen.y = 640 / 2;
            stage.addChild(endScreen);
            isEnd = true;
            statePause = true;
        }
    
        stage.update();
    }

    function stop(){
        createjs.Ticker.removeEventListener("tick", update);
        stage.enableDOMEvents(false);
        stage.enableMouseOver(false);
        createjs.Touch.disable(stage);
    }

    return {
        stage,
        update,
        stop,
        throwBall,
        ball
    };
}