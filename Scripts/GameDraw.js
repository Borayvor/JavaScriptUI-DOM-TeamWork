﻿/// <reference path="lib/kinetic.js" />
/// <reference path="lib/jquery-2.1.4.js" />
/// <reference path="GameEngine.js" />

var GameDraw = ( function () {

    var backgroundLayer,
        playGroundLayer,
        stage,
        width,
        height,
        CONSTANTS = {
            CIRCLE_RADIUS: 25,
            OBJ_SIZE_X: 60,
            OBJ_SIZE_Y: 52,
            TOP_START_POS_X: 30,
            TOP_START_POS_Y: 31,
            BOTTOM_START_POS_X: 30,
            BOTTOM_START_POS_Y: 537,
        };

    stage = new Kinetic.Stage( {
        container: 'kinetic-container',
        width: 1359,
        height: 639
    } );

    backgroundLayer = new Kinetic.Layer();
    playGroundLayer = new Kinetic.Layer();
    positionLayer = new Kinetic.Layer();
    diceLayer = new Kinetic.Layer();
    playersNamesLayer = new Kinetic.Layer();

    width = stage.getWidth();
    height = stage.getHeight();

    function transformPositionFromBoardCanvasToBoardData( objX, objY ) {
        var x,
            y;

        if ( objY < 310 ) {
            if ( objX < 810 ) {
                x = Math.round( objX / CONSTANTS.OBJ_SIZE_X ) + 12;
            } else {
                x = 25;
            }
        } else {
            if ( objX < 810 ) {
                x = 13 - Math.round( objX / CONSTANTS.OBJ_SIZE_X );
            } else {
                x = 0;
            }
        }

        return {
            x: x,
        }
    }

    function transformPositionFromBoardDataToBoardCanvas( objX, objY ) {
        var x,
            y,
            middleBoard = 0;

        if ( objX === 0 || objX === 25 ) {
            outOfGamePosition = 50;
        }

        if ( objX < 7 || ( 12 < objX && 18 < objX ) ) {
            middleBoard = 39;
        }

        if ( objX === 25 ) {
            x = CONSTANTS.TOP_START_POS_X + ( ( objX - 13 ) * CONSTANTS.OBJ_SIZE_X )
                + middleBoard + outOfGamePosition;
            y = CONSTANTS.TOP_START_POS_Y;
        } else if ( 13 <= objX && objX < 25 ) {
            x = CONSTANTS.TOP_START_POS_X + ( ( objX - 13 ) * CONSTANTS.OBJ_SIZE_X ) + middleBoard;
            y = CONSTANTS.TOP_START_POS_Y + ( objY * CONSTANTS.OBJ_SIZE_Y );
        } else if ( 1 <= objX && objX < 13 ) {
            x = CONSTANTS.BOTTOM_START_POS_X + ( ( 12 - objX ) * CONSTANTS.OBJ_SIZE_X ) + middleBoard;
            y = CONSTANTS.BOTTOM_START_POS_Y - ( objY * CONSTANTS.OBJ_SIZE_Y );
        } else if ( objX === 0 ) {
            x = CONSTANTS.BOTTOM_START_POS_X + ( ( 12 - objX ) * CONSTANTS.OBJ_SIZE_X )
                + middleBoard + outOfGamePosition;
            y = CONSTANTS.BOTTOM_START_POS_Y;
        }

        return {
            x: x,
            y: y,
        }
    };

    function createPlayersNames( player ) {
        var posX = 950,
            posY,
            strokeColor,
            fontSize;

        if ( player.color === 'white' ) {
            posY = 100;
            strokeColor = 'black';
        } else {
            posY = 470;
            strokeColor = 'white';
        }

        if ( player.isOnTurn ) {
            fontSize = 56;
        } else {
            fontSize = 30;
        }

        var text = new Kinetic.Text( {
            x: posX,
            y: posY,
            text: player.name,
            fontSize: fontSize,
            fontStyle: 'bold',
            fontFamily: 'fantasy',
            width: 400,
            fill: player.color,
            stroke: strokeColor,
            align: 'left',
            shadowOffsetX: 10,
            shadowOffsetY: 10,
        } );

        playersNamesLayer.add( text );
    };

    function initBackground() {
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

            stage.add( backgroundLayer );
            backgroundLayer.setZIndex( 0 );
        };

        imageObjBoard.onload = function () {
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
        imageObjBoard.src = 'Images/Board800x600.jpg';
    };

    function createCircle( x, y, color, isChosen ) {
        var radius,
            pos,
            posX,
            posY,
            strokeColor,
            nuberOfPieces = y + 1;

        if ( y > 4 ) {
            y = 0;
        }

        radius = CONSTANTS.CIRCLE_RADIUS;
        pos = transformPositionFromBoardDataToBoardCanvas( x, y );
        posX = Math.floor( pos.x + ( CONSTANTS.OBJ_SIZE_X / 2 ) );
        posY = Math.floor( pos.y + ( CONSTANTS.OBJ_SIZE_Y / 2 ) );

        if ( color === 'white' ) {
            strokeColor = 'black';
        } else if ( color === 'black' ) {
            strokeColor = 'white';
        } else if ( isChosen ) {
            strokeColor = 'yellowgreen';
        }

        var circle = new Kinetic.Circle( {
            x: posX,
            y: posY,
            radius: radius,
            stroke: strokeColor,
            fillRadialGradientStartRadius: 0,
            fillRadialGradientEndRadius: radius,
            fillRadialGradientColorStops: [0, 'gray', 1, color],
            draggable: false,
        } );

        var text = new Kinetic.Text( {
            x: pos.x,
            y: posY - 9,
            text: nuberOfPieces,
            fontSize: 18,
            fontFamily: 'Calibri',
            width: CONSTANTS.OBJ_SIZE_X,
            fill: strokeColor,
            align: 'center'
        } );

        playGroundLayer.add( circle );

        if ( nuberOfPieces > 5 || x === 0 || x === 25 ) {
            playGroundLayer.add( text );
        }
    };

    function createCirclePositionForOutGamePieces( x, y, color ) {
        var radius,
           pos,
           posX,
           posY;

        radius = CONSTANTS.CIRCLE_RADIUS;
        pos = transformPositionFromBoardDataToBoardCanvas( x, y );
        posX = Math.floor( pos.x + ( CONSTANTS.OBJ_SIZE_X / 2 ) );
        posY = Math.floor( pos.y + ( CONSTANTS.OBJ_SIZE_Y / 2 ) );

        var circle = new Kinetic.Circle( {
            x: posX,
            y: posY,
            radius: radius,
            stroke: color,
        } );

        backgroundLayer.add( circle );
    }

    function createRectangleListener( board, x, y ) {
        var pos,
            posX,
            posY,
            posYTop,
            posYBottom,
            height;

        pos = transformPositionFromBoardDataToBoardCanvas( x, y );
        posX = Math.floor( pos.x );
        posYTop = Math.floor( pos.y );
        posYBottom = Math.floor( pos.y + CONSTANTS.OBJ_SIZE_Y );

        if ( x > 12 ) {
            posY = posYTop;
            height = x === 25 ? 1 : 5;
        } else {
            posY = posYBottom;
            height = x === 0 ? -1 : -5;
        }

        var rect = new Kinetic.Rect( {
            x: posX,
            y: posY,
            width: CONSTANTS.OBJ_SIZE_X,
            height: ( CONSTANTS.OBJ_SIZE_Y * height ),
            //fill:'yellow',
        } );

        positionLayer.add( rect );

        rect.addEventListener( 'click', function () {
            var x,
                y,
                pos;

            pos = transformPositionFromBoardCanvasToBoardData( rect.getAbsolutePosition().x,
                rect.getAbsolutePosition().y );

            playGroundLayer.destroyChildren();

            GameEngine.update( board, pos.x );
        } );
    };

    function createDicesButton( board ) {
        var diceOne = new Image(),
            diceTwo = new Image();

        diceOne.onload = function () {
            var diceImage = new Kinetic.Image( {
                x: 950,
                y: 280,
                image: diceOne,
                width: 64,
                height: 64,
                shadowOffsetX: 10,
                shadowOffsetY: 10
            } );

            diceLayer.add( diceImage );
            stage.add( diceLayer );
        };

        diceTwo.onload = function () {
            var diceImage = new Kinetic.Image( {
                x: 1024,
                y: 280,
                image: diceTwo,
                width: 64,
                height: 64,
                shadowOffsetX: 10,
                shadowOffsetY: 10
            } );

            diceLayer.add( diceImage );
            stage.add( diceLayer );
        };

        diceOne.src = 'Images/dieWhite' + board.dices.all[0].number + '.png';
        diceTwo.src = 'Images/dieWhite' + board.dices.all[1].number + '.png';

        diceLayer.addEventListener( 'click', function () {

            GameEngine.rollDices( board );

            diceOne.src = 'Images/dieWhite' + board.dices.all[0].number + '.png';
            diceTwo.src = 'Images/dieWhite' + board.dices.all[1].number + '.png';
        } );
    }

    function animateRollingDices() {
        document.getElementById( 'dices' ).style.display = 'inline';

        setTimeout( function () {
            $( '#dice1' ).attr( 'src', 'Images/dieWhite1.png' );
        }, 50 );
        setTimeout( function () {
            $( '#dice1' ).attr( 'src', 'Images/dieWhite2.png' );
        }, 150 );
        setTimeout( function () {
            $( '#dice1' ).attr( 'src', 'Images/dieWhite3.png' );
        }, 250 );
        setTimeout( function () {
            $( '#dice1' ).attr( 'src', 'Images/dieWhite4.png' );
        }, 350 );
        setTimeout( function () {
            $( '#dice1' ).attr( 'src', 'Images/dieWhite5.png' );
        }, 450 );
        setTimeout( function () {
            $( '#dice1' ).attr( 'src', 'Images/dieWhite6.png' );
        }, 550 );

        setTimeout( function () {
            $( '#dice2' ).attr( 'src', 'Images/dieWhite1.png' );
        }, 100 );
        setTimeout( function () {
            $( '#dice2' ).attr( 'src', 'Images/dieWhite2.png' );
        }, 220 );
        setTimeout( function () {
            $( '#dice2' ).attr( 'src', 'Images/dieWhite3.png' );
        }, 340 );
        setTimeout( function () {
            $( '#dice2' ).attr( 'src', 'Images/dieWhite4.png' );
        }, 460 );
        setTimeout( function () {
            $( '#dice2' ).attr( 'src', 'Images/dieWhite5.png' );
        }, 580 );
        setTimeout( function () {
            $( '#dice2' ).attr( 'src', 'Images/dieWhite6.png' );
        }, 700 );

        setTimeout( function () {
            document.getElementById( 'dices' ).style.display = 'none';
        }, 710 )
    }

    function initGame( board ) {
        var x,
            len;

        initBackground();
        createDicesButton( board );

        len = board.fields.length;

        for ( x = 0; x < len; x += 1 ) {

            createRectangleListener( board, x, 0 );
        }

        createCirclePositionForOutGamePieces( 25, 0, 'yellow' );
        createCirclePositionForOutGamePieces( 0, 0, 'yellow' );

        createPlayersNames( board.players[0] );
        createPlayersNames( board.players[1] );

        updatePlayGround( board );

        stage.add( playersNamesLayer );
        stage.add( positionLayer );
        stage.add( playGroundLayer );

        playGroundLayer.setZIndex( 10 );
        positionLayer.setZIndex( 10 );
    };


    function updatePlayGround( board ) {
        var x,
            y,
            lengthBoard,
            lengthField,
            currentPiece;

        lengthBoard = board.fields.length;

        for ( x = 0; x < lengthBoard; x += 1 ) {
            lengthField = board.fields[x].pieces.length;

            for ( y = 0; y < lengthField; y += 1 ) {
                currentPiece = board.fields[x].pieces[y];
                createCircle( x, y, currentPiece.color, currentPiece.isChosen );
            }
        }

        playGroundLayer.draw();
    }

    function updatePlayerNames( board ) {
        playersNamesLayer.destroyChildren();

        createPlayersNames( board.players[0] );
        createPlayersNames( board.players[1] );

        playersNamesLayer.draw();
    }

    var fadeIn = function ( shape ) {
        var op = shape.getOpacity();
        op = op + 0.1 >= 1 ? 1 : op + 0.1;
        shape.setOpacity( op );
        shape.getLayer().draw();
        if ( op !== 1 ) {
            setTimeout( function () {
                fadeIn( shape );
            }, 120 );
        }
    };

    var fadeOut = function ( shape ) {
        var op = shape.getOpacity();
        op = op - 0.1 <= 0.1 ? 0.1 : op - 0.1;
        shape.setOpacity( op );
        shape.getLayer().draw();
        if ( op !== 0.1 ) {
            setTimeout( function () {
                fadeOut( shape );
            }, 120 );
        }
    };


    return {
        initGame: initGame,
        updatePlayGround: updatePlayGround,
        updatePlayerNames: updatePlayerNames,
        animateRollingDices: animateRollingDices,
    }
}() );
