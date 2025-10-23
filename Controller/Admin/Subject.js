const Subject = require("../../Module/Admin/Subject"); // Assuming Subject.js is in the same directory
const SubClassModel = require("../../Module/Admin/SubClass"); // Adjust path as needed
const Board = require("./Board"); // Adjust path as needed


function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

class SubjectController {
  async addSubjects(req, res) {
    try {
      const { mediumName, subjectName, subClass,boardName} = req.body;

      if (!mediumName || !subjectName || !subClass || !boardName) {
        return res
          .status(400)
          .json({ error: "Please fill all required fields" });
      }

      const subClassData = await SubClassModel.findById(subClass);

      if (!subClassData) {
        return res.status(404).json({ error: "SubClass not found" });
      }

      const newSubject = new Subject({
        mediumName: toTitleCase(mediumName),
        subjectName: toTitleCase(subjectName),
        subClass,
        boardName
      });

      const existingSubject = await Subject.findOne({
        mediumName: newSubject.mediumName,
        subjectName: newSubject.subjectName,
        subClass: newSubject.subClass,
      });

      if (existingSubject) {
        return res
          .status(400)
          .json({ error: `${subjectName} already exists for this medium` });
      }

      await newSubject.save();
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server Error" });
    }
  }

  async updateSubjects(req, res) {
    try {
      const { id, mediumName, subjectName, subClass,boardName } = req.body;
      const updates = {};
      if (mediumName) updates.mediumName = toTitleCase(mediumName);
      if (subjectName) updates.subjectName = toTitleCase(subjectName);
      if (subClass) updates.subClass = subClass;
      if(boardName) updates.boardName = boardName;

      const updatedSubject = await Subject.findByIdAndUpdate(id, updates, {
        new: true,
      }).populate("subClass");

      if (!updatedSubject) {
        return res.status(404).json({ error: "Subject not found" });
      }
      return res.status(200).json({ success: updatedSubject });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server Error" });
    }
  }

  async getAllSujects(req, res) {
    try {
      const subjects = await Subject.find({})
        .populate("subClass") // Correct the populate path here
        .sort({ _id: -1 });
      return res.status(200).json({ success: subjects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server Error" });
    }
  }

  async deleteSubjects(req, res) {
    try {
      const id = req.params.id;
      const deletedSubject = await Subject.findByIdAndDelete(id);
      if (!deletedSubject) {
        return res.status(404).json({ error: "Subject not found" });
      }
      return res.status(200).json({ success: "Successfully deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server Error" });
    }
  }
}

module.exports = new SubjectController();
