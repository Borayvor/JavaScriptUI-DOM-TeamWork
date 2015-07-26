/// <reference path="GameObjects.js" />
/// <reference path="GameDraw.js" />
/// <reference path="GameEngine.js" />

( function () {
    GameEngine.start();

    GameObjects.Dice.init();
    GameObjects.Dice.roll();
    
    GameDraw.createDice(387, 100);

    GameDraw.createDice( 387, 490 );
    
    console.log( 'test' );

    //console.log( GameObjects.Dice.number );
}() )