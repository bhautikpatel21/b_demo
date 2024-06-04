const adminRoutes = require('express').Router();
const userRoutes = require('./admin.routes');
const productRoutes = require('./poduct.routes');

adminRoutes.use('/admin',userRoutes);
adminRoutes.use('/product',productRoutes);

module.exports = adminRoutes;