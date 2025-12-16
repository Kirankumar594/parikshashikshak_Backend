const QuestionHeaderModel = require("../../Module/Admin/QuestionHeader");
class QuestionHeader {
  async addquestionheader (req, res) {
    try {
      let { medium,classs,subject,marks,time,studentinfo,examdate,totalquestion,
        nameofstudent,satsno,signature,roominvigilator,idsccode,schoolname,cluster,
        block,distric,govt,aided,unaided,markinfo,signatureinvigilator,evaluator,
        questionno1,obtainedno1,questionno2,obtainedno2,questionno3,obtainedno3,
        totalmarks1,totalmarks2,totalmarks3,grandtotal,totalobtainedmarks,evaluatorsign,ans,or,answerheader,mediumHead,lastSign,blueprintBoard} = req.body;

          let check = await QuestionHeaderModel.findOne({
            medium,classs,subject,marks,time,studentinfo,examdate,totalquestion,
            nameofstudent,satsno,signature,roominvigilator,idsccode,schoolname,cluster,
            block,distric,govt,aided,unaided,markinfo,signatureinvigilator,evaluator,
            questionno1,obtainedno1,questionno2,obtainedno2,questionno3,obtainedno3,
            totalmarks1,totalmarks2,totalmarks3,grandtotal,totalobtainedmarks,evaluatorsign,ans,or,answerheader,blueprintBoard
      });
      if (check) return res.status(400).json({ error: "Already exits " });
      let obj = {
        medium,classs,subject,marks,time,studentinfo,examdate,totalquestion,
        nameofstudent,satsno,signature,roominvigilator,idsccode,schoolname,cluster,
        block,distric,govt,aided,unaided,markinfo,signatureinvigilator,evaluator,
        questionno1,obtainedno1,questionno2,obtainedno2,questionno3,obtainedno3,
        totalmarks1,totalmarks2,totalmarks3,grandtotal,totalobtainedmarks,evaluatorsign,ans,or,answerheader,mediumHead,lastSign,blueprintBoard
      };
      let data = await QuestionHeaderModel.create(obj);
      if (!data) return res.status(400).json({ error: "Something went wrong" });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      return res.status(400).json({ error: "API Error" });
    }
  }

  async updatesQuestionHeader(req, res) {
    try {
      let {
        id,
        medium,classs,subject,marks,time,studentinfo,examdate,totalquestion,
        nameofstudent,satsno,signature,roominvigilator,idsccode,schoolname,cluster,
        block,distric,govt,aided,unaided,markinfo,signatureinvigilator,evaluator,
        questionno1,obtainedno1,questionno2,obtainedno2,questionno3,obtainedno3,
        totalmarks1,totalmarks2,totalmarks3,grandtotal,totalobtainedmarks,evaluatorsign,
        ans,or,answerheader,mediumHead,lastSign,blueprintBoard
      } = req.body;
      let obj = {};
      if (medium) {
        obj["medium"] = medium;
      }
      if (classs) {
        obj["classs"] = classs;
      }
      if (subject) {
        obj["subject"] = subject;
      }
      if (marks) {
        obj["marks"] = marks;
      }
      if (time) {
        obj["time"] = time;
      }
      if (studentinfo) {
        obj["studentinfo"] = studentinfo;
      }
      if (examdate) {
        obj["examdate"] = examdate;
      }
      if (totalquestion) {
        obj["totalquestion"] = totalquestion;
      }
      if (nameofstudent) {
        obj["nameofstudent"] = nameofstudent;
      }
      if (satsno) {
        obj["satsno"] = satsno;
      }
      if (signature) {
        obj["signature"] = signature;
      }
      if (roominvigilator) {
        obj["roominvigilator"] = roominvigilator;
      }
      if (idsccode) {
        obj["idsccode"] = idsccode;
      }
      if (schoolname) {
        obj["schoolname"] = schoolname;
      }
      if (cluster) {
        obj["cluster"] = cluster;
      }
      if (block) {
        obj["block"] = block;
      }
      if (distric) {
        obj["distric"] = distric;
      }
      if (govt) {
        obj["govt"] = govt;
      }
      if (aided) {
        obj["aided"] = aided;
      }
      if (unaided) {
        obj["unaided"] = unaided;
      }
      if (markinfo) {
        obj["markinfo"] = markinfo;
      }
      if (signatureinvigilator) {
        obj["signatureinvigilator"] = signatureinvigilator;
      }
      if (evaluator) {
        obj["evaluator"] = evaluator;
      }
      if (questionno1) {
        obj["questionno1"] = questionno1;
      }
      if (obtainedno1) {
        obj["obtainedno1"] = obtainedno1;
      }
      if (questionno2) {
        obj["questionno2"] = questionno2;
      }
      if (obtainedno2) {
        obj["obtainedno2"] = obtainedno2;
      }
      if (questionno3) {
        obj["questionno3"] = questionno3;
      }
      if (obtainedno3) {
        obj["obtainedno3"] = obtainedno3;
      }
      if (totalmarks1) {
        obj["totalmarks1"] = totalmarks1;
      }
      if (totalmarks2) {
        obj["totalmarks2"] = totalmarks2;
      }
      if (totalmarks3) {
        obj["totalmarks3"] = totalmarks3;
      }
      if (grandtotal) {
        obj["grandtotal"] = grandtotal;
      }
      if (totalobtainedmarks) {
        obj["totalobtainedmarks"] = totalobtainedmarks;
      }
      if (evaluatorsign) {
        obj["evaluatorsign"] = evaluatorsign;
      }
      if (ans) {
        obj["ans"] = ans;
      }
      if (or) {
        obj["or"] = or;
      }
      if (answerheader) {
        obj["answerheader"] = answerheader;
      }
      if (mediumHead) {
        obj["mediumHead"] = mediumHead;
      }
      if (lastSign) {
        obj["lastSign"] = lastSign;
      }
      if(blueprintBoard){
        obj["blueprintBoard"] = blueprintBoard;
      }
     
      let data = await QuestionHeaderModel.findOneAndUpdate(
        { _id: id },
        { $set: obj }
      );
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllQuestionHeader(req, res) {
    try {
      let data = await QuestionHeaderModel.find().sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

  async getQuestionHeaderByMedium(req, res) {
    let Qheaderid = req.params.id;
    try {
      let data = await QuestionHeaderModel.findOne({medium:Qheaderid}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

 

  async deleteQuestionHeader(req, res) {
    try {
      let id = req.params.id;
      let data = await QuestionHeaderModel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      console.log("data", data);
      return res.status(200).json({ success: "Successfully deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new QuestionHeader();
