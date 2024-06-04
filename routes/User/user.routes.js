const express = require('express');
const userRoutes = express.Router();
const { userVerifyToken } = require('../../helper/userverifyToken');
const {

    registerUser,
    loginUser,
    getAllUser,
    getUser,
    updatePassword,
    updateUser,
    deleteUser

} = require('../../controller/User/user.controller');

userRoutes.post('/register-user',registerUser);

userRoutes.post('/login-user',loginUser);

userRoutes.get('/get-all-user',userVerifyToken,getAllUser);

userRoutes.get('/get-user',userVerifyToken,getUser);

userRoutes.put('/update-user',userVerifyToken,updateUser);

userRoutes.delete('/delete-user',userVerifyToken,deleteUser);

userRoutes.put('/update-password',userVerifyToken,updatePassword);

module.exports = userRoutes;