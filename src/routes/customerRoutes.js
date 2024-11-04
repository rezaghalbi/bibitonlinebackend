const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Rute untuk CRUD dan autentikasi customer
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.post('/register', customerController.registerCustomer);
router.post('/login', customerController.loginCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
