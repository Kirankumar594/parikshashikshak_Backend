const express = require("express");
const router = express.Router();
const upload = require("../../Middleware/uploadVideo")
const {
  createTutorial,
  getTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
} = require("../../Controller/Admin/TutorialController");
router.get("/getalltutorials", getTutorials);
// Create tutorial (Admin upload video)
router.post("/tutorials", upload.any(""), createTutorial);

// Get all tutorials


// Get single tutorial
router.get("/tutorials/:id", getTutorialById);

// Update tutorial
router.put("/tutorials/:id", upload.any(""), updateTutorial);

// Delete tutorial
router.delete("/tutorials/:id", deleteTutorial);

module.exports = router;
