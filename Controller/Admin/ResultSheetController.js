const StudentResult = require('../../Module/Admin/ResultSheet'); 

exports.createResult = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['name', 'registerNumber', 'className', 'academicYear'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });  
    }    
    const resultData = req.body;
    const newResult = new StudentResult(resultData);
    await newResult.save();
    res.status(201).json({ success: true, data: newResult });
  } catch (error) {
    if (error.code === 11000) { 
      return res.status(400).json({
        success: false,
        message: 'Register number must be unique' 
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllResults = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, className } = req.query;
    const query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (className) {
      query.className = className;
    }
    
    const results = await StudentResult.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await StudentResult.countDocuments(query);

    res.status(200).json({
      success: true,
      data: results,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getResultById = async (req, res) => {
  try {
    const result = await StudentResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const result = await StudentResult.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!result) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Register number must be unique'
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    const result = await StudentResult.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getResultsByClass = async (req, res) => {
  try {
    const results = await StudentResult.find({ className: req.params.class });
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all unique classes for dropdown
exports.getUniqueClasses = async (req, res) => {
  try {
    const classes = await StudentResult.distinct('className');
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}; 
 
exports.searchStudents = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, className } = req.query;
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { registerNumber: { $regex: search, $options: 'i' } },
        { fatherName: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (className) {
      query.className = className;
    }
    
    const results = await StudentResult.find(query)
      .select('name registerNumber className fatherName')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ name: 1 });

    const total = await StudentResult.countDocuments(query);

    res.status(200).json({
      success: true,
      data: results,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)    
      } 
    }); 
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

