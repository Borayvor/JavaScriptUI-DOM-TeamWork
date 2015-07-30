/// <reference path="GameDraw.js" />
/// <reference path="GameObjects.js" />
/// <reference path="MenuScripts.js" />

var GameEngine = ( function () {
    var board;
    var fromToPos = [];
    var possibleMoves = [];
    var currentSizeOfDice;

    function start( firstPlayerName, secondPlayerName ) {                      
        var players = [];

        players.push( Object.create( GameObjects.Player ).init( firstPlayerName, 'white' ) );
        players.push( Object.create( GameObjects.Player ).init( secondPlayerName, 'black' ) );
                      
        players[0].isOnTurn = true;

        board = Object.create( GameObjects.Board ).init( players );

        GameDraw.initGame( board );
    }

    function rollDices() {
        var currentPlayer,
            arrayOfDices,
            i,
            j;

        currentPlayer = board.players[0].isOnTurn === true ? board.players[0] : board.players[1];

        if ( currentPlayer.canPlayWithPieces ) {

            //// test
            alert( 'The ' + currentPlayer.color + ' Player can not roll !' );
            return;
        }

        possibleMoves = [];

        GameDraw.animateRollingDices();
        board.dices.rollDices();
        currentPlayer.canPlayWithPieces = true;

        if ( board.dices.all[0].number !== board.dices.all[1].number ) {
            arrayOfDices = [];

            arrayOfDices.push( board.dices.all[0].number );
            arrayOfDices.push( board.dices.all[1].number );
            possibleMoves.push( arrayOfDices );
        } else {   
            for ( i = 0; i < board.dices.all[0].number; i += 1 ) {
                arrayOfDices = [];

                for ( j = 0; j < 4; j += 1 ) {

                    arrayOfDices.push( i + 1 );
                }

                possibleMoves.push( arrayOfDices );
            }
        }

        currentSizeOfDice = possibleMoves.length - 1;
    }

    function updatePlayGround() {
        GameDraw.updatePlayGround( board );
    }

    function movePiece( from, to ) {

        var currentPlayer,
            nextPlayer,
            boardLength = board.fields.length,
            currentMove,
            currentArrayOfMovesLength;

        if ( board.players[0].isOnTurn === true ) {
            currentPlayer = board.players[0];
            nextPlayer = board.players[1];
        } else {
            currentPlayer = board.players[1];
            nextPlayer = board.players[0];
        }

        if ( currentPlayer.isOnTurn === false ) {

            fromToPos = [];
            ////test
            alert( 'Is not ' + nextPlayer.color.toUpperCase() + ' Player\'s turn !' );
            return;
        }

        if ( currentPlayer.color !== board.fields[from].pieces[0].color ) {

            fromToPos = [];
            ////test
            alert( 'Is not ' + nextPlayer.color.toUpperCase() + ' Player\'s turn !' );
            return;
        }

        if ( currentPlayer.canPlayWithPieces === false ) {

            fromToPos = [];
            ////test
            alert( 'The ' + currentPlayer.color.toUpperCase() + ' Player can not do move yet !' );
            return;
        }

        if ( board.fields[from].pieces.length === 0 ) {

            fromToPos = [];
            ////test
            alert( 'No Pieces at position ' + from );
            return;
        }

        if ( board.fields[to].pieces.length > 1
            && board.fields[to].pieces[0].color !== board.fields[from].pieces[0].color ) {

            fromToPos = [];
            ////test
            alert( 'Can not move to position ' + to );
            return;
        }

        if ( currentPlayer.canMoveOutPiece === false ) {
            if ( currentPlayer.color === 'white' ) {
                board.fields[boardLength - 1].isAvailableForWhite = false;
            } else {
                board.fields[0].isAvailableForBlack = false;
            }
        }

        if ( ( board.fields[to].isAvailableForBlack === false
            && board.fields[from].pieces[0].color === 'black' )
            || ( board.fields[to].isAvailableForWhite === false
            && board.fields[from].pieces[0].color === 'white' ) ) {

            fromToPos = [];
            ////test
            alert( 'Can not move to position ' + to );
            return;
        }

        currentArrayOfMovesLength = possibleMoves[currentSizeOfDice].length;
        currentMove = possibleMoves[currentSizeOfDice][currentArrayOfMovesLength - 1];

        if ( ( currentPlayer.color === 'white' && from + currentMove !== to )
            || ( currentPlayer.color === 'black' && from - currentMove !== to ) ) {

            fromToPos = [];
            ////test
            alert( 'Can not move to position ' + to );
            return;
        }

        board.movePiece( from, to );

        possibleMoves[currentSizeOfDice].pop();

        if ( possibleMoves[currentSizeOfDice].length === 0 ) {
            currentSizeOfDice -= 1;
        }

        if ( currentSizeOfDice < 0 ) {
            currentPlayer.isOnTurn = false;
            nextPlayer.isOnTurn = true;
            currentPlayer.canPlayWithPieces = false;
            GameDraw.updatePlayerNames( board );
        }

        fromToPos = [];
        updatePlayGround();
    }
      
    function update( numberOfBoardField ) {

        if ( fromToPos.length === 0 ) {
            fromToPos.push( numberOfBoardField );
            return;
        } else if ( fromToPos.length < 2 ) {
            fromToPos.push( numberOfBoardField );
        }

        movePiece( fromToPos[0], fromToPos[1] );
    }       

    return {
        start: start,
        update: update,
        rollDices: rollDices,
    };
}() );
