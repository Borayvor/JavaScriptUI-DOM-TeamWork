/// <reference path="GameObjects.js" />
/// <reference path="GameDraw.js" />

( function () {

    //var draw = GameDraw.background();
    var players = [];
    players.push( Object.create( GameObjects.Player).init( 'First', 'white' ) );
    players.push( Object.create( GameObjects.Player).init( 'Second', 'black' ) );

    var initBoard = GameObjects.Board.init( players );

    console.log( 'test' );
}() )