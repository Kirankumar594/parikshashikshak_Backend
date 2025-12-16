const express = require('express');
const router = express.Router();
const {
  getAllMarksheets,
  getMarksheetById,
  createMarksheet,
  updateMarksheet,
  deleteMarksheet,
  getMarksheetStats
} = require('../../Controller/Admin/MarksheetController');

// Get all marksheets
router.get('/', getAllMarksheets);

// Get marksheet statistics
router.get('/stats', getMarksheetStats);

// Get marksheet by ID
router.get('/:id', getMarksheetById);

// Create new marksheet
router.post('/', createMarksheet);

// Update marksheet
router.put('/:id', updateMarksheet);

// Delete marksheet
router.delete('/:id', deleteMarksheet);

module.exports = router;