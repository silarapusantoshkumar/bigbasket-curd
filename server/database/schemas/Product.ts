import mongoose, {Schema, Model} from 'mongoose';
import {ProductView} from "../models/ProductView";

const productSchema:Schema = new mongoose.Schema({
    name : {type : String , required : true},
    image : {type : String , required : true},
    price : {type : Number , required : true},
    qty : {type : Number , required : true},
    info : {type : String , required : true}
},{timestamps : true});

export const ProductTable:Model<ProductView> = mongoose.model('product', productSchema);