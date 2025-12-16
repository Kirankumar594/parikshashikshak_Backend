const syllabusModel = require("../../Module/Admin/Syllabus");

class SYLLABUS {
  async addSyllabus(req, res) {
    try {
      let { head,head1,head2,head3,head4,year, Class, SubClass, subject, medium, SyllabusDetails,Title,Examinationname } =
        req.body;
      let check = await syllabusModel.findOne({
        head,head1,head2,head3,head4,
        year,
        Class,
        SubClass,
        subject,
        medium,
        Title,
        Examinationname
      });
      if (check)
        return res.status(400).json({ error: "Already exits syllabus" });
      let data = await syllabusModel.create({
        head,head1,head2,head3,head4,
        year,
        Class,
        SubClass,
        subject,
        medium,
        SyllabusDetails,
        Title,Examinationname
      });
      if (!data) return res.status(400).json({ error: "Something went wrong" });
      return res.status(200).json({ succes: "Successfully added" });
    } catch (error) {
      console.log(error);
    }
  }

  async updateSyllabus(req, res) {
    try {
      let { id, head,head1,head2,head3,head4,year, Class, SubClass, subject, medium, SyllabusDetails,Title,Examinationname } =
        req.body;
      let obj = {};
      if(Title){
        obj["Title"]=Title
      }
      if(Examinationname){
        obj["Examinationname"]=Examinationname;
      }
      if(head){
        obj["head"] = head;
      }
      if(head1) {
        obj["head1"] = head1;
      }
      if(head2) {
        obj["head2"] = head2;
      }
      if(head3) {
        obj["head3"] = head3;
      }
      if(head4) {
        obj["head4"] = head4;
      }
      if(year) {
        obj["year"] = year;
      }
      if (Class) {
        obj["Class"] = Class;
      }
      if (subject) {
        obj["subject"] = subject;
      }
      if (SubClass) {
        obj["SubClass"] = SubClass;
      }
      if (medium) {
        obj["medium"] = medium;
      }
      if (SyllabusDetails) {
        obj["SyllabusDetails"] = SyllabusDetails;
      }

      let data = await syllabusModel.findOneAndUpdate(
        { _id: id },
        { $set: obj }
      );
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSyllabus(req, res) {
    try {
      let data = await syllabusModel.find().sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

  async getslybusbyid(req, res) {
    try {
      let id = req.params.id;
      let data = await syllabusModel.findById({ _id: id });
      if (data) return res.status(200).json({ succes: data });
    } catch (error) {
      console.log(error);
    }
  }

  async deletedSyllaus(req, res) {
    try {
      let id = req.params.id;
      let data = await syllabusModel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      console.log("data", data);
      return res.status(200).json({ success: "Successfully deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new SYLLABUS();
