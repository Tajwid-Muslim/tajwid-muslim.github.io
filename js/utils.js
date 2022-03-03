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