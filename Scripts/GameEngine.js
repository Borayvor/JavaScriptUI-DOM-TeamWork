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

        GameDraw.background();

        lengthBoard = board.length;

        for (x = 0; x < lengthBoard; x += 1) {
            lengthField = board[x].length;                       

            for (y = 0; y < lengthField; y += 1) {               
                color = board[x][y].color;

                GameDraw.createCircle(x, y, color);
            }

            if (x < 13 ) {
                GameDraw.createRectangle( x, 4 );
            } else {
                GameDraw.createRectangle( x, 0 );
            }
        }

        GameDraw.playGround();
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

    function updatePlayGround() {
        var x,
            y,
            lengthBoard = board.length,
            lengthField;

        for ( x = 0; x < lengthBoard; x += 1 ) {
            lengthField = board[x].length;

            for ( y = 0; y < lengthField; y += 1 ) {
                color = board[x][y].color;

                GameDraw.createCircle( x, y, color );
            }
        }

        GameDraw.updatePlayGround();
    }
   
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
