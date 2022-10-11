import React, {useState, useEffect} from 'react'
import "../styles.css"
import {API} from "../backend"
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'
import { useNavigate } from 'react-router-dom'


export default function Home() {
  const Navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();

  const loadAllProducts = () => {
    getProducts().then(data => {
      if (data.err){
        setError(data.error)
      }else{
        setProducts(data)
      }
    })
  }
 

  useEffect(()=> {
    loadAllProducts()
    
  }, [])

  return (
    <Base title="Home Page" descrption='Welcome to shopping zone'>
        
        <div className="row">
        <div className="col-10 offset-1 row" >
        {products.map((product,index) => (
          <div  key={index} className="col-lg-3 col-md-4 text-white col-sm-6" style={{cursor: "pointer"}}>
          <Card product={product}/>
          </div>
            ))}
            </div>
        </div>
    </Base>
  )
}
