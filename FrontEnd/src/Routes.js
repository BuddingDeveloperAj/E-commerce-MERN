import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import Home from "./core/Home";
import AdminDashBoard from './user/AdminDashBoard';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashBoard from './user/UserDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateAProduct from './admin/UpdateProduct';
import UpdateACateory from './admin/UpdateCategory';
import Cart from './core/Cart';

function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element=<Home/> />
            <Route path="/signup" exact element=<Signup /> />
            <Route path="/signin" exact element=<Signin /> />
            <Route path="/user/dashboard" exact element={<PrivateRoute><UserDashBoard /></PrivateRoute>} />
            <Route path="/admin/dashboard" exact element={<AdminRoute><AdminDashBoard /></AdminRoute>} />  
            <Route path="/admin/create/category" exact element={<AdminRoute><AddCategory /></AdminRoute>} />  
            <Route path="/admin/categories" exact element={<AdminRoute><ManageCategories /></AdminRoute>} />  
            <Route path="/admin/create/product" exact element={<AdminRoute><AddProduct /></AdminRoute>} />  
            <Route path="/admin/products" exact element={<AdminRoute><ManageProducts /></AdminRoute>} />  
            <Route path="/admin/product/update/:productId" exact element={<AdminRoute><UpdateAProduct /></AdminRoute>} />  
            <Route path="/admin/category/update/:categoryId" exact element={<AdminRoute><UpdateACateory/></AdminRoute>} />  
            <Route path="/cart" exact element={<Cart/>} />  
        </Routes>
    </BrowserRouter>
  )
}

export default Routing;