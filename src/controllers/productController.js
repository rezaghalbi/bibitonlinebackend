const Product = require('../models/productModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diperbolehkan!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.addProduct = async (req, res) => {
  upload.single('image_url')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { name, price, stock, status } = req.body;
    const image_url = req.file ? req.file.path : null;
    try {
      const newProduct = await Product.create({
        name,
        price,
        stock,
        image_url,
        status,
      });
      res
        .status(201)
        .json({ message: 'Produk berhasil ditambahkan', product: newProduct });
    } catch (error) {
      res.status(500).json({
        message: 'Terjadi kesalahan pada server',
        error: error.message,
      });
    }
  });
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    upload.single('image_url')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { name, price, stock, status } = req.body;
      const image_url = req.file ? req.file.path : product.image_url;
      await product.update({ name, price, stock, image_url, status });
      res.status(200).json({ message: 'Produk berhasil diperbarui', product });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};
