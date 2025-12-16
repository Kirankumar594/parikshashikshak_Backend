const express = require('express');
const resultController = require('../../Controller/Admin/ResultSheetController');
const router = express.Router();

// CRUD operations
router.post('/', resultController.createResult);
router.get('/', resultController.getAllResults);
router.get('/', resultController.getUniqueClasses);
router.get('/:id', resultController.getResultById);
router.put('/:id', resultController.updateResult);
router.delete('/:id', resultController.deleteResult);
router.get('/class/:class', resultController.getResultsByClass);

module.exports = router; 