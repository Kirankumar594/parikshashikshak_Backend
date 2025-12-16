
  
 
 
// controllers/resultManagement.controller.js
const ResultManagement = require("../../Module/Admin/ResultSheetMangement");

/**
 * POST /api/results
 * Add a new result document
 */
exports.addResult = async (req, res) => {
  try {
    const doc = await ResultManagement.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    console.error("Error adding result:", err);
    res.status(400).json({ message: err.message });
  }
};

/**
 * GET /api/results
 * Fetch every result document
 */
exports.fetchAllResults = async (_req, res) => {
  try {
    const results = await ResultManagement.find().lean();
    res.json(results);
  } catch (err) {
    console.error("Error fetching results:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/results/:id
 * Fetch one result by MongoDB _id
 */
exports.fetchResultById = async (req, res) => {
  try {
    const result = await ResultManagement.findById(req.params.id).lean();
    if (!result) return res.status(404).json({ message: "Result not found" });
    res.json(result);
  } catch (err) {
    console.error("Error fetching result:", err);
    res.status(400).json({ message: err.message });
  }
};

/**
 * PATCH /api/results/:id
 * Modify an existing result
 */
exports.modifyResultById = async (req, res) => {
  try {
    const updated = await ResultManagement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!updated) return res.status(404).json({ message: "Result not found" });
    res.json(updated);
  } catch (err) {
    console.error("Error modifying result:", err);
    res.status(400).json({ message: err.message });
  }
};

/**
 * DELETE /api/results/:id
 * Remove a result
 */
exports.removeResultById = async (req, res) => {
  try {
    const deleted = await ResultManagement.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return res.status(404).json({ message: "Result not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error removing result:", err);
    res.status(400).json({ message: err.message });
  }
};
