import React, { useState, useEffect } from 'react'
import ImageHelper from './ImageHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBoltLightning, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { addItemtoCart, removeItemfromCart } from './CartHelper';


const Card = ({
  product,
  AddtoCart = true,
  removeFromCart = false,
  setReload,
  reload=undefined
}) => {

  const [redirect, setRedirect] = useState(false);
  const Navigate = useNavigate();

  const showAddtoCart = (AddtoCart) => {
    return (
      AddtoCart && (
        <div className="d-grid gap-2">
          <button
            onClick={() => { addToCart() }}
            className="btn btn-primary mt-1"
          ><FontAwesomeIcon className='me-2' icon={faCartShopping} />
            Add to Cart
          </button>
        </div>
      ))
  }

  
  const addToCart = () => {
   addItemtoCart(product, () => setRedirect(true))
  }

  useEffect(()=>{
    if (redirect) {
      return Navigate("/cart")
    }
  })

  const ShowRemoveFromCart = (removeFromCart) => {
    return (removeFromCart && (
      <div className="d-grid gap-2">
        <button
          onClick={(props) => {
            removeItemfromCart(product._id)
            setReload(!reload)
            }}
          className="btn btn-block btn-warning mt-1"
        ><FontAwesomeIcon className='me-2' icon={faCircleXmark} />
          Remove from cart
        </button>
      </div>
    ))
  }

  const ShowBuyNow = () => {
    return (AddtoCart && (

      <div className="d-grid gap-2">
        <button
          onClick={() => { }}
          className="btn btn-warning mt-1"
        ><FontAwesomeIcon className='me-2' icon={faBoltLightning} />
          Buy Now
        </button>
      </div>
    ))
  }


  return (
    <div className="card mb-4 customcard" style={{ maxHeight: "480px" }}>
      <div className="card-body">
        <ImageHelper product={product} />
        <h5 className="card-header cutsomtitle" style={{fontSize: "110%", display:"flex"}}>{product.name}</h5>
        
        <p className="lead px-3" style={{fontSize: "90%", maxHeight:"10px"}}>
          {product.description}
        </p>
        <p className="fst-italic text-end px-3 pt-4 fw-bold">$ {product.price}</p>
        
        {showAddtoCart(AddtoCart)}
        {ShowRemoveFromCart(removeFromCart)}

        {ShowBuyNow()}

      </div>
    </div>

  );
};

export default Card;