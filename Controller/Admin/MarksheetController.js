const Marksheet = require('../../Module/Admin/Marksheet');

// Get all marksheets
const getAllMarksheets = async (req, res) => {
  try {
    const marksheets = await Marksheet.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: marksheets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching marksheets',
      error: error.message
    });
  }
};

// Get marksheet by ID
const getMarksheetById = async (req, res) => {
  try {
    const { id } = req.params;
    const marksheet = await Marksheet.findById(id);
    
    if (!marksheet) {
      return res.status(404).json({
        success: false,
        message: 'Marksheet not found'
      });
    }

    res.status(200).json({
      success: true,
      data: marksheet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching marksheet',
      error: error.message
    });
  }
};

// Create new marksheet
const createMarksheet = async (req, res) => {
  try {
    const {
      studentName,
      rollNumber,
      className,
      section,
      examName,
      examDate,
      subjects
    } = req.body;

    // Calculate totals
    const totalMarks = subjects.reduce((sum, subject) => sum + subject.totalMarks, 0);
    const obtainedMarks = subjects.reduce((sum, subject) => sum + subject.obtainedMarks, 0);
    const percentage = totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100) : 0;
    
    // Calculate grade
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C';
    else if (percentage >= 40) grade = 'D';

    const marksheet = new Marksheet({
      studentName,
      rollNumber,
      className,
      section,
      examName,
      examDate,
      subjects,
      totalMarks,
      obtainedMarks,
      percentage: parseFloat(percentage.toFixed(2)),
      grade,
      status: 'Generated'
    });

    await marksheet.save();

    res.status(201).json({
      success: true,
      message: 'Marksheet created successfully',
      data: marksheet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating marksheet',
      error: error.message
    });
  }
};
// Update marksheet
const updateMarksheet = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      studentName,
      rollNumber,
      className,
      section,
      examName,
      examDate,
      subjects
    } = req.body;

    // Calculate totals
    const totalMarks = subjects.reduce((sum, subject) => sum + subject.totalMarks, 0);
    const obtainedMarks = subjects.reduce((sum, subject) => sum + subject.obtainedMarks, 0);
    const percentage = totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100) : 0;
    
    // Calculate grade
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C';
    else if (percentage >= 40) grade = 'D';

    const marksheet = await Marksheet.findByIdAndUpdate(
      id,
      {
        studentName,
        rollNumber,
        className,
        section,
        examName,
        examDate,
        subjects,
        totalMarks,
        obtainedMarks,
        percentage: parseFloat(percentage.toFixed(2)),
        grade,
        status: 'Generated'
      },
      { new: true }
    );

    if (!marksheet) {
      return res.status(404).json({
        success: false,
        message: 'Marksheet not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Marksheet updated successfully',
      data: marksheet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating marksheet',
      error: error.message
    });
  }
};

// Delete marksheet
const deleteMarksheet = async (req, res) => {
  try {
    const { id } = req.params;
    const marksheet = await Marksheet.findByIdAndDelete(id);

    if (!marksheet) {
      return res.status(404).json({
        success: false,
        message: 'Marksheet not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Marksheet deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting marksheet',
      error: error.message
    });
  }
};

// Get marksheet statistics
const getMarksheetStats = async (req, res) => {
  try {
    const totalMarksheets = await Marksheet.countDocuments();
    const generatedMarksheets = await Marksheet.countDocuments({ status: 'Generated' });
    const draftMarksheets = await Marksheet.countDocuments({ status: 'Draft' });
    const pendingMarksheets = await Marksheet.countDocuments({ status: 'Pending' });

    res.status(200).json({
      success: true,
      data: {
        total: totalMarksheets,
        generated: generatedMarksheets,
        draft: draftMarksheets,
        pending: pendingMarksheets,
        downloads: 156 // This would be tracked separately in a real app
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

module.exports = {
  getAllMarksheets,
  getMarksheetById,
  createMarksheet,
  updateMarksheet,
  deleteMarksheet,
  getMarksheetStats
};