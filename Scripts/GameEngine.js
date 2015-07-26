/// <reference path="GameObjects.js" />
/// <reference path="GameDraw.js" />

var GameEngine = ( function () {

    function initGame() {
        var x,
        y,
        color,
        i,
        j,
        lengthBoard,
        lengthField;

        var players = [];
        players.push( Object.create( GameObjects.Player ).init( 'First', 'white' ) );
        players.push( Object.create( GameObjects.Player ).init( 'Second', 'black' ) );

        var board = GameObjects.Board.init( players );

        GameDraw.background();

        lengthBoard = board.length;

        for ( i = 0; i < lengthBoard; i += 1 ) {
            lengthField = board[i].length;

            for ( j = 0; j < lengthField; j += 1 ) {
                x = i;
                y = j;
                color = board[i][j].color;

                GameDraw.createCircle( x, y, color );

            }
        }

        //color = board.GetFirstPlayer.color;

        GameDraw.createRectangle( 850, 110, 100, 200 );
        GameDraw.createRectangle( 850, 310, 100, 200 );

        var len = board.GetPlayers.length;

        for ( i = 0; i < len; i += 1 ) {
            lenngthPlayer = board.GetPlayers[i].getNumberOfPieces;

            for ( j = 0; j < lenngthPlayer; j += 1 ) {
                x = i;
                y = j;
                color = board.GetPlayers[i].color;

                GameDraw.createOutOfGameCircle( x, y, color );

            }
        }

        GameDraw.playGround();
    }        
       

   
    function start() {
        initGame();

        document.addEventListener( "dragstart", function ( event ) {
            console.log( 'x = ' + event.clientX );
            console.log( 'y = ' + event.clientY );
        } );

    }

    return {
        start: start
    }
}() )