const UserRoutes = require('express').Router();
const userRoutes = require('./user.routes');
const  productroutes = require('./product.routes');

UserRoutes.use('/user',userRoutes);

UserRoutes.use('/product',productroutes);

module.exports = UserRoutes;