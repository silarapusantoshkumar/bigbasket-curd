import mongoose , {Document} from 'mongoose';

export interface ProductView extends Document{
    name? : string;
    image? : string;
    price? : number;
    qty? : number;
    info? : string;
    createdAt ? : string;
    updatedAt ? : string;
}