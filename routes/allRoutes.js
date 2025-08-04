const routes = require('express').Router();
const categoryRoutes = require('../routes/categoryRoutes');
const subCategoryRoutes = require('./subCategoryRoutes');
const productRoutes = require('./productRoutes');
const paymentRoutes = require('./paymentRoutes')
routes.use('/api/categories', categoryRoutes);
routes.use('/api/subcategories', subCategoryRoutes);
routes.use('/api/products', productRoutes);
routes.use('/api/payment', paymentRoutes);
routes.use('/api/orders', paymentRoutes);


module.exports = routes; 