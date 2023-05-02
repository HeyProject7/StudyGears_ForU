const express=require( 'express' );
const router=express.Router();
const registerNewUser=require( '../controller/registerController' )
router.post( '/', registerNewUser.handleNewUser );

module.exports=router;