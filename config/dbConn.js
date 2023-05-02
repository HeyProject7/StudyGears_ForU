const mongoose=require( 'mongoose' );
const connect=async () =>
{
    await mongoose.connect( "mongodb+srv://aavs:projectforus7@cluster0.claqrrh.mongodb.net/studygears_signup?retryWrites=true&w=majority", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    } );
};
module.exports=connect;