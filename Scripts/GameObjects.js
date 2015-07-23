var GameObjects = ( function () {
    var Board,
        Piece,
        Player,
        BoardField;

    BoardField = ( function () {
        var boardField = Object.create( [] );

        Object.defineProperty( boardField, 'init', {
            value: function () {
                
                return this;
            }
        } );

        Object.defineProperty( boardField, 'add', {
            value: function (piece) {
                this.push( piece );

                return this;
            }
        } );       

        return boardField;
    }() );

    Board = ( function () {
        var board = Object.create( [] );        
        var boardLength = 24;

        Object.defineProperty( board, 'init', {
            value: function (width, height) {
                var i;

                this.width = width;
                this.height = height;

                for ( i = 0; i < boardLength; i += 1 ) {
                    board.push( Object.create(BoardField.init()) );
                }

                return this;
            }
        } );

        Object.defineProperty( board, 'getPiecePosition', {
            value: function (piece) {
                

               

                return this;
            }
        } );

        return board;
    }() );

    Piece = ( function () {
        var piece = Object.create( {} );
        var radiusSize = 24;

        Object.defineProperty( piece, 'init', {
            value: function ( x, y, color ) {
                this.x = x;
                this.y = y;
                this.color = color;
                this._radius = radiusSize;

                return this;
            }
        } );

        Object.defineProperty( piece, 'x', {
            get: function () {
                return this._x;
            },
            set: function ( value ) {
                this._x = value;

                return this;
            }
        } );

        Object.defineProperty( piece, 'y', {
            get: function () {
                return this._y;
            },
            set: function ( value ) {
                this._y = value;

                return this;
            }
        } );

        Object.defineProperty( piece, 'color', {
            get: function () {
                return this._color;
            },
            set: function ( value ) {
                this._color = value;

                return this;
            }
        } );

        Object.defineProperty( piece, 'radius', {
            get: function () {
                return this._radius;
            }
        } );

        return piece;
    }() );

    return {
        Board: Board,
        Piece: Piece
    }

}() )