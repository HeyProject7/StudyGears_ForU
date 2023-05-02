const express=require( 'express' );
const router=express.Router();
const path=require( "path" );
const Users=require( '../../model/Users' );
const Courses=require( '../../model/Courses' );
const verifyJwt=require( '../../middleware/verifyJwt' );
router.route( '/' )
    .get( async function ( req, res )
    {
        console.log( "URL  For Dashboard ", req.url+req.originalUrl );
        console.log( "TOken From Req : ", req.query.token )

        var data=await fetch( 'http://localhost:3000/employee', {
            method: 'GET',
            headers: new Headers( {
                'Authorization': 'Bearer '+req.query.token,
                'Content-Type': 'application/json'
            } )
        } );
        console.log( "Data : ", data )
        if ( !data )
        {
            console.log( "Processing" )
            res.json( { status: "error", message: "No data found" } );
        } else
        {
            console.log( "Processing " );
            var overview=req.query.overview;
            var people=req.query.peoples;
            var course=req.query.courses;
            var peoples=await Users.find( {} );
            var courses=await Courses.find( {} );

            console.log( "Overview : ", overview );
            console.log( "People : ", people );
            console.log( "Course : ", course );
            // console.log( "Courses : ", courses );
            // console.log( "Peoples : ", peoples );
            res.render( path.join( __dirname, '..', '..', 'views', 'rootViews', 'dashboard.pug' ), { overview, people, course, peoples, courses } );
        }
        // .then(response => response.json()).then(data => {
        //         console.log("debug5")
        //         console.log(data)
        //         res.sendFile(path.resolve(__dirname, '..', 'views', 'rootViews', 'dashboard.html'));
        //     }).catch(error => {
        //         console.log(error);
        //         res.json({ error: error.message });
        //     })

        // var headers = {'Authorization':'Bearer ' + session.accessToken,'Content-Type': 'application/x-www-form-urlencoded'};

        //  fetch('http://localhost:3000/employees', { 
        //     headers 
        // }).then(response => response.json()).then(data => {
        //     console.log("debug5")
        //     res.sendFile(path.resolve(__dirname, '..', 'views', 'rootViews', 'dashboard.html'));
        // }).catch(error => {
        //     console.log(error);
        //     res.json({ error: error.message });
        // });

    } );
module.exports=router;