const express = require('express');
const productRoutes = express.Router();

const { adminVerifyToken } = require('../../helper/adminverifyToken');

const {

    addNewProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct

} = require('../../controller/Admin/product.controller');


productRoutes.post('/add-new-product',adminVerifyToken,addNewProduct);

productRoutes.get('/get-product',adminVerifyToken,getProduct);

productRoutes.get('/get-all-products',adminVerifyToken,getAllProducts);

productRoutes.put('/update-product',adminVerifyToken,updateProduct);

productRoutes.delete('/delete-product',adminVerifyToken,deleteProduct);

module.exports = productRoutes;