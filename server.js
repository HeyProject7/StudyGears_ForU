// Required Modules 
require( 'dotenv' ).config();

// Express
var express=require( 'express' );
var sessions=require( 'express-session' );

const path=require( 'path' )

//Body Parser To Parse Form Data
bodyParser=require( 'body-parser' );

// Creating Express App
var app=express();

// Importing Required Modules
const cors=require( 'cors' );
const corsOptions=require( './config/corsOptions' )
const { logger }=require( './middleware/logEvent' )
const errorHandler=require( './middleware/errorHandler' );
const verifyJwt=require( './middleware/verifyJwt' );
const cookieParser=require( 'cookie-parser' );
const credentials=require( './middleware/credentials' );
const pug=require( 'pug' )

//MongoDb Modules
const mongoose=require( 'mongoose' );
const connectDB=require( './config/dbConn' )

// Define Port
const port=process.env.port||3000;

// Connect DataBase
connectDB();

// View Engines
// const ejs = require('ejs');
app.set( 'view engine', 'pug' );

// custom middleware logger
app.use( logger );

app.use( bodyParser.json() );

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use( credentials )

// Avoid Cors Error -  Cross Origin Resource Sharing
// app.use(cors(corsOptions));

// Built Middleare To Handle Form data (urlcoded Data)
app.use( express.urlencoded( { encoded: "true" } ) );

// JSON Data  - applied to All Above Routes
app.use( express.json() );

// Set Strict Query
mongoose.set( 'strictQuery', true );

//middleware for cookies
app.use( cookieParser() );

// Middlewares Of Sessions

// httpOnly: true,
// secure: false,
const oneDay=1000*60*60*24;
app.use( sessions( {
    secret: 'studygearscreat',
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false,
} ) );

// Server Static Files
// MiddleWare To Serve Static Files - Html,css,js
// And  Also Paste css and other static folders in public folder
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Middle-Wares
app.use( '/', require( './routes/rootRoute' ) );
app.use( '/courses', require( './routes/getFiles' ).uploadRouter );
app.use( '/register', require( './routes/register' ) );
app.use( '/login', require( './routes/login' ) );
app.use( '/refresh', require( './routes/refresh' ) );
app.use( '/logout', require( './routes/logout' ) );
app.use( '/videos', require( './routes/videos' ) );
app.use( '/adminPanel', require( './routes/adminPanel' ) );
app.use( '/accessToken', require( './routes/accessToken' ) );
// app.use( '/dashboard', require( './routes/dashboard' ) );
app.use( '/verifyReferal', require( './routes/verifyReferal' ) );

// app.use( verifyJwt ) // like waterfalll everything after this will use verifyJwt

app.use( '/employee', require( './routes/api/employee' ) );
app.use( '/dashboard', require( './routes/api/dashboard' ) );


// $404
// app.all('*', (req, res) => {
//     // fire.emit('connection', req)
//     console.log('404 Error')
//     if (req.accepts('html')) {
//         res.status(404).sendFile(path.join(__dirname, 'views', '404Page.html'))
//     } else if (req.accepts('json')) {
//         res.json({ error: '404 Not Found' });
//     } else {
//         res.type('txt').send('404 Not Found')
//     }
// });

app.use( errorHandler );

mongoose.connection.once( 'open', () =>
{
    console.log( 'Connected To MongoDB' )
    app.listen( port, () =>
    {
        console.warn( `Server Running On ${ port }` );
    } );
} );