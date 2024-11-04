const express = require('express');
const router = express.Router();
const preorderController = require('../controllers/preordersController');

// Route untuk mendapatkan semua preorder
router.get('/', preorderController.getAllPreorders);

// Route untuk mendapatkan preorder berdasarkan ID
router.get('/:id', preorderController.getPreorderById);

// Route untuk menambah preorder
router.post('/', preorderController.addPreorder);

// Route untuk memperbarui preorder
router.put('/:id', preorderController.updatePreorder);

// Route untuk menghapus preorder
router.delete('/:id', preorderController.deletePreorder);

module.exports = router;
