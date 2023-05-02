// const User = require('../model/User')
const Admin=require( '../model/Admin' ) // temprary

// JWT PKGS
const jwt=require( 'jsonwebtoken' );
require( 'dotenv' ).config();
const bcrypt=require( 'bcrypt' );
const sendMail=require( './sendMail' );

const handleLogin=async ( req, res ) =>
{
    const user=req.body.username;
    const pwd=req.body.password;
    console.log( "Data ", user, pwd )
    if ( !user||!pwd ) return res.send( "Enter Data Correctly " );
    const foundUser=await Admin.findOne( { username: user } );  //946578
    // 401 = Unauthrised
    if ( !foundUser ) return res.status( 401 ); //.send("<h1>User Not Found!</h1>");
    const matchPass=await bcrypt.compare( pwd, foundUser.password )


    if ( matchPass )
    {
        console.log( "User : ", foundUser.username )
        // Grab Roles
        const roles=Object.values( foundUser.roles );
        // JWT
        const accessToken=jwt.sign( {
            // Private JWT Client=>jwt.io

            // Payload
            userInfo: {
                "username": foundUser.username,
                "roles": roles // only sending codes not like user,admin
            }
        },
            process.env.ACCESS_TOKEN_SCREAT, { expiresIn: "5m" }
        );
        const refreshToken=jwt.sign( { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SCREAT, { expiresIn: "1d" }
        );
        // Saving Tokens
        const result=await Admin.findOneAndUpdate( { username: 'admin' }, { $set: { refreshToken: refreshToken } } )
        res.cookie( 'jwt', refreshToken, { httpOnly: true, sameSite: "None", maxAge: 24*60*60*1000 } );
        sendMail( accessToken, "projectaavs.cpp@gmail.com" );

        // Starting Session
        session=req.session;
        session.accessToken=accessToken;
        console.log( "Session : ", session );

        console.log( "Token : ", session.accessToken );
    } else return res.sendFile( '../views/404Page.html' );
}
module.exports={ handleLogin }