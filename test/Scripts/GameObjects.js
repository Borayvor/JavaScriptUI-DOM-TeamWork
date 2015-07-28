﻿var GameObjects = ( function () {
    var Board,
        Piece,
        Player,
        BoardField,
        CONSTANTS = {};

    // pole ot igralnoto pole
    BoardField = (function () {
        var boardField = Object.create([]);

        Object.defineProperty(boardField, 'init', {
            value: function () {
                return this;
            }
        });

        return boardField;
    }());

    // igralno pole
    Board = ( function () {
        var board = Object.create([]);

        // Inner helper functions.
        function putBoardFields(self) {
            var i,
                boardLength = 26;

            for (i = 0; i < boardLength; i += 1) {
                self.push(Object.create(BoardField).init());
            }
        }

        function addPiecesToBoard(self, color, numberOfPieces, position) {
            var pieceNumber, currentPiece;

            for (pieceNumber = 0; pieceNumber < numberOfPieces; pieceNumber += 1) {
                currentPiece = Object.create(Piece).init(color);
                self[position].push(currentPiece);
            }
        }

        function putPlayerOnePieces(self) {
            addPiecesToBoard(self, 'white', 2, 1);
            addPiecesToBoard(self, 'white', 5, 12);
            addPiecesToBoard(self, 'white', 3, 17);
            addPiecesToBoard( self, 'white', 5, 19 );

            //// test
            addPiecesToBoard( self, 'white', 3, 0 );
        }

        function putPlayerTwoPieces(self) {
            addPiecesToBoard(self, 'black', 2, 24);
            addPiecesToBoard(self, 'black', 5, 13);
            addPiecesToBoard(self, 'black', 3, 8);
            addPiecesToBoard( self, 'black', 7, 6 );////5, 6 - original

            //// test
            addPiecesToBoard( self, 'black', 3, 25 );
        }

        Object.defineProperty(board, 'init', {
            value: function () {
                var self = this;
                putBoardFields(self);
                putPlayerOnePieces(self);
                putPlayerTwoPieces(self);
                return this;
            }
        });

        // Called from update when moving. Ex.: gameBoard.movePiece({color:white}, 2, 5);
        Object.defineProperty(board, 'movePiece', {
            value: function (fromBoardField, toBoardField) {
                var piece = this[fromBoardField].pop();
                this[toBoardField].push(piece);
                return this;
            }
        });

        return board;
    }() );

    // igrach
    Player = (function () {
        var player = Object.create({});
        //var CONSTANTS_PLAYER = {
        //    TOTAL_NUMBER_OF_PIECES: 15,
        //    INIT_X: 0,
        //    INIT_Y: 0
        //};

        Object.defineProperty(player, 'init', {
            value: function (name, color) {
                this.name = name;
                this.color = color;
                //this.isOnTurn = false;

                return this;
            }
        });

        Object.defineProperty(player, 'name', {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
            }
        });

        Object.defineProperty(player, 'color', {
            get: function () {
                return this._color;
            },
            set: function (value) {
                this._color = value;
            }
        });

        //Object.defineProperty(player, 'isOnTurn', {
        //    get: function () {
        //        return this._isOnTurn;
        //    },
        //    set: function (value) {
        //        this._isOnTurn = value;
        //    }
        //});

        return player;
    }());

    // pulowe
    Piece = ( function () {
        var piece = Object.create({});

        Object.defineProperty(piece, 'init', {
            value: function (color) {
                this.color = color;                

                return this;
            }
        });

        Object.defineProperty(piece, 'color', {
            get: function () {
                return this._color;
            },
            set: function (value) {
                this._color = value;
            }
        });
              
        return piece;
    }() );


    return {
        Board: Board,
        Player: Player,
        Piece: Piece
    };

}());
