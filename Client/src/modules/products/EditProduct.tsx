import React, {useEffect, useState} from 'react';
import {useParams , useHistory} from 'react-router-dom';
import * as productActions from '../../redux/products/product.actions';
import * as productReducer from '../../redux/products/product.reducer';
import {useSelector , useDispatch} from "react-redux";
import {Product} from "./models/Product";

interface URLParams{
    productId : string
}
interface IProps{}
interface IState{
    productKey : productReducer.ProductState
}
interface ProductState{
    product : Product
}

let EditProduct:React.FC<IProps> = ({}) => {
    let history = useHistory();
    let dispatch = useDispatch();
    let {productId} = useParams<URLParams>();

    // get the product information from the REDUX store
    let productState:productReducer.ProductState = useSelector((store: IState) => {
        return store.productKey;
    });


    let {selectedProduct , loading , errorMessage} = productState;

    useEffect(() => {
        dispatch(productActions.getProduct(productId));
    }, [productId]);

    let updateInputFields = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(productActions.updateInputFields(event.target.name , event.target.value));
    };

    let submitUpdateProduct = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(productActions.updateProduct(selectedProduct , productId, history));
    };

    return(
        <React.Fragment>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Edit Product</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cum eaque enim eos, error facilis quam quos saepe sapiente voluptates? Architecto at atque fugit, harum nihil praesentium tempora tempore vel!</p>
                        </div>
                    </div>
                </div>
            </section>
         {/*   <pre>{JSON.stringify(selectedProduct)}</pre>*/}
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header bg-success text-white">
                                    <p className="h4"> <i className="fa fa-edit"/> Edit Product</p>
                                </div>
                                <div className="card-body bg-light-green">
                                    <form onSubmit={submitUpdateProduct}>
                                        <div className="mb-2">
                                            <input
                                                name={'name'}
                                                value={selectedProduct.name}
                                                onChange={updateInputFields}
                                                type='text' className="form-control" placeholder='Name'/>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name={'image'}
                                                value={selectedProduct.image}
                                                onChange={updateInputFields}
                                                type='text' className="form-control" placeholder='Image'/>
                                            <img src={selectedProduct.image} alt={''} width={30} height={30}/>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name={'price'}
                                                value={selectedProduct.price}
                                                onChange={updateInputFields}
                                                type='text' className="form-control" placeholder='Price'/>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name={'qty'}
                                                value={selectedProduct.qty}
                                                onChange={updateInputFields}
                                                type='text' className="form-control" placeholder='Qty'/>
                                        </div>
                                        <div className="mb-2">
                                            <textarea
                                                name={'info'}
                                                value={selectedProduct.info}
                                                onChange={updateInputFields}
                                                rows={4} className="form-control" placeholder='Information'/>
                                        </div>
                                        <div className="mb-2">
                                            <input type='submit' className="btn btn-sm btn-success" value='Update'/>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default EditProduct;