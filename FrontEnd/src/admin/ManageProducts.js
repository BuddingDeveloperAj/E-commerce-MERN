import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { DeleteProduct, getAllProducts } from './helper/adminapicall'

export default function ManageProducts() {

    const [products, setProducts] = useState([])
    const {user, token} = isAuthenticated()

    const preload = () => {
        getAllProducts().then(data => {
            if (data.err) {
                console.log(data.error)
            }
            else{
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

  return (
    <Base title="Welcome admin" description="Manage products here" className='container bg-dark'>
      <Link className="btn btn-sm mt-2 btn-info" to={`/admin/dashboard`}>
        <span>Admin Home</span>
      </Link>
      <h4 className="mb-4 text-success text-center">PRODUCTS</h4>
      <div className="row">
        <div className="col-12">
           {products.map((product,index) => {
            return (
            <div key={index} className="row mb-2 ">
            <div className="col-7 offset-1">
              <h5 className="text-white text-left"><span className='lead'> {index+1}.    </span>{product.name}</h5>
            </div>
            <div className="col-2">
              <Link
                className="btn btn-sm btn-success"
                to={`/admin/product/update/${product._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-2 ">
              <button value={product._id} 
              onClick={(event) => {
                const productId = event.target.value;
                DeleteProduct(user._id, productId, token)
                .then(data => {
                  if (data.error){
                    console.log(data.error);
                  }else{
                    preload()
                }})
                }} 
              className="btn btn-sm btn-danger">
                Delete
              </button>
            </div>
          </div>
           )})} 
          

        </div>
      </div>
    </Base>
  )
}
