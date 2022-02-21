const express = require('express');
const authHandler = require('../middleware/authHandler');
const { newOrder, myOrders, getAllOrders } = require('../controller/orderController');
const router = express.Router();

// router.use(authHandler)

router.post('/order/new', newOrder);
router.get('/orders/me', myOrders);
router.get('/admin/orders', getAllOrders);

module.exports = router;
