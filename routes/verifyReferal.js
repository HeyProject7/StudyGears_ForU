const express=require( "express" );
const router=express.Router();
const path=require( "path" );
const SignUp=require( "../controller/sign_up" );
const login=require( "../controller/studygears_login" );
const Referal_codes=require( "../model/Refernal_code" );
const Users=require( "../model/Users" );

const redirectToRegister=require( "../controller/authorizeReferal" );


router.route( "/" ).get( async ( req, res ) =>
{
  const exist=await Referal_codes.findOne( { referal_code: req.query.code } );
  if ( exist )
  {
    const data=await redirectToRegister( req, res );
    if ( data )
    {
      console.log( "Array Of Data ", data )
      setTimeout( async () =>
      {
        // Increase Supercoins For Referer
        const user1=await Users.findOne( { username: exist.referer } );
        var supercoins=user1.supercoins+1000;
        const result=await Users.findOneAndUpdate(
          { username: user1.username },
          { $set: { supercoins: supercoins } }
        );
        console.log( "User 1", result )

        // Increase Supercoins For Accessor
        console.log( "username  ", req.session.user )
        const user2=await Users.findOne( { username: req.session.username } );
        var supercoins2=user2.supercoins+1000;
        const result2=await Users.findOneAndUpdate(
          { username: user2.username },
          { $set: { supercoins: supercoins2 } }
        );

        const result3=await Referal_codes.findOneAndUpdate( { referer: user1.username },
          { $set: { accessors: [ ...exist.accessors, user2.username ] } } );

        console.log( "User 2 ", result2 );
      }, 50000 );
    } else
    {
      console.log( "Not Found" );
      res
        .status( 200 )
        .sendFile( path.join( __dirname, "..", "views", 'rootViews', "index.html" ) );
    }
  }
} );


module.exports=router;
