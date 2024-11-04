const express = require('express');
const salesController = require('../controllers/salesController');
const router = express.Router();

router.post('/', salesController.createSale);
router.get('/customer/:customerId', salesController.getSalesByCustomer);
router.get('/', salesController.getAllSales);

module.exports = router;
