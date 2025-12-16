const mongoose=require('mongoose')

const ExamLevelSchema = new mongoose.Schema({
    Examlevel:{
        type:String
    },
},{timestamps:true});
module.exports=mongoose.model("Exam level",ExamLevelSchema);