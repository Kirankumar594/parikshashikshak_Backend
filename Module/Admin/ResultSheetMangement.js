const mongoose = require('mongoose');

const resultManagementSchema = new mongoose.Schema({

  FA1: { type: Number },
  FA2: { type: Number },
  SA1: { type: Number},
  FA3: { type: Number},
  FA4: { type: Number},
  SA2: { type: Number}, 

  FA1P: { type: Number },
  FA2P: { type: Number },
  SA1P: { type: Number},
  FA3P: { type: Number},
  FA4P: { type: Number},
  SA2P: { type: Number}
  
});   
 
 
 


module.exports = mongoose.model('ResultManagement', resultManagementSchema); 