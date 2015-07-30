

var GameObjects = ( function () {
    var Board,
        Piece,
        Player,
        Dice,
        BoardField,
        CONSTANTS = {
            BOARD_LENGTH: 26,
            DICE_DEFAULT_NUMBER: 6,
        };
        
    BoardField = ( function () {
        var boardField = Object.create( {} );

        Object.defineProperty( boardField, 'init', {
            value: function () {
                this.availableForBlack = true;
                this.availableForWhite = true;
                this.pieces = [];

                return this;
            }
        } );

        return boardField;
    }() );

    
    Board = ( function () {
        var board = Object.create( {} );

        function putBoardFields( self ) {
            var i,
                boardLength = CONSTANTS.BOARD_LENGTH;

            for ( i = 0; i < boardLength; i += 1 ) {
                self.fields.push( Object.create( BoardField ).init() );
            }

            self.fields[boardLength - 1].isAvailableForBlack = false;
            self.fields[0].isAvailableForWhite = false;

        }

        function addPiecesToBoard( self, color, numberOfPieces, position ) {
            var pieceNumber,
               currentPiece,
               currentPlayer,
               currentPlayerPiece;

            currentPlayer = self.players[0].color === color ? self.players[0] : self.players[1];

            for ( pieceNumber = 0; pieceNumber < numberOfPieces; pieceNumber += 1 ) {

                currentPlayerPiece = currentPlayer.pieces.pop();
                self.fields[position].pieces.push( currentPlayerPiece );
            }
        }

        function putPlayerOnePieces( self ) {
            addPiecesToBoard( self, 'white', 2, 1 );
            addPiecesToBoard( self, 'white', 5, 12 );
            addPiecesToBoard( self, 'white', 3, 17 );
            addPiecesToBoard( self, 'white', 5, 19 );
        }

        function putPlayerTwoPieces( self ) {
            addPiecesToBoard( self, 'black', 2, 24 );
            addPiecesToBoard( self, 'black', 5, 13 );
            addPiecesToBoard( self, 'black', 3, 8 );
            addPiecesToBoard( self, 'black', 5, 6 );
        }

        Object.defineProperty( board, 'init', {
            value: function ( players ) {
                var self = this;

                this.players = [];
                this.fields = [];
                this.dices = [];

                this.players.push( players[0] );
                this.players.push( players[1] );

                this.dices = Object.create( Dices ).init();

                putBoardFields( self );
                putPlayerOnePieces( self );
                putPlayerTwoPieces( self );

                return self;
            }
        } );


        Object.defineProperty( board, 'movePiece', {
            value: function ( fromBoardField, toBoardField ) {

                piece = this.fields[fromBoardField].pieces.pop();
                this.fields[toBoardField].pieces.push( piece );

                return this;
            }
        } );

        return board;
    }() );

   
    Player = ( function () {
        var player = Object.create( {} );
        var CONSTANTS_PLAYER = {
            TOTAL_NUMBER_OF_PIECES: 15,
        };

        Object.defineProperty( player, 'init', {
            value: function ( name, color ) {
                var i,
                    length = CONSTANTS_PLAYER.TOTAL_NUMBER_OF_PIECES;

                this.name = name;
                this.color = color;
                this.isOnTurn = false;
                this.canPlayWithPieces = false;
                this.canMoveOutPiece = false;
                this.canMoveInPiece = false;

                this.pieces = [];

                for ( i = 0; i < length; i += 1 ) {
                    this.pieces.push( Object.create( Piece ).init( this.color ) );
                }

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

        Object.defineProperty( player, 'isOnTurn', {
            get: function () {
                return this._isOnTurn;
            },
            set: function ( value ) {
                this._isOnTurn = value;
            }
        } );

        Object.defineProperty( player, 'canMoveOutPiece', {
            get: function () {
                return this._canMoveOutPiece;
            },
            set: function ( value ) {
                this._canMoveOutPiece = value;
            }
        } );

        Object.defineProperty( player, 'canMoveInPiece', {
            get: function () {
                return this._canMoveInPiece;
            },
            set: function ( value ) {
                this._canMoveInPiece = value;
            }
        } );

        return player;
    }() );

    
    Piece = ( function () {
        var piece = Object.create( {} );

        Object.defineProperty( piece, 'init', {
            value: function ( color ) {
                this.color = color;
                this.isChosen = false;

                return this;
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

    Dice = ( function () {
        var dice = Object.create( {} );

        Object.defineProperty( dice, 'init', {
            value: function () {
                this.size = CONSTANTS.DICE_DEFAULT_NUMBER;
                this.rollDice();

                return this;
            }
        } );

        Object.defineProperty( dice, 'number', {
            get: function () {
                return this._number;
            },
            set: function ( value ) {
                this._number = value;
            }
        } );

        Object.defineProperty( dice, 'rollDice', {
            value: function () {
                this.number = Math.floor( Math.random()
                    * this.size ) + 1;

                return this;
            }
        } );

        return dice;
    }() );

    Dices = ( function () {
        var dices = Object.create( {} );

        Object.defineProperty( dices, 'init', {
            value: function () {

                this.all = [];

                this.all.push( Object.create( Dice ).init() );
                this.all.push( Object.create( Dice ).init() );

                return this;
            }
        } );

        Object.defineProperty( dices, 'rollDices', {
            value: function () {
               
                this.all[0].rollDice();
                this.all[1].rollDice();

                return this;
            }
        } );                

        return dices;
    }() );

    return {
        Board: Board,
        Player: Player,
        Piece: Piece,
        Dices: Dices
    };
}() );

