import express from 'express';
import {ProductTable} from "../database/schemas/Product";

const apiRouter:express.Router = express.Router();

/*
    @usage : Create a Product
    @url : http://127.0.0.1:5000/api/v1/products/
    @method : POST
    @fields : name , image , price , qty , info
    @access : PUBLIC
 */
apiRouter.post('/', async (request:express.Request , response:express.Response) => {
    try{
        let {name , image , price , qty , info} = request.body;
        console.log(name, image);
        // check if the same product exists
        let product = await ProductTable.findOne({name : name});
        if(product){
           return response.status(401).json({msg : 'Product is already exits!'});
        }
        // create a product
        product = new ProductTable({
            name : name,
            image : image,
            price : price,
            qty : qty,
            info : info
        });
        product = await product.save(); // save to db
        response.status(200).json({msg : 'Product is Created'});
    }
    catch (error){
        return response.status(500).json({msg : 'Server Error!'});
    }
});

/*
    @usage : Update a Product
    @url : http://127.0.0.1:5000/api/v1/products/:productId
    @method : PUT
    @fields : name , image , price , qty , info
    @access : PUBLIC
 */
apiRouter.put('/:productId', async (request:express.Request , response:express.Response) => {
    let productId = request.params.productId;
    try {
        let {name , image , price , qty , info} = request.body;
        // check if the product is exists
        let product = await ProductTable.findById(productId);
        if(!product){
            return response.status(401).json({msg : 'Product is not found!'});
        }
        product = await ProductTable.findByIdAndUpdate(productId , {
            $set : {name , image , price , qty , info}
        }, {new : true});
        response.status(200).json({msg : 'Product is updated'});
    }
    catch (error){
        if(error.kind === 'ObjectId'){
            return response.status(500).json({msg : 'Product is not found!'});
        }
        return response.status(500).json({msg : 'Server Error'});
    }
});

/*
    @usage : Get all Products
    @url : http://127.0.0.1:5000/api/v1/products/
    @method : GET
    @fields : no-fields
    @access : PUBLIC
 */
apiRouter.get('/', async (request:express.Request , response:express.Response) => {
   try {
       let products = await ProductTable.find(); // select * from Products;
       response.status(200).json({
           products : products
       });
   }
   catch (error){
       return response.status(500).json({msg : 'Server Error!'});
   }
});

/*
    @usage : Get a Product
    @url : http://127.0.0.1:5000/api/v1/products/:productId
    @method : GET
    @fields : no-fields
    @access : PUBLIC
 */
apiRouter.get('/:productId', async (request:express.Request , response:express.Response) => {
    let productId = request.params.productId;
    try{
        let product = await ProductTable.findById(productId);
        if(!product){
            return response.status(401).json({msg : 'Product is not found!'});
        }
        response.status(200).json({product : product});
    }
    catch (error){
        if(error.kind === 'ObjectId'){
            return response.status(500).json({msg : 'Product is not found!'});
        }
        return response.status(500).json({msg : 'Server Error'});
    }

});

/*
    @usage : Delete a Product
    @url : http://127.0.0.1:5000/api/v1/products/:productId
    @method : DELETE
    @fields : no-fields
    @access : PUBLIC
 */
apiRouter.delete('/:productId', async (request:express.Request , response:express.Response) => {
    let productId = request.params.productId;
    try {
        let product = await ProductTable.findById(productId);
        if(!product){
            return response.status(401).json({msg : 'Product is not found!'});
        }
        // delete  a product
        product = await ProductTable.findByIdAndRemove(productId);
        response.status(200).json({msg : 'Product is Deleted'});
    }
    catch (error){
        if(error.kind === 'ObjectId'){
            return response.status(500).json({msg : 'Product is not found!'});
        }
        return response.status(500).json({msg : 'Server Error'});
    }
});


export default apiRouter;