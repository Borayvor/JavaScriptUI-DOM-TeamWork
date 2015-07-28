/// <reference path="GameDraw.js" />
/// <reference path="GameObjects.js" />

var GameEngine = ( function () {
    var board;

    function start() {
        var x,
            y,
            color,
            lengthBoard,
            lengthField;

        var players = [];
        players.push(Object.create(GameObjects.Player).init('First', 'white'));
        players.push(Object.create(GameObjects.Player).init('Second', 'black'));

        // board = Object.create(GameObjects.Board).init(players);
        board = Object.create( GameObjects.Board ).init();

        //// логиката еизнесена в  GameDraw.initGame
        GameDraw.initGame( board );        
    }

    //// логиката еизнесена в  GameDraw.updatePlayGround
    function updatePlayGround() {

        GameDraw.updatePlayGround( board );
    }


    function update(){
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

    
   //// тестване на евенти
    function test(x, y) {
        //alert( x + ' ' + y );
       
        board.movePiece( 6, 7 );
       
        updatePlayGround();        
    }

    return {
        start: start,
        update: update,
        test: test,
    };
}());

// All events will call GameEngine.Update() and GameDraw.Update().
