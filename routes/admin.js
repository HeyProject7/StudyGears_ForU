const express=require( 'express' );
const Router=express.Router();

const adminController=require( './controller/adminController' );

Router.get( '/admin', adminController.getAdmin );
Router.post( '/admin', adminController.postAdmin );
Router.put( '/admin', adminController.putAdmin );
Router.delete( '/admin', adminController.deleteAdmin );