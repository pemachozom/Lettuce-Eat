const express = require('express')

const orderController = require("./../controllers/orderController")
const router = express.Router()

router
    .route("/")
    .post(orderController.createOrder)
    .get(orderController.getAllOrders)
router
    .route("/:id")
    .patch(orderController.updateStatus)
    .delete(orderController.deleteOrderDataUsingId)
router
    .route("/orderedList/:id")
    .get(orderController.getOrderDetailsById)
module.exports = router;