/// <reference path="lib/kinetic.js" />

var GameDraw = ( function () {

    var backgroundLayer,
        playGroundLayer,
        stage,
        width,
        height,
        CONSTANTS = {
            OBJ_SIZE_X: 60,
            OBJ_SIZE_Y: 52,
            TOP_START_POS_X: 30,
            TOP_START_POS_Y: 31,
            BOTTOM_START_POS_X: 30,
            BOTTOM_START_POS_Y: 537,
            OUT_OF_GAME_PIECE_START_POSITION_X: 850,
            OUT_OF_GAME_PIECE_START_POSITION_Y: 310,
            WIDTH_OF_BOX: 100,
        };

    stage = new Kinetic.Stage( {
        container: 'kinetic-container',
        width: 1359,
        height: 639,
    } );

    backgroundLayer = new Kinetic.Layer();
    playGroundLayer = new Kinetic.Layer();
    playersLayer = new Kinetic.Layer();

    width = stage.getWidth();
    height = stage.getHeight();

    function getOutOfGamePiecePosition( objX, objY ) {
        var x,
            y;

        if ( objX === 0 ) {
            x = CONSTANTS.OUT_OF_GAME_PIECE_START_POSITION_X + ( CONSTANTS.WIDTH_OF_BOX / 2 )
            - (CONSTANTS.OBJ_SIZE_X / 2);
            y = CONSTANTS.OUT_OF_GAME_PIECE_START_POSITION_Y - 5 - CONSTANTS.OBJ_SIZE_Y +
                - ( objY * ( CONSTANTS.OBJ_SIZE_Y / 6 ) );
        } else if ( objX === 1 ) {
            x = CONSTANTS.OUT_OF_GAME_PIECE_START_POSITION_X + ( CONSTANTS.WIDTH_OF_BOX / 2 )
             - ( CONSTANTS.OBJ_SIZE_X / 2 );
            y = CONSTANTS.OUT_OF_GAME_PIECE_START_POSITION_Y + 5 +
                + ( objY * ( CONSTANTS.OBJ_SIZE_Y / 6 ) );
        }

        return {
            x: x,
            y: y,
        }
    }

    function getPlayGroundPosition( objX, objY ) {
        var x,
            y,
            middleBoard = 0;

        if ( objX < 6 || ( 11 < objX && 17 < objX ) ) {
            middleBoard = 39;
        }

        if ( 12 <= objX && objX < 24 ) {
            x = CONSTANTS.TOP_START_POS_X + ( ( objX - 12 ) * CONSTANTS.OBJ_SIZE_X ) + middleBoard;
            y = CONSTANTS.TOP_START_POS_Y + ( objY * CONSTANTS.OBJ_SIZE_Y );
        } else if ( 0 <= objX && objX < 12 ) {
            x = CONSTANTS.BOTTOM_START_POS_X + ( ( 11 - objX ) * CONSTANTS.OBJ_SIZE_X ) + middleBoard;
            y = CONSTANTS.BOTTOM_START_POS_Y - ( objY * CONSTANTS.OBJ_SIZE_Y );
        }

        return {
            x: x,
            y: y,
        }
    };

    function background() {
        var imageObjBackground = new Image();
        var imageObjBoard = new Image();        

        imageObjBackground.onload = function () {
            var imageBackground = new Kinetic.Image( {
                x: 0,
                y: 0,
                image: imageObjBackground,
                width: width,
                height: height
            } );

            backgroundLayer.add( imageBackground );
            imageBackground.setZIndex( 0 );

            var imageBoard = new Kinetic.Image( {
                x: 10,
                y: 10,
                image: imageObjBoard,
                width: 800,
                height: 600,
                shadowOffsetX: 20,
                shadowOffsetY: 20,
                shadowBlur: 30,
            } );

            backgroundLayer.add( imageBoard );

            stage.add( backgroundLayer );
            backgroundLayer.setZIndex( 0 );
        };            
        
        imageObjBackground.src = 'Images/wood_background_BlackNWhite_1920x1080.jpg';
        imageObjBoard.src = 'Images/Board800x600.png';
    };

    function createCircle( x, y, color ) {
        var radius = 25;
        var pos = getPlayGroundPosition( x, y );
        var posX = Math.floor( pos.x + ( CONSTANTS.OBJ_SIZE_X / 2 ) );
        var posY = Math.floor( pos.y + ( CONSTANTS.OBJ_SIZE_Y / 2 ) );
        var strokeColor;

        if ( color === 'white' ) {
            strokeColor = 'black';
        } else if ( color === 'black' ) {
            strokeColor = 'white';
        } else {
            strokeColor = 'purple';
        }

        var circle = new Kinetic.Circle( {
            x: posX,
            y: posY,
            radius: radius,
            stroke: strokeColor,            
            fillRadialGradientStartRadius: 0,
            fillRadialGradientEndRadius: radius,
            fillRadialGradientColorStops: [0, 'gray', 1, color],
            draggable: true,
        } );

        playGroundLayer.add( circle );

        circle.addEventListener( 'dragstart', function ( ) {
          
            return {
                x: this.getAbsolutePosition().x,
                y: this.getAbsolutePosition().y
            }
        }, false );
    };
    /////////////////////////

    function createOutOfGameCircle( x, y, color ) {
        var radius = 25;
        var pos = getOutOfGamePiecePosition( x, y );
        var posX = Math.floor( pos.x + ( CONSTANTS.OBJ_SIZE_X / 2 ) );
        var posY = Math.floor( pos.y + ( CONSTANTS.OBJ_SIZE_Y / 2 ) );
        var strokeColor;

        if ( color === 'white' ) {
            strokeColor = 'black';
        } else if ( color === 'black' ) {
            strokeColor = 'white';
        } else {
            strokeColor = 'purple';
        }

        var circle = new Kinetic.Circle( {
            x: posX,
            y: posY,
            radius: radius,
            stroke: strokeColor,
            fillRadialGradientStartRadius: 0,
            fillRadialGradientEndRadius: radius,
            fillRadialGradientColorStops: [0, 'gray', 1, color],
            draggable: true,
        } );

        playersLayer.add( circle );
    };

    ////////////////////////////////
    function createRectangle( x, y, width, height ) {

        //var pos = getPosition( x, y );
        //var posX = Math.floor( pos.x );
        //var posY = Math.floor( pos.y );

        var rect = new Kinetic.Rect( {
            x: x,
            y: y,
            width: width,
            height: height,
            stroke: 'yellow',
            //draggable: true,
        } );

        playersLayer.add( rect );               
    };
         

    function playGround() {
        stage.add( playersLayer );
        playersLayer.setZIndex( 5 );
        stage.add( playGroundLayer );
        playGroundLayer.setZIndex( 10 );
        stage.draw();
    };

    

    return {
        background: background,        
        playGround: playGround,
        createCircle: createCircle,
        createRectangle: createRectangle,
        createOutOfGameCircle: createOutOfGameCircle,
    }
}() );

