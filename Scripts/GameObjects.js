

var GameObjects = ( function () {
    var Board,
        Piece,
        Player,
        Dice,
        BoardField,
        boardLength = 26,
        CONSTANTS = {
            DICE_DEFAULT_NUMBER: 6
        };

    // pole ot igralnoto pole
    BoardField = ( function () {
        var boardField = Object.create( {} );

        Object.defineProperty( boardField, 'init', {
            value: function () {
                this.availableForBlack = true,
                    this.availableForWhite = true,
                    this.pieces = [];

                return this;
            }
        } );

        return boardField;
    }() );

    // igralno pole
    Board = ( function () {
        var board = Object.create( [] );

        // Inner helper functions.
        function putBoardFields( self ) {
            var i;

            for ( i = 0; i < boardLength; i += 1 ) {
                self.push( Object.create( BoardField ).init() );
            }

            self[0].availableForBlack = false;
            self[boardLength - 1].availableForWhite = false;

        }

        function addPiecesToBoard( self, color, numberOfPieces, position ) {
            var pieceNumber, currentPiece;

            for ( pieceNumber = 0; pieceNumber < numberOfPieces; pieceNumber += 1 ) {
                currentPiece = Object.create( Piece ).init( color );
                self[position].pieces.push( currentPiece );
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
            value: function (players) {
                var self = this;

                this.players = players;

                putBoardFields( self );
                putPlayerOnePieces( self );
                putPlayerTwoPieces( self );
                
                return this;
            }
        } );

    
        Object.defineProperty( board, 'movePiece', {
            value: function ( fromBoardField, toBoardField ) {
                var piece,
                    currentPlayer;

                if ( this[fromBoardField].pieces.length === 0 ) {

                    ////test
                    alert( 'No Pieces at position ' + fromBoardField );
                    return this;                    
                }

                currentPlayer = this.players[0].isOnTurn === true ? this.players[0] : this.players[1];

                if ( currentPlayer.color !== this[fromBoardField].pieces[0].color ) {
                
                    ////test
                    alert( 'Can not move from position ' + fromBoardField );
                    return this;
                }

                if ( this[toBoardField].pieces.length > 1
                    && this[toBoardField].pieces[0].color !== this[fromBoardField].pieces[0].color ) {

                    ////test
                    alert( 'Can not move to position ' + toBoardField );
                    return this;                    
                }
                
                piece = this[fromBoardField].pieces.pop();
                this[toBoardField].pieces.push( piece );

                return this;
            }
        } );

        return board;
    }() );

    // igrach
    Player = ( function () {
        var player = Object.create( {} );
        //var CONSTANTS_PLAYER = {
        //    TOTAL_NUMBER_OF_PIECES: 15,
        //    INIT_X: 0,
        //    INIT_Y: 0
        //};

        Object.defineProperty( player, 'init', {
            value: function ( name, color ) {
                this.name = name;
                this.color = color;
                this.isOnTurn = false;
                this.canMoveOutPiece = false;
                this.canMoveInPiece = false;

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

    // pulowe
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
                this.number = CONSTANTS.DICE_DEFAULT_NUMBER;
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
                return this.number = Math.floor( Math.random() * 6 ) + 1;
            }
        } );

        return dice;
    }() );

    Dices = ( function () {
        var dices = Object.create( {} ),
            firstDice = Object.create( Dice.init() ),
            secondDice = Object.create( Dice.init() );

        Object.defineProperty( dices, 'init', {
            value: function () {
                this.numbers = [];
                return this;
            }
        } );

        Object.defineProperty( dices, 'rollDices', {
            value: function () {
                this.numbers.push( firstDice.rollDice() );
                this.numbers.push( secondDice.rollDice() );
                if(this.numbers[0] === this.numbers[1]) {
                    this.numbers.push(this.numbers[0]);
                    this.numbers.push(this.numbers[0]);
                }
            }
        } );

        Object.defineProperty( dices, 'usedNumber', {
            value: function ( number ) {
                var index = this.numbers.indexOf( number );
                this.numbers.splice( index, 1 );
            }
        } );

        // in case the player doesnt have any moves with those Dice numbers
        Object.defineProperty( dices, 'clearNumbers', { 
            value: function () {
                this.numbers.splice( 0, this.numbers.length );
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

