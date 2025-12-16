const mongoose = require('mongoose');

const marksheetSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: true,
    trim: true
  },
  className: {
    type: String,
    required: true,
    enum: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']
  },
  section: {
    type: String,
    trim: true
  },
  examName: {
    type: String,
    required: true,
    trim: true
  },
  examDate: {
    type: Date
  },
  subjects: [{
    name: {
      type: String,
      required: true
    },
    totalMarks: {
      type: Number,
      required: true,
      min: 0
    },
    obtainedMarks: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalMarks: {
    type: Number,
    required: true
  },
  obtainedMarks: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    required: true,
    enum: ['A+', 'A', 'B+', 'B', 'C', 'D', 'F']
  },
  status: {
    type: String,
    enum: ['Draft', 'Generated', 'Pending'],
    default: 'Draft'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Marksheet', marksheetSchema);