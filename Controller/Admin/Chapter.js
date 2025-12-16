const ChapterModel = require("../../Module/Admin/Chapter");
const { toTitleCase } = require("../../Config/function");

class CHAPTER {
  async addChapter(req, res) {
    try {
      let { mediumName,chapterName, subjectName, SubjectPart, Classname,Sub_classname } = req.body;
      //   if (!chapterName)
      //     return res.status(400).json({ error: "Please enter Chapter name" });
      //     if (!subjectName)
      //     return res.status(400).json({ error: "Please select subject name" });
      chapterName = toTitleCase(chapterName);
      let data = await ChapterModel.findOne({
        mediumName: mediumName,
        chapterName: chapterName,
        subjectName: subjectName,
        SubjectPart: SubjectPart,
        Classname: Classname,
        Sub_classname: Sub_classname,
      });
      console.log("object", data);
      if (data)
        return res.status(400).json({ error: `${chapterName} already exits` });
      await ChapterModel.create({
        mediumName,
        chapterName,
        subjectName,
        SubjectPart,
        Sub_classname,
        Classname,
      });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.log(error);
    }
  }

  async updateChapter(req, res) {
    try {
      let { id, mediumName,chapterName, subjectName, SubjectPart,Sub_classname,Classname } = req.body;
      let obj = {};
      if (chapterName) {
        chapterName = toTitleCase(chapterName);
        let data = await ChapterModel.findOne({
          mediumName:mediumName,
          chapterName: chapterName,
          subjectName: subjectName,
          SubjectPart: SubjectPart,
          Sub_classname:Sub_classname,
          Classname:Classname
        });
        if (data)
          return res
            .status(400)
            .json({ error: `${chapterName} already exists` });
        obj["chapterName"] = chapterName;
      }
      if (mediumName) {
        obj["mediumName"] = mediumName;
      }
      if (subjectName) {
        obj["subjectName"] = subjectName;
      }
      if (SubjectPart) {
        obj["SubjectPart"] = SubjectPart;
      }
      if(Classname){
        obj["Classname"]= Classname;
      }
      if(Sub_classname){
        obj["Sub_classname"]=Sub_classname
      }
      let data = await ChapterModel.findOneAndUpdate(
        { _id: id },
        { $set: obj },
        { new: true }
      );
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }
  // async getAllChapter(req, res) {
  //   try {
  //     let { chapterName, subjectName } = req.body;
  //     if (!chapterName)
  //       return res.status(400).json({ error: "Please enter chapter name" });
  //     if (!subjectName)
  //       return res.status(400).json({ error: "Please select subject name" });
  //     chapterName = toTitleCase(chapterName);
  //     let data = await ChapterModel.findOne({
  //       chapterName: chapterName,
  //       subjectName: subjectName,
  //       SubjectPart: SubjectPart,
  //     });
  //     if (data)
  //       return res.status(400).json({ error: `${chapterName} already exits` });
  //     await ChapterModel.create({ chapterName });
  //     return res.status(200).json({ success: "Successfully added" });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } 
    
  async getAllChapter(req, res) {
    try {
      const { subjectName, subclassName } = req.query; // Get filters from query params

      let query = {};

      if (subjectName) {
        query.subjectName = subjectName;
      }

      if (subclassName) {
        query.subclassName = subclassName;
      }

      const chapters = await ChapterModel.find(query);
      return res.status(200).json({ success: chapters });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async updateChapter(req, res) {
    try {
      let { id, mediumName,Classname,Sub_classname,chapterName, subjectName } = req.body;
      let obj = {};
      if (mediumName) {
        obj["mediumName"] = mediumName;
      }
      if (Classname) {
        obj["Classname"] = Classname;
      }
      if (Sub_classname) {
        obj["Sub_classname"] = Sub_classname;
      }
      if (chapterName) {
        chapterName = toTitleCase(chapterName);
        let data = await ChapterModel.findOne({ chapterName: chapterName });
        if (data)
          return res
            .status(400)
            .json({ error: `${chapterName} already exits` });
        obj["chapterName"] = chapterName;
      }
      if (subjectName) {
        obj["subjectName"] = subjectName;
      }
      let data = await ChapterModel.findOneAndUpdate(
        { _id: id },
        { $set: obj }
      );
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }
  async getAllChapter(req, res) {
    try {
      let data = await ChapterModel.find({}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteChapter(req, res) {
    try {
      let id = req.params.id;
      let data = await ChapterModel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Sucessfully deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new CHAPTER();
