import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { getAllCategories, DeleteCategory } from './helper/adminapicall'

export default function ManageCategories() {

  const [Categories, setCategories] = useState([])
  const { user, token } = isAuthenticated()

  const preload = () => {
    getAllCategories().then(data => {
      if (data.err) {
        console.log(data.error)
      }
      else {
        setCategories(data)
      }
    })
  }

  useEffect(() => {
    preload()
  }, [])

  return (
    <Base title="Welcome admin" descrption="Manage Categories here" className='container bg-dark'>
      <Link className="btn btn-sm mt-2 btn-info" to={`/admin/dashboard`}>
        <span>Admin Home</span>
      </Link>
      <h4 className="mb-4 text-success text-center">Categories</h4>
      <div className="row">
        <div className="col-12">
          {Categories.map((category, index) => {
            return (
              <div key={index} className="row mb-2 ">
                <div className="col-7 offset-1">
                  <h5 className="text-white text-left"><span className='lead'> {index + 1}.    </span>{category.name}</h5>
                </div>
                <div className="col-2">
                  <Link
                    className="btn btn-sm btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-2 ">
                  <button value={category._id}
                    onClick={(event) => {
                      const categoryId = event.target.value;
                      DeleteCategory(user._id, categoryId, token)
                        .then(data => {
                          if (data.error) {
                            console.log(data.error);
                          } else {
                            preload()
                          }
                        })
                    }}
                    className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  )
}
