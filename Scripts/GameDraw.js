/// <reference path="kinetic-v4.4.3.js" />

var GameDraw = ( function () {           
    
    var stage = new Kinetic.Stage( {
        container: 'kinetic-container',
        width: 800,
        height: 600,
    } );

    var circle = new Kinetic.Circle( {
        x: 200,
        y: 300,
        radius: 100,
        fill: 'black',
    } );

    var layer = new Kinetic.Layer();

    layer.add(circle);
    stage.add( layer );

    function background() {
        
        layer.add( circle );
        stage.add( layer );
    };

    return {
        background: background,
    }
}() );