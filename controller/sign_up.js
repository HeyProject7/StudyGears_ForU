const Users=require( "../model/Users" );
const bcrypt=require( "bcrypt" );

var username, password;
const createNewUser=async ( req, res ) => new Promise( async ( resolve, reject ) =>
{

    if ( !req.body.username&&!req.body.email&&!req.body.password )
    {
        return res.status( 400 ).sendFile( "../views/404Page.html" );
    }
    username=req.body.username;
    password=req.body.password;
    email=req.body.email;

    exist=await Users.findOne( { username: username } );

    if ( exist ) return res.status( 400 ).json( { Warning: "User already exists" } );
    try
    {
        const hashPass=await bcrypt.hash( password, 10 );
        const result=await Users.create( {
            username: username,
            password: hashPass,
            email: email,
        } );
        req.session.user=req.body.username;
        if ( result )
        {
            console.log( "User : ", req.session.user )
            return res.redirect( "./login_signIn.html" );
            resolve( true );
        }
    } catch ( error )
    {
        res.status( 500 ).send( {
            message2: error.message,
        } );
    }
} );
module.exports={ createNewUser };
