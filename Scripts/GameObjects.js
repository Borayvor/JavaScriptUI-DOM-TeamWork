
var GameObjects = ( function () {
    var Board,
        Piece,
        Player,
        BoardField;

    // pole ot igralnoto pole
    BoardField = ( function () {
        var boardField = Object.create( [] );

        Object.defineProperty( boardField, 'init', {
            value: function () {

                return this;
            }
        } );

        Object.defineProperty( boardField, 'add', {
            value: function ( piece ) {
                this.push( piece );

                return this;
            }
        } );

        return boardField;
    }() );

    // igralno pole
    Board = ( function () {
        var board = Object.create( [] );
        var boardLength = 24;

        Object.defineProperty( board, 'init', {
            value: function ( players ) {
                var i;

                this._players = players;

                for ( i = 0; i < boardLength; i += 1 ) {
                    board.push( Object.create( BoardField ).init() );
                }
                
                return this;
            }
        } );

        Object.defineProperty( board, 'getPiecePosition', {
            value: function ( piece ) {




                return this;
            }
        } );

        return board;
    }() );

    // igrach
    Player = ( function () {
        var player = Object.create( {} );
        var CONSTANTS = {
            TOTAL_NUMBER_OF_PIECES: 15,
            INIT_X: 0,
            INIT_Y: 0,
        }

        Object.defineProperty( player, 'init', {
            value: function ( name, color ) {
                this.name = name;
                this.color = color;
                this.isPlayerTurn = false;
                this.pieces = function () {
                    var playerPieces = [],
                        i,
                        len = CONSTANTS.TOTAL_NUMBER_OF_PIECES;

                    for ( i = 0; i < len; i += 1 ) {
                        playerPieces.push( Object
                            .create( Piece).init( CONSTANTS.INIT_X, CONSTANTS.INIT_Y, color ) 
                             );
                    }

                    return playerPieces;
                };

                return this;
            }
        } );

        Object.defineProperty( player, 'name', {
            get: function () {
                return this._name;
            },
            set: function ( value ) {
                this._name = value;
            }
        } );

        Object.defineProperty( player, 'color', {
            get: function () {
                return this._color;
            },
            set: function ( value ) {
                this._color = value;
            }
        } );

        Object.defineProperty( player, 'isPlayerTurn', {
            get: function () {
                return this._isPlayerTurn;
            },
            set: function ( value ) {
                this._isPlayerTurn = value;
            }
        } );

        return player;
    }() );

    // pulowe
    Piece = ( function () {
        var piece = Object.create( {} );
        var radiusSize = 24;

        Object.defineProperty( piece, 'init', {
            value: function ( x, y, color, radius ) {
                this.x = x;
                this.y = y;
                this.color = color;
                this._radius = radius || radiusSize;
                this.isChosen = false;

                return this;
            }
        } );

        Object.defineProperty( piece, 'x', {
            get: function () {
                return this._x;
            },
            set: function ( value ) {
                this._x = value;
            }
        } );

        Object.defineProperty( piece, 'y', {
            get: function () {
                return this._y;
            },
            set: function ( value ) {
                this._y = value;
            }
        } );

        Object.defineProperty( piece, 'color', {
            get: function () {
                return this._color;
            },
            set: function ( value ) {
                this._color = value;
            }
        } );

        Object.defineProperty( piece, 'radius', {
            get: function () {
                return this._radius;
            },
            set: function ( value ) {
                this._radius = value;
            }
        } );

        Object.defineProperty( piece, 'isChosen', {
            get: function () {
                return this._isChosen;
            },
            set: function ( value ) {
                this._isChosen = value;
            }
        } );

        return piece;
    }() );

    
    return {
        Board: Board,
        Player: Player,
        Piece: Piece,
    }

}() )

