import React from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from "../core/Base"
import {Link} from "react-router-dom"


function AdminDashBoard() {

  const {user : {name, email}} = isAuthenticated();

  function adminLeftSide() {
    return (
      <div className="card">
        <h6 className="card-header custom-ad-bg">Admin Navigation</h6>
        <ul className="list-group">
          <li className="mynav list-group-item">
            <Link to="/admin/create/category" className='nav-link text-dark'>Create Category</Link>
          </li>
          <li className="mynav list-group-item">
            <Link to="/admin/categories" className='nav-link text-dark'>Manage Categories</Link>
          </li>
          <li className="mynav list-group-item">
            <Link to="/admin/create/product" className='nav-link text-dark'>Create Product</Link>
          </li>
          <li className="mynav list-group-item">
            <Link to="/admin/products" className='nav-link text-dark'>Manage Products</Link>
          </li>
          <li className="mynav list-group-item">
            <Link to="/admin/orders" className='nav-link text-dark'>Manage Orders</Link>
          </li>
        </ul>
      </div>
  )}

  function adminRightSide() {
    return (
      <div className="card mb-4 ">
        <h6 className="card-header custom-ad-bg">Admin Info</h6>
        <ul className="list-group mx-2 mb-2" >
          <li className="admin-page p-2 border-bottom group-item">
            <span className="badge text-bg-warning me-2">
              Name:
            </span>  {name}
          </li>
          <li className="admin-page p-2 border-bottom group-item">
            <span className="badge text-bg-warning me-2">
              Email:
            </span>  {email}
          </li>
          <li className="admin-page p-2 group-item">
            <span className="badge bg-danger">Admin Area</span>
          </li>
        </ul>
      </div>
  )}


  return (
    <Base title='Welcome to Admin area'  
    descrption='Manage your products here'
    className='container bg-dark p-4 mb-5'>
        <div className="row">
          <div className="col-3">
            {adminLeftSide()}
          </div>
          <div className="col-9">
            {adminRightSide()}  
          </div>
        </div>
        
       
    </Base>
  )
}

export default AdminDashBoard;