import React from 'react';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import NavBar from "./modules/layout/NavBar";
import Home from "./modules/layout/Home";
import ProductDisplay from "./modules/products/ProductDisplay";
import ProductAdmin from "./modules/products/ProductAdmin";
import AddProduct from "./modules/products/AddProduct";
import EditProduct from "./modules/products/EditProduct";

function App() {

  return (
    <React.Fragment>
       <BrowserRouter>
           <NavBar/>
           <Switch>
               <Route exact path={'/'} component={Home}/>
               <Route exact path={'/products/list'} component={ProductDisplay}/>
               <Route exact path={'/products/admin'} component={ProductAdmin}/>
               <Route exact path={'/products/add'} component={AddProduct}/>
               <Route exact path={'/products/:productId'} component={EditProduct}/>
           </Switch>
       </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
