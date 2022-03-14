function scene3(){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();

    // ##### CONFIGURATION ##########################################

    // add configuration here

    // ##### ASSET CREATION ##########################################

    // code here

    // ##### ACTION REGISTER #########################################

    createjs.Ticker.addEventListener("tick", update);

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
        createjs.Touch.disable(stage);
    }

    return {
        stage,
        update,
        stop
    };
}