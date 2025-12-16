const mongoose=require('mongoose');

const QuestionType=new mongoose.Schema({
    typeOfquestion:{
        type:String
    },
    Qformat:{
        type:String
    },
    QFormatMedium:{
        type:String
    },
    translatelang:{
        type:String
    }

},{timestamps:true});
module.exports=mongoose.model("questiontype",QuestionType);
