const express=require( 'express' );
const router=express.Router();
const { handleLogin }=require( '../controller/loginUser' );
const path=require( "path" );

router.route( '/' )
    .post( async function ( req, res )
    {
        await handleLogin( req, res );
        res.sendFile( path.join( __dirname, '..', 'views', 'rootViews', 'accessToken.html' ) );
    } );
module.exports=router;