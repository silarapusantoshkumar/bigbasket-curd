import {combineReducers} from 'redux';
import * as productReducer from './products/product.reducer';

export const rootReducer = combineReducers({
    productKey : productReducer.reducer
});