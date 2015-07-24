/// <reference path="lib/kinetic-v4.4.3.js" />

var GameDraw = ( function () {

    //function background() {
    //    var stage = new Kinetic.Stage( {
    //        container: 'kinetic-container',
    //        width: 800,
    //        height: 600,
    //    } );

    //    var backgroundLayer = new Kinetic.Layer();

    //    var imageObj = new Image();
    //    imageObj.onload = function () {
    //        var image = new Kinetic.Image( {
    //            x: 0,
    //            y: 0,
    //            image: imageObj,
    //            width: 800,
    //            height: 600
    //        } );

    //        backgroundLayer.add( image );

    //        stage.add( backgroundLayer );
    //    };

    //    imageObj.src = '../Images/niceTry_Board.jpg';
    //}

    return {
        background: background,
    }
}() );

