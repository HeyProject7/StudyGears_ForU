const express=require( 'express' );
const router=express.Router();
const loginUser=require( '../controller/loginUser' )

var sessions=require( 'express-session' );
const oneDay=1000*60*60*24;
router.use( sessions( {
          secret: 'studygearscreat',
          saveUninitialized: false,
          cookie: { maxAge: oneDay },
          resave: false,
} ) );

router.post( '/', loginUser.handleLogin );
module.exports=router;