/// <reference path="MenuScripts.js" />


window.onload = ( function () {

    var canvas = document.getElementById( 'the-canvas' ),
                ctx = canvas.getContext( '2d' ),
                width = canvas.width,
                height = canvas.height,
                image,
                imageReady;

    canvas.style.backgroundColor = 'black';

    image = new Image();
    imageReady = false;

    image.src = "Images/VesperLogo.png";

    function drawImage() {
        ctx.drawImage( image, 0, 0 );
    }

    var i = 1;
    var text = 'Brought to you by James Bond and a few ninjas.';
    ctx.fillStyle = 'white';
    ctx.font = 'normal bold 1.2em cursive';
    function drawIntro() {
        ctx.clearRect( 0, 0, width, height );
        ctx.fillText( text.substr( 0, i ), width / 4 - text.length, height / 2 + height / 6 );
        i += 1;
        if ( i <= text.length ) {
            requestAnimationFrame( drawIntro );
        }
        ctx.globalAlpha = i * 2 / 100 + 0.03;
        ctx.drawImage( image, 250, 0, 235, 235 );
        if ( i > text.length ) {
            setTimeout( FadeOutIntro, 2000 );
        }
    }
    requestAnimationFrame( drawIntro );

    function FadeOutIntro() {
        ctx.clearRect( 0, 0, width, height );
        ctx.fillText( text.substr( 0, i ), width / 4 - text.length, height / 2 + height / 6 );
        i -= 1;
        if ( i >= 0 ) {
            requestAnimationFrame( FadeOutIntro );
        } else {
            imageReady = true;
        }

        ctx.globalAlpha = i * 2 / 100 + 0.03;
        ctx.drawImage( image, 250, 0, 235, 235 );
    }

    setTimeout( startSvg, 4000 );

    function startSvg() {
        $( '#theSvg' ).css( 'opacity', 0 );
        document.getElementById( "theSvg" ).style.visibility = "visible";
        document.getElementById( "theSvg" ).style.display = 'block';
        $( '#theSvg' ).animate( { opacity: "1" }, 1500 );
        setTimeout( function () {
            document.getElementById( "the-canvas" ).style.visibility = "hidden";
            document.getElementById( 'the-canvas' ).style.display = 'none';
        }, 1500 );

        svgLogic.toLoad();
    }
}() )
