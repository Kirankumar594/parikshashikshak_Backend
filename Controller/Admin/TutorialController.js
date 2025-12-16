const Tutorial = require("../../Module/Admin/TutorialModule");

// CREATE
// CREATE
// exports.createTutorial = async (req, res) => {
//   try {
//     const { code, title, description } = req.body;
//     const videoUrl = "/uploads/tutorials/" + req.file.filename;

//     const tutorial = new Tutorial({ code, title, description, videoUrl }); 
//     await tutorial.save();
//     res.status(201).json({ success: true, tutorial });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };  
 
 exports.createTutorial = async (req, res) => {
  try {
    const { code, title, description } = req.body;

    let fileUrl = null;
    if (req.file) {
      fileUrl = "/uploads/tutorials/" + req.file.filename;
    }

    const tutorial = new Tutorial({
      code,
      title,
      description,
      fileUrl 
    });

    await tutorial.save();
    res.status(201).json({ success: true, tutorial });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// UPDATES
exports.updateTutorial = async (req, res) => {
  try {
    const updates = { 
      code: req.body.code, 
      title: req.body.title,
      description: req.body.description // Add this line
    };
    if (req.file) updates.videoUrl = "/uploads/tutorials/" + req.file.filename;

    const tutorial = await Tutorial.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!tutorial) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, tutorial });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// READ (all)
exports.getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().sort({ createdAt: 1 });
    res.json({ success: true, tutorials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ (single)


exports.getTutorialById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid tutorial ID" });
    }
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, tutorial });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};





// DELETE
exports.deleteTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndDelete(req.params.id);
    if (!tutorial) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, message: "Tutorial deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
