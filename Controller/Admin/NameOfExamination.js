
const { toTitleCase } = require('../../Config/function');
const NameOfExamination=require('../../Module/Admin/NameOfExamination');

class NameExamination{
    async addNameExamination(req,res){
        try {
            let {mediumName,NameExamination}=req.body;
            // if(!mediumName) return res.status(400).json({error:"Please enter mediumName"});
            // if(!NameExamination) return res.status(400).json({error:"Please enter NameExamination"});
            NameExamination=toTitleCase(NameExamination);
            let data= await NameOfExamination.findOne({NameExamination:NameExamination});
            if(data) return res.status(400).json({error:`${NameExamination} already exits`});
            await NameOfExamination.create({NameExamination,mediumName});
            return res.status(200).json({success:"Successfully added"})
        } catch (error) {
            console.log(error);
        }
    }

    async updateNameExamination(req,res){
        try {
            let {id,mediumName,NameExamination}=req.body;
            let obj={};
            if(NameExamination){
                NameExamination=toTitleCase(NameExamination);
                let data=await NameOfExamination.findOne({NameExamination:NameExamination,mediumName:mediumName});
                if(data) return res.status(400).json({error:`${NameExamination} already exits`});
                obj["NameExamination"]=NameExamination;
                obj["mediumName"] =mediumName;
            }
            let data=await NameOfExamination.findOneAndUpdate({_id:id},{$set:obj});
            if(!data) return res.status(400).json({error:"Data not found"});
            return res.status(200).json({success:"Successfully updated"})
        } catch (error) {
            console.log(error);
        }
    }
async getAllNameExamination(req,res){
    try {
      let data=await NameOfExamination.find({}).sort({_id:-1});
      return res.status(200).json({success:data})  
    } catch (error) {
        console.log(error);
    }
}

async deleteNameExamination(req,res){
    try {
       let id=req.params.id;
       let data=await NameOfExamination.deleteOne({_id:id});
       if(data.deletedCount==0) return res.status(400).json({error:"Data not found"});
       return res.status(200).json({success:"Sucessfully deleted"}) 
    } catch (error) {
        console.log(error);
    }
}

}
module.exports=new NameExamination();