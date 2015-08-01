/// <reference path="GameDraw.js" />
/// <reference path="GameObjects.js" />
/// <reference path="MenuScripts.js" />

var GameEngine = ( function () {    
    var fromToPos = [];
    var possibleMoves = [];
    var currentSizeOfDice;
    var isGameStarted;
    var diceSound = new Audio( 'Sounds/dice.wav' );

    function start( firstPlayerName, secondPlayerName ) {
        var board;
        var players = [];

        players.push( Object.create( GameObjects.Player ).init( firstPlayerName, 'white' ) );
        players.push( Object.create( GameObjects.Player ).init( secondPlayerName, 'black' ) );
         
        isGameStarted = false;
       
        board = Object.create( GameObjects.Board ).init( players );

        GameDraw.initGame( board );

        setTimeout( function () {
            swal( 'Click dices to chose who is first !' );
        }, 9000 );
    }

    function update( board, numberOfBoardField ) {

        if ( fromToPos.length === 0 ) {
            fromToPos.push( numberOfBoardField );
            return;
        } else if ( fromToPos.length < 2 ) {
            fromToPos.push( numberOfBoardField );
        }

        movePiece( board, fromToPos[0], fromToPos[1] );
    }

    function selectTheFirstPlayer( board ) {
        var currentPlayer;

        if ( board.dices.all[0].number > board.dices.all[1].number ) {
            board.players[0].isOnTurn = true;
            currentPlayer = board.players[0];
        } else if ( board.dices.all[0].number < board.dices.all[1].number ) {
            board.players[1].isOnTurn = true;
            currentPlayer = board.players[1];
        } else {
            return;
        }

        setTimeout( function () {
            swal( currentPlayer.name + " begins !", "Good luck!" );
            GameDraw.updatePlayerNames( board );
        }, 600 );

        isGameStarted = true;
    }

    function rollDices( board ) {
        var currentPlayer,
            arrayOfDices,
            i,
            j;

        if ( isGameStarted === true ) {
            currentPlayer = board.players[0].isOnTurn === true ? board.players[0] : board.players[1];

            if ( currentPlayer.canPlayWithPieces ) {

                swal( 'The ' + currentPlayer.color + ' Player can not roll again !' );
                return;
            }

            currentPlayer.canPlayWithPieces = true;
        }

        diceSound.play();

        possibleMoves = [];

        GameDraw.animateRollingDices();
        board.dices.rollDices();

        if ( isGameStarted !== true ) {
            selectTheFirstPlayer( board );
            return;
        }

        if ( board.dices.all[0].number !== board.dices.all[1].number ) {
            arrayOfDices = [];

            arrayOfDices.push( board.dices.all[0].number );
            arrayOfDices.push( board.dices.all[1].number );
            possibleMoves.push( arrayOfDices );
        } else {
            arrayOfDices = [];

            for ( i = 0; i < 4; i += 1 ) {

                arrayOfDices.push( board.dices.all[0].number );
            }

            possibleMoves.push( arrayOfDices );
        }

        currentSizeOfDice = possibleMoves.length - 1;
    }
       
    function movePiece( board, from, to ) {

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

        if ( currentPlayer.isOnTurn === false && nextPlayer.isOnTurn === false ) {

            fromToPos = [];

            swal( 'Roll the dices to choose who is first !' );
            return;
        }

        if ( currentPlayer.isOnTurn === false ) {

            fromToPos = [];

            swal( 'Is not ' + nextPlayer.color.toUpperCase() + ' Player\'s turn !' );
            return;
        }

        if ( currentPlayer.color !== board.fields[from].pieces[0].color ) {

            fromToPos = [];

            swal( 'Is not ' + nextPlayer.color.toUpperCase() + ' Player\'s turn !' );
            return;
        }

        if ( currentPlayer.canPlayWithPieces === false ) {

            fromToPos = [];

            swal( 'The ' + currentPlayer.color.toUpperCase() + ' Player can not do move yet !' );
            return;
        }

        if ( board.fields[from].pieces.length === 0 ) {

            fromToPos = [];

            swal( 'No Pieces at position ' + from );
            return;
        }

        if ( board.fields[to].pieces.length > 1
            && board.fields[to].pieces[0].color !== board.fields[from].pieces[0].color ) {

            fromToPos = [];

            swal( 'Can not move to position ' + to );
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

            swal( 'Can not move to position ' + to );
            return;
        }

        currentArrayOfMovesLength = possibleMoves[currentSizeOfDice].length;
        currentMove = possibleMoves[currentSizeOfDice][currentArrayOfMovesLength - 1];

        if ( ( currentPlayer.color === 'white' && from + currentMove !== to )
            || ( currentPlayer.color === 'black' && from - currentMove !== to ) ) {

            fromToPos = [];

            swal( 'Can not move to position ' + to );
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
            diceSound.currentTime = 0;
        }

        fromToPos = [];
        GameDraw.updatePlayGround( board );
    }
      
    

    return {
        start: start,
        update: update,
        rollDices: rollDices,
    };
}() );
