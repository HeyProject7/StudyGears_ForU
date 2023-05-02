const mongoose=require( "mongoose" );
const Schema=mongoose.Schema;

const referalSchema=new Schema( {
  referer: {
    type: Object,
    required: true,
  },
  accessors: {
    type: Array,
    default: [],
  },
  referal_code: {
    type: String,
    required: true,
  }
} );
const model=mongoose.model( "Referal_codes", referalSchema );
module.exports=model;
