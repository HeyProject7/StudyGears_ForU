const express=require( 'express' )
const router=express.Router();
const verifyJwt=require( '../../middleware/verifyJwt' )
const path=require( 'path' );
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee }=require( '../../controller/empController' )
const verifyRoles=require( '../../middleware/verifyRoles' );
const ROLLS_LIST=require( '../../config/rollsList' )

// Route Handlers
router.route( '/' )
    .get( verifyJwt, getAllEmployees )
    // .get(getAllEmployees)
    .post( createEmployee )
    .put( updateEmployee )
    .delete( deleteEmployee );
// .get(getAllEmployees)
//     .post(verifyRoles(ROLLS_LIST.admin,ROLLS_LIST.editor),createEmployee)
//     .put(verifyRoles(ROLLS_LIST.admin,ROLLS_LIST.editor),updateEmployee)
//     .delete(verifyRoles(ROLLS_LIST.admin),deleteEmployee);

router.route( '/:id' )
    .get( getEmployee );
module.exports=router;