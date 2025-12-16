const mongoose=require('mongoose');

const UploadQuestionSchema=new mongoose.Schema({
    Title:{
        type:String
    },
    Examinationname:{
        type:String
    },
    year:{
        type:String
    },
    Class:{
        type:String
    },
    SubClass:{
        type:String
    },
    subject:{
        type:String
    },
    medium:{
        type:String
    },
    questionPdf:{
        type:String
    },
    answerPdf:{
        type:String
    },
},{timestamps:true});
module.exports=mongoose.model("Upload_Question",UploadQuestionSchema);
