// Data -> Model
const Users=require( '../model/Users' );
const Employee=require( '../model/Employee' );
const getAllEmployees=async ( req, res ) => new Promise( ( resolve, reject ) =>
{
    // const emp = await Employee.find({});
    console.log( "degug4" )
    Users.find( {}, ( err, data ) =>
    {
        if ( err ) return reject( 'Unable To Fetch Users ' );
        console.log( "ARRAY ", data );
        resolve( data );
    } );
    console.log( "Getting All Employees" );
} )
const createEmployee=async ( req, res ) =>
{
    if ( !req.body.fname||req.body.lname )
    {
        return res.status( 400 ).send( "First And Last Names Required" );
    }
    console.log( req.body.fname, req.body.lname );
    try
    {
        const result=await Employee.create( {
            fname: req.body.fname,
            lname: req.body.lname
        } );
        res.status( 201 ).send( `${ result.fname } Created ` )
    } catch ( err )
    {
        console.log( err )
    }

}
const updateEmployee=async ( req, res ) =>
{
    if ( !req.body.id )
    {
        return res.status( 400 ).send( "Id Must Required " )
    }
    const employee=await Employee.findOne( { _id: req.body.id } ).exec();
    if ( !employee )
    {
        return res.json( { "Warning": "No Match With Id  ${req.body.id} " } )
    }
    // If Id Present 
    if ( req.body.fname ) employee.fname=req.body.fname;
    if ( req.body.lname ) employee.lname=req.body.lname;
    const result=await employee.save();
    res.json( result );

}
const deleteEmployee=async ( req, res ) =>
{
    if ( !req.body.id )
    {
        return res.status( 400 ).send( "Id Must Required " )
    }
    const employee=await Employee.findOne( { _id: req.body.id } ).exec();
    if ( !employee )
    {
        return res.json( { "Warning": "No Match With Id  ${req.body.id} " } )
    }
    const result=await Employee.deleteOne( {
        _id: req.body.id
    } )

    res.send( "Data Deleted Successfully   "+result )
}
const getEmployee=async ( req, res ) =>
{
    if ( req.params )
    {
        res.status( 204 ).send( "No Content Available " );
    }
    const employee=await Employee.findOne( { _id: req.params.id } ).exec();
    if ( !employee ) return res.status( 204 ).send( "Id Not Exist" )
    const result=await employee.save();
    res.status( 200 ).json( result )
}

module.exports={
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}