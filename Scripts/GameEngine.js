/// <reference path="GameDraw.js" />
/// <reference path="GameObjects.js" />
/// <reference path="MenuScripts.js" />

var GameEngine = ( function () {
    var board,
        fromToPos = [];       

    function start( firstPlayerName, secondPlayerName ) {
        var x,
            y,
            color,
            i,
            j,
            lengthBoard,
            lengthField;                   
       
        var players = [];
        players.push( Object.create( GameObjects.Player ).init( firstPlayerName, 'white' ) );
        players.push( Object.create( GameObjects.Player ).init( secondPlayerName, 'black' ) );
                      
        players[0].isOnTurn = true;

        board = Object.create( GameObjects.Board ).init( players );

        // TESTING Dices:
        //dices.rollDices();
        //console.log('dices.rollDices() - [' + dices.numbers + ']');
        //console.log('dices.removeNumber(' + dices.numbers[0] + ') - ');
        //dices.usedNumber(dices.numbers[0]);
        //console.log(dices.numbers);
        //console.log('dices.clearNumbers() - ');
        //dices.clearNumbers();
        //console.log(dices.numbers);
        // END OF TEST;

        GameDraw.initGame( board );
    }

    function updatePlayGround() {
        GameDraw.updatePlayGround( board );
    }

    function movePiece( from, to ) {

        board.movePiece( from, to );
        fromToPos = [];
        updatePlayGround();
    }

    function rollDices() {
        board.dices.rollDices();
    }

    function update( numberOfBoardField ) {

        if ( fromToPos.length === 0 ) {
            fromToPos.push( numberOfBoardField );
            return;
        } else if ( fromToPos.length < 2 ) {
            fromToPos.push( numberOfBoardField );
        }

        movePiece( fromToPos[0], fromToPos[1] );



        // currentPlayer = GetCurrentPlayer - depending on player.isOnTurn or isFirstPlayerOnTurn

        // flag hasThrownDice -> if not - throw dice(allowedMoves = diceResult, currentPlayerMoves = 0); else - continue

        // if (currentPlayer.hasHitPiece) -> Call function(s) to deal with this situation.
        // if can't put piece -> playerMoves = allowedMoves

        // if ((currentPlayerMoves < allowedMoves) && hasMovedPiece (sets to true when called from onDrag event on piece)

        // Subcases: move from position to position/ collect piece
        // Call function(s) to deal with this situation. -> hasMovedPiece = false, currentPlayerMoves++;

        // Missed logic?

        // if current player has no pieces on the board -> He wins.

        // if (playerMoves === allowedMoves) -> change player, hasThrownDice = false




    }       

    return {
        start: start,
        update: update,
        rollDices: rollDices,
    };
}() );
