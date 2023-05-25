const express = require('express')
const authController = require("./../controllers/authController")
const productController = require("./../controllers/productController")
const router = express.Router()


router.post("/addproduct",
    authController.protect,
    authController.uploadProductPhoto,
    productController.createProduct
)
router.get('/getProductDataByIdForUser',
    authController.protect,
    productController.getProductDetailsByIdForUser
    )

router
    .route("/:id")
    .get(authController.protect,productController.getProductDetailsById)
    .delete(authController.protect,productController.deleteProductDataUsingId)
    .patch(authController.protect,productController.updateProductDataUsingId)

router
    .route("/")
    .get(authController.protect,productController.getAllProductDetails)
module.exports = router
