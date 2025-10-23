const { toTitleCase } = require("../../Config/function");
const paperTypeModel = require("../../Module/Admin/PaperType");


class PAPERTYPE {
  async AddPaperType(req, res) {
    try {
      let { paperType } = req.body;
      if (!paperType)
        return res.status(400).json({ error: "Please enter paper type" });
      let data = await paperTypeModel.findOne({ paperType: paperType });
      if (data)
        return res.status(400).json({ error: `${paperType} Already exits` });
      await paperTypeModel.create({ paperType });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.log(error);
    }
  }
  async updatePaperType(req,res){
    try {
        let {id,paperType}=req.body;
        let obj={}
        if(paperType){
            obj["paperType"]=toTitleCase(paperType)
        }
        let data=await paperTypeModel.findOneAndUpdate({_id:id},{$set:obj});
        if(!data) return res.status(400).json({error:"Data not found"});
        return res.status(200).json({success:"Successfully deleted"})
    } catch (error) {
        console.log(error);
    }
  }

  async getAllPaperType(req,res){
    try {
       let data=await paperTypeModel.find().sort({_id:-1});
       return res.status(200).json({success:data}) 
    } catch (error) {
        console.log(error);
    }
  }


  async deletePaperType(req,res){
    try {
        let id=req.params.id;
        let data=await paperTypeModel.deleteOne({_id:id});
        if(data.deletedCount==0) return res.status(400).json({error:"Data not found"});
        return res.status(200).json({success:"Successfully deleted"})
        
    } catch (error) {
        console.log(error);
    }
  }

}
module.exports = new PAPERTYPE();
