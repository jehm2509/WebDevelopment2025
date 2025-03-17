import Product from "@/models/Product";
import { Request, Response } from "express";

export function createProduct(request: Request, response: Response) {
    let productParams = request.body;

    let newProduct = new Product(productParams);
    newProduct.save().then(
        (productSaved) => {
            response.status(200).send({
                message: 'Product created successfully'
            });
        },
        err => {
            response.status(500).send({
                message: 'An error ocurred while creating the product'
            });
        }
    );
}

export function listProducts(request: Request, response: Response) {


    let filters = {};

    Product.find(filters).then(
        (foundProducts) => {
            response.status(200).send(foundProducts);
        },
        err => {
            response.status(500).send({ message: "Error getting products" });
        }
    );



}