// mime: {
//           'application/javascript': [ 'js' ],
//                     'text/css': [ 'css' ],
//        }
( function ()
{
          const app=document.querySelector( ".app" )
          const socket=io();

          let uname;

          app.querySelector( ".join-screen #join-user" ).addEventListener( "click", function ()
          {
                    let username=app.querySelector( ".join-screen #username" ).value;
                    if ( username.length==0 )
                    {
                              return;

                    }
                    socket.emit( "newuser", username );
                    uname=username;
                    app.querySelector( ".join-screen" ).classList.remove( "active" )
                    app.querySelector( ".chay-screen" ).classList.add( "active" )

          } )
} )();