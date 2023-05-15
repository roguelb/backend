// import controllers review, products
const order = require('../../components/order/OrderController');


// router
const router = require('express').Router()

router.post('/order', order.createOrder)
router.get('/order', order.getAllOrders)
router.get('/order/completed', order.getCompletedOrders)
router.get('/order/incompleted', order.getInCompletedOrders)
router.put('/order/update', order.updateOrderStatus)
router.delete('/order/delete', order.deleteOrderAndOrderlines)
router.put('/order/update/address/:addrid', order.updateOrderAddressByUsername)
module.exports = router