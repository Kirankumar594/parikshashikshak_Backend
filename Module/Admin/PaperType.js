const mongoose=require('mongoose');

const paperTypeSchema=new mongoose.Schema({
paperType:{
    type:String
}
},{timestamps:true});
module.exports=mongoose.model("PaperType",paperTypeSchema);
