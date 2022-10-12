import React, {useState, useEffect} from 'react'
import "../styles.css"
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  const [products, setProducts] = useState([]);

  const loadAllProducts = () => {
    getProducts().then(data => {
      if (data.err){
        console.log(data.err)
      }else{
        setProducts(data)
      }
    })
  }
 
  const Message = () => toast("Item added to cart!");

  useEffect(()=> {
    loadAllProducts()
  }, [])

  return (
    <Base title="Home Page" descrption='Welcome to shopping zone'>
        <div className="row">
        <div className="col-10 offset-1 row" >
        {/* <ToastContainer /> */}
        {products.map((product,index) => (
          <div  key={index} className="col-lg-3 col-md-4 text-white col-sm-6" style={{cursor: "pointer"}}>
          <Card product={product} func={Message}/>
          </div>
            ))}
            </div>
        </div>
    </Base>
  )
}
