function scene6(){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();
    createjs.Touch.enable(stage);

    // ##### CONFIGURATION ##########################################

    var statePause = false;
    var t = (2 * 60) + 30;
    var lastTime = 0;
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

        var pauseScreen = PauseScreen({
            name: 'Goal Quest',
            highScore: localStorage.scene5_poin ?? 0,
            conti:function(){},
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

    var ball = new createjs.Bitmap("assets/scene6/ball.png");
    ball.name = "ball";
    ball.regX = 69 / 2;
    ball.regY = 69;
    ball.x = 146 + (69 / 2);
    ball.y = 544 + 69;
    ball.addEventListener('mousedown', pressDown);
    stage.addChild(ball);

    // var target = [274,403];
    // var s = new createjs.Shape();
    // s.graphics.setStrokeStyle(4).beginStroke("red")
    //           .moveTo(ball.x, ball.y)
    //           .curveTo(ball.x + ((target[0] - ball.x) * 3 / 4), goal.y-123,
    //                    target[0],target[1]);
    // stage.addChild(s);

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
            console.log([pos, ball.hitTest(pos.x, pos.y)]);
            if(!ball.hitTest(pos.x, pos.y) && emm.stageY < epd.stageY){
                var x = (403 - epd.stageY) * (emm.stageX - epd.stageX) / (emm.stageY - epd.stageY);
                x += epd.stageX;
                throwBall(x,403);
                pressUp(emm);
                setTimeout(function(){
                    restart();
                }, 1000);
            }
        }
        function pressUp(epu){
            stage.removeEventListener('stagemousemove', mouseMove);
            ball.removeEventListener('pressUp', pressUp);
        }
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

    function update(){
        updateResolution(stage);
        stage.scale = stage.canvas.height / 640;

        // code here
    
        stage.update();
    }

    function stop(){
        createjs.Ticker.removeEventListener("tick", update);
        stage.enableDOMEvents(false);
        stage.enableMouseOver(false);
        // createjs.Touch.disable(stage);
    }

    return {
        stage,
        update,
        stop,
        throwBall,
        ball
    };
}