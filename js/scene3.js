function scene3(){
    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver();

    // ##### ASSET CREATION ##########################################

    //

    // ##### ACTION REGISTER #########################################

    createjs.Ticker.addEventListener("tick", update);

    function update(){
        updateResolution(stage);

        // code here
    
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