import {Product} from "../../modules/products/models/Product";
import axios from 'axios';

export const CREATE_PRODUCT_REQUEST : string = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS : string = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE : string = 'CREATE_PRODUCT_FAILURE';

export const GET_ALL_PRODUCTS_REQUEST: string = 'GET_ALL_PRODUCTS_REQUEST';
export const GET_ALL_PRODUCTS_SUCCESS: string = 'GET_ALL_PRODUCTS_SUCCESS';
export const GET_ALL_PRODUCTS_FAILURE: string = 'GET_ALL_PRODUCTS_FAILURE';

export const DELETE_PRODUCT_REQUEST : string = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS : string = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE : string = 'DELETE_PRODUCT_FAILURE';

export const GET_PRODUCT_REQUEST : string = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS : string = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE : string = 'GET_PRODUCT_FAILURE';

export const UPDATE_INPUT_FIELDS:string = 'UPDATE_INPUT_FIELDS';

export const UPDATE_PRODUCT_REQUEST : string = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS : string = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE : string = 'UPDATE_PRODUCT_FAILURE';

export const createProduct = (product:Product , history : any):any => {
    return async (dispatch:any) => {
        try {
            dispatch({type : CREATE_PRODUCT_REQUEST});
            let dataURL: string = 'http://127.0.0.1:5000/api/v1/products/';
            let response = await axios.post(dataURL, product);
            dispatch({type : CREATE_PRODUCT_SUCCESS , payload : response.data});
            history.push('/products/admin');
        }
        catch (error){
            dispatch({type : CREATE_PRODUCT_FAILURE , payload : {error : error}});
        }
    };
};

export const getAllProducts = () => {
    return async (dispatch : any) => {
        try {
            dispatch({type : GET_ALL_PRODUCTS_REQUEST});
            let dataURL : string = `http://127.0.0.1:5000/api/v1/products/`;
            let response = await axios.get(dataURL);
            dispatch({type : GET_ALL_PRODUCTS_SUCCESS , payload : {products : response.data.products}});
        }
        catch (error){
            dispatch({type : GET_ALL_PRODUCTS_FAILURE, payload : {error : error}});
        }
    }
};

export const deleteProduct = (productId: string) => {
    return async (dispatch : any) => {
        try {
            dispatch({type : DELETE_PRODUCT_REQUEST});
            let dataURL : string = `http://127.0.0.1:5000/api/v1/products/${productId}`;
            let response = await axios.delete(dataURL);
            dispatch({type : DELETE_PRODUCT_SUCCESS});
            dispatch(getAllProducts());
        }
        catch (error){
            dispatch({type : DELETE_PRODUCT_FAILURE, payload : {error : error}});
        }
    }
};

export const getProduct = (productId : string) => {
    return async (dispatch : any) => {
        try {
            dispatch({type : GET_PRODUCT_REQUEST});
            let dataURL : string = `http://127.0.0.1:5000/api/v1/products/${productId}`;
            let response = await axios.get(dataURL);
            dispatch({type : GET_PRODUCT_SUCCESS , payload : {product : response.data.product}});
        }
        catch (error){
            dispatch({type : GET_PRODUCT_FAILURE, payload : {error : error}});
        }
    }
};

export const updateInputFields = (name : string , value : any) => {
    return {
        type : UPDATE_INPUT_FIELDS,
        payload : {
            name : name,
            value : value
        }
    }
};

export const updateProduct = (product:Product , productId: string,  history : any):any => {
    return async (dispatch:any) => {
        try {
            dispatch({type : UPDATE_PRODUCT_REQUEST});
            let dataURL: string = `http://127.0.0.1:5000/api/v1/products/${productId}`;
            let response = await axios.put(dataURL, product);
            dispatch({type : UPDATE_PRODUCT_SUCCESS , payload : response.data});
            history.push('/products/admin');
        }
        catch (error){
            dispatch({type : UPDATE_PRODUCT_FAILURE , payload : {error : error}});
        }
    };
};