const express = require('express');
const adminRoutes = express.Router();
const { adminVerifyToken } = require('../../helper/adminverifyToken');

const {
    registerUser,
    loginUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser,

} = require('../../controller/Admin/admn.controller');

adminRoutes.post('/register-admin',registerUser);

adminRoutes.post('/login-admin',loginUser);

adminRoutes.get('/get-all-user',adminVerifyToken,getAllUser);

adminRoutes.get('/get-user',adminVerifyToken,getUser);

adminRoutes.put('/update-user',adminVerifyToken,updateUser);

adminRoutes.delete('/delete-user',adminVerifyToken,deleteUser);

module.exports = adminRoutes;