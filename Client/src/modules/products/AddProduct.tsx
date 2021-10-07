import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {Product} from "./models/Product";
import * as productActions from '../../redux/products/product.actions';
import {useDispatch} from "react-redux";

interface IProps{}
interface IState{
    product : Product
}

let AddProduct:React.FC<IProps> = ({}) => {
    let history = useHistory();
    let dispatch = useDispatch();

    let [state , setState] = useState<IState>({
        product : {
            name : '',
            image : '',
            price: 0,
            qty : 0,
            info : ''
        }
    });

    let onChange = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({
            product : {
                ...state.product,
                [event.target.name] : event.target.value
            }
        })
    };

    let submitCreateProduct = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // dispatch an action to create a product
        dispatch(productActions.createProduct(state.product , history));
    };

    return(
        <React.Fragment>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Add Product</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cum eaque enim eos, error facilis quam quos saepe sapiente voluptates? Architecto at atque fugit, harum nihil praesentium tempora tempore vel!</p>
                        </div>
                    </div>
                </div>
            </section>
           {/* <pre>{JSON.stringify(state.product)}</pre>*/}
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header bg-success text-white">
                                    <p className="h4"> <i className="fa fa-pen"/> Create Product</p>
                                </div>
                                <div className="card-body bg-light-green">
                                    <form onSubmit={submitCreateProduct}>
                                        <div className="mb-2">
                                            <input
                                                required
                                                value={state.product.name}
                                                name='name'
                                                onChange={onChange}
                                                type='text' className="form-control" placeholder='Name'/>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required
                                                value={state.product.image}
                                                name='image'
                                                onChange={onChange}
                                                type='text' className="form-control" placeholder='Image URL'/>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required
                                                value={state.product.price}
                                                name='price'
                                                onChange={onChange}
                                                type='number' className="form-control" placeholder='Price'/>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required
                                                value={state.product.qty}
                                                name='qty'
                                                onChange={onChange}
                                                type='text' className="form-control" placeholder='Qty'/>
                                        </div>
                                        <div className="mb-2">
                                            <textarea
                                                required
                                                value={state.product.info}
                                                name='info'
                                                onChange={onChange}
                                                rows={4} className="form-control" placeholder='Information'/>
                                        </div>
                                        <div className="mb-2">
                                            <input type='submit' className="btn btn-sm btn-success" value='Create'/>
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
export default AddProduct;