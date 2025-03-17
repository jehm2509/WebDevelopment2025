import mongoose, { Schema, Document } from 'mongoose';


type ProductType = {
    title: String;
    description: String;
    price: Number;
};

interface ProductDocument extends ProductType, Document { }

const ProductSchema = new Schema<ProductDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

const Product = mongoose.model<ProductDocument>('Product', ProductSchema);

export default Product;