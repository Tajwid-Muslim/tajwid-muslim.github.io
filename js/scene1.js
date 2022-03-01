function scene1(){
    var stage = new createjs.Stage("canvas");

    var bg = new createjs.Bitmap("/assets/scene1/background.png");
    bg.name = "bg";
    stage.addChild(bg);

    createjs.Ticker.addEventListener("tick", scene1__update);
}

function scene1__update(){
    updateResolution();

    var bg = stage.getChildByName('bg');
    
    bg.scale = stage.canvas.clientHeight / 640;

    bg.x = (stage.canvas.width / 2) - (bg.scale * 360 / 2);
}

function scene1__destroy({stage}){
    //
}

class Scene1 extends createjs.Stage{
    self = null;
    _tick = null;

    stage = null;

    constructor(props){
        super(props);
        this.self = this;
        this.stage = this;

        var {self, stage} = this;

        var bg = new createjs.Bitmap("/assets/scene1/background.png");
        bg.name = "bg";
        stage.addChild(bg);

        createjs.Ticker.addEventListener("tick", this.updateScene(self));
    }

    /**
     * Shorthand caller of Scene
     * @param {HTMLCanvasElement|String|Object} sel css selector syntax of element
     * @returns createjs.Stage
     */
    static init(sel){
        return new Scene1(sel ?? 'canvas');
    }

    updateScene({stage}){
        this._tick = function(e){
            updateResolution(stage);

            var bg = stage.getChildByName('bg');
            bg.scale = stage.canvas.clientHeight / 640;
            bg.x = (stage.canvas.width / 2) - (bg.scale * 360 / 2);

            stage.update();
        }
        return this._tick;
    }

    destroy(){
        //
    }
}