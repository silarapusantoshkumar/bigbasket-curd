import React from 'react';
import {NavLink} from 'react-router-dom';

interface IProps{}
interface IState{}

let NavBar:React.FC<IProps> = ({}) => {
    return(
        <React.Fragment>
            <nav className="navbar navbar-dark bg-success navbar-expand-sm">
                <div className="container">
                    <NavLink to={'/'} className="navbar-brand">
                       <i className='fa fa-shopping-cart'/> Big Basket</NavLink>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink to={'/'} className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/products/list'} className="nav-link">Products</NavLink>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to={'/products/admin'} className="nav-link">Admin</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
};
export default NavBar;