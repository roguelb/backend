// import controllers review, products
const productController = require('../../components/product/ProductController');

// router
const router = require('express').Router();

router.get('/product', productController.getAllProducts);
router.get('/product/:pid', productController.getProductById);
router.post('/product/create', productController.addProduct);
router.put('/product/update/:pid', productController.updateProduct);
router.post('/product/search', productController.searchProductResult);
module.exports = router;
