const mongoose=require( 'mongoose' );
const msgSchema=new mongoose.Schema( {
          name: String,
          message: String
}, { collection: 'msgs' } )
module.exports=mongoose.model( 'msgs', msgSchema );