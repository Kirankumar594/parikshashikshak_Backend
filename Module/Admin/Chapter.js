const mongoose=require('mongoose');

const ChapterSchema=new mongoose.Schema({
mediumName:{
    type:String
},
chapterName:{
    type:String
},
subjectName:{
    type:String
},
SubjectPart:{
    type:String
},
Classname:{
    type:String
},
Sub_classname:{
    type:String
}

},{timestamps:true});
module.exports=mongoose.model("Chapter",ChapterSchema);
