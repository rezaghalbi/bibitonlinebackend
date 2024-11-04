const express = require('express');
const purchaseController = require('../controllers/purchaseController');
const router = express.Router();

router.post('/', purchaseController.createPurchase);
router.post('/items', purchaseController.addItemToPurchase);
router.get('/:purchaseId', purchaseController.getPurchase);

module.exports = router;
