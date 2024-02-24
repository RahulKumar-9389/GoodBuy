import express from 'express';
import { isLogin, isAdmin } from '../middlewares/authMiddleware.js';
import formidable from "express-formidable";

import {
    brainTreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getAllProductsController,
    getProductPhotoController,
    getSingleProductController,
    searchProductController,
    updateProductController
}
    from '../controllers/productController.js';

const router = express.Router();




// CREATE PRODUCT
router.post(
    "/create-product",
    isLogin,
    isAdmin,
    formidable(),
    createProductController
);



// UPDATE PRODUCT
router.put(
    "/update-product/:pid",
    isLogin,
    isAdmin,
    formidable(),
    updateProductController
);




// GET ALL PRODUCTS
router.get("/get-all-products", getAllProductsController);



// GET SINGLE PRODUCTS
router.get("/get-product/:slug", getSingleProductController);



// DELETE PRODUCT
router.delete("/delete-product/:pid", deleteProductController);



// GET PRODUCT PHOTO
router.get("/product-photo/:pid", getProductPhotoController);



// <---------------- PAYMENT ROUTES -------------------> 
// TOKEN
router.get("/braintree/token", braintreeTokenController);



// PAYMENT
router.post("/braintree/payment", isLogin, brainTreePaymentController);



// SEARCH PRODUCT
router.get("/search/:keyword", searchProductController);


export default router;