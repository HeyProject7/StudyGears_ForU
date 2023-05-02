const redirectToRegister=async ( req, res ) => new Promise( ( resolve, reject ) =>
{
          res.redirect( '/register' );
          setTimeout( resolve, 5000, "true" );
} );
module.exports=redirectToRegister;