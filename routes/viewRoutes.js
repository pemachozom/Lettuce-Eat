const express = require('express')
const router = express.Router()
const viewsController = require('./../controllers/viewController')

router.get('/', viewsController.getHome)
router.get('/login', viewsController.getLoginForm)
router.get('/signup', viewsController.getSignupForm)
router.get('/veg', viewsController.veg)
router.get('/nonveg', viewsController.nonveg)
router.get('/userdisplay', viewsController.userdisplay)
router.get('/adminorder', viewsController.adminorder)
router.get('/addproduct', viewsController.addproduct)
router.get('/cart', viewsController.cart)
router.get('/about', viewsController.about)
router.get('/myprofile', viewsController.myprofile)










module.exports = router

