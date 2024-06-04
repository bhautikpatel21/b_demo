const express = require('express');

const userRoutes = express.Router();

const { userVerifyToken } = require('../../helper/userverifyToken');

const {

    addNewProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct

} = require('../../controller/User/product.controller');

userRoutes.post('/add-product',userVerifyToken,addNewProduct);

userRoutes.get('/get-product',userVerifyToken,getProduct);

userRoutes.get('/get-all-product',userVerifyToken,getAllProduct);

userRoutes.put('/update-product',userVerifyToken,updateProduct);

userRoutes.delete('/delete-product',userVerifyToken,deleteProduct);

module.exports = userRoutes;