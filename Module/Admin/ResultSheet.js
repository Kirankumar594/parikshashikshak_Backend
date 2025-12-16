const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  state: String,
  district: String,
  taluk: String,
  village: String,
  city: String,
  pincode: String
});

const attendanceSchema = new mongoose.Schema({
  attended: Number,
  workingDays: Number
});

const subjectSchema = new mongoose.Schema({
  name: String,
  FA1: { type: Number, min: 0, max: 100 },
  FA2: { type: Number, min: 0, max: 100 },
  SA1: { type: Number, min: 0, max: 100 },
  FA3: { type: Number, min: 0, max: 100 },
  FA4: { type: Number, min: 0, max: 100 },
  SA2: { type: Number, min: 0, max: 100 }
});      




const coScholasticSchema = new mongoose.Schema({
  physicalEducation: String,
  art: String,
  music: String,
  supw: String
});

const studentResultSchema = new mongoose.Schema({
  academicYear: String,
  medium: String,
  board: String,
  className: String,
  name: String,
  fatherName: String,
  motherName: String,
  dob: Date,
  bloodGroup: String,
  registerNumber: { type: String, unique: true },
  parentContact: String,
  aadhaarNumber: String,
  gender: String,
  caste: String,
  category: String,
  height: String,
  weight: String,
  address: addressSchema,
  subjects: {
    firstLanguage: subjectSchema,
    secondLanguage: subjectSchema,
    mathematics: subjectSchema,
    science: subjectSchema,
    socialScience: subjectSchema,
    environmentScience: subjectSchema
  },
  coScholastic: coScholasticSchema,
  attendance: {
    semester1: attendanceSchema,
    semester2: attendanceSchema
  },
  specialAchievements: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add text index for search
studentResultSchema.index({
  name: 'text',
  registerNumber: 'text',
  className: 'text',
  fatherName: 'text'
});

module.exports = mongoose.model('StudentResult', studentResultSchema);