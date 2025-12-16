const mongoose=require('mongoose');

const MediumSchema=new mongoose.Schema({
mediumName:{
    type:String
}
},{timestamps:true});
module.exports=mongoose.model("Medium",MediumSchema);
