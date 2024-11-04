const express = require('express');
const multer = require('multer');
const router = express.Router();
const Product = require('../models/productModel');
const productController = require('../controllers/productController');
const upload = multer({ dest: 'uploads/' });

router.get('/', productController.getProducts);

router.post('/', upload.single('image_url'), async (req, res) => {
  try {
    const { name, price, stock, status } = req.body;
    const image_url = req.file ? req.file.path : null;

    const product = await Product.create({
      name,
      price,
      stock,
      image_url,
      status,
    });

    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
});

router.get('/:id', productController.getProductById);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
