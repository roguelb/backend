// import controllers review, products
const orderline = require('../../components/orderline/OrderLinController');


// router
const router = require('express').Router()

router.get('/orderline/:username', orderline.getAllOrderlinesByUsername)
router.get('/orderline/expand/:oid', orderline.getOrderLineByID)
router.put('/orderline/update/:pid', orderline.updateOrderline)
module.exports = router