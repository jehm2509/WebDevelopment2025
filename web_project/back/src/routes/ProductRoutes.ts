import { createProduct, listProducts } from '@/controllers/ProductController';
import { validateRequest } from '@/middlewares/requestValidator';
import { CreateProductValidator, ListProductValidator } from '@/validators/ProductValidators';
import express from 'express';

const productRoutes = express.Router();

// url to public api login
productRoutes.get('/api/public_products', validateRequest(ListProductValidator), listProducts);
// require login
productRoutes.get('/api/products', validateRequest(ListProductValidator, true), listProducts);
// require login and admin
productRoutes.post('/api/product', validateRequest(CreateProductValidator, true, true), createProduct);

export default productRoutes;