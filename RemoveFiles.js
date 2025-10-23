const fs=require('fs');
const path = require('path');

function removeImages(imagePath){
    try{
// Check if the file exists before attempting to delete
fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('Error: The file does not exist.');
    } else {
      // File exists, proceed to delete it
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting the file:', err);
        } else {
          console.log('File deleted successfully.');
        }
      });
    }
  });
    }catch(error){
        console.log(error)
    }
}

module.exports={removeImages};