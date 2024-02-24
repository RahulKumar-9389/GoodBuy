import productModel from '../models/productModel.js';
import orderModel from '../models/orderModel.js';
import slugify from 'slugify';
import fs from 'fs';
import braintree from "braintree";
import dotenv from 'dotenv';

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
});



// <--------------- CREATE PRODUCT CONTROLLER --------------------->
export async function createProductController(req, res) {
    try {
        const { name, description, price, category, quantity, } =
            req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 2000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 2mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error while create product!",
            success: false,
            error,
        });
    }
}



// <--------------- UPDATE PRODUCT CONTROLLER --------------------->
export async function updateProductController(req, res) {
    try {
        const { name, description, price, category, quantity, } = req.fields;
        const { photo } = req.files;
        if (!name || !description || !price || !category || !quantity || !photo) {
            return res.send("Please fill all required fields!")
        }

        // update product
        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Error while update product!",
            success: false,
            error
        })
    }
};



// <--------------- DELETE PRODUCT CONTROLLER --------------------->
export async function deleteProductController(req, res) {
    try {

        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Error while delete product!",
            success: false,
            error
        })
    }
};



// <--------------- GET ALL PRODUCTS CONTROLLER --------------------->
export async function getAllProductsController(req, res) {
    try {
        const products = await productModel
            .find({})
            .select("-photo")
        res.status(200).send({
            success: true,
            message: "All products list! ",
            products,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Error while get all products!",
            success: false,
            error
        })
    }
};



// <--------------- GET SINGLE PRODUCT CONTROLLER --------------------->
export async function getSingleProductController(req, res) {
    try {

        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
        res.status(200).send({
            success: true,
            message: "Single Product ",
            product,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Error while get single product!",
            success: false,
            error
        })
    }
};



// <--------------- GET PRODUCT PHOTO CONTROLLER --------------------->
export async function getProductPhotoController(req, res) {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Error while get  product photo!",
            success: false,
            error
        })
    }
};



// <--------------- PAYMENT CONTROLLER --------------------->

//token
export async function braintreeTokenController(req, res) {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

//payment
export async function brainTreePaymentController(req, res) {
    try {
        const { nonce, products } = req.body;
        let total = 0;
        products.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: products,
                        payment: result,
                        buyer: req.user.id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};



// <--------------- SEARCH PRODUCT CONTROLLER --------------------->
export async function searchProductController(req, res) {
    try {
        const { keyword } = req.params;
        const resutls = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
}

