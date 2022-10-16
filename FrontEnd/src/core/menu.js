import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';
import { loadCart } from './CartHelper';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return (
      <Component
        {...props}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  }
  return ComponentWithRouterProp;
}

const currentTab = (location, path) => {
  if (location.location.pathname === path) {
    return { color: "#9CFF2E", border: "2px solid #9CFF2E" }
  }
  else {
    return { color: "#fff" }
  }
}

const Menu = (location, {cartnum}) => {

  const [Cartbadge, setCartBadge] =useState(null)

  let navigate = useNavigate();

  useEffect(()=> {
    loadCart() === undefined ? setCartBadge(0) : setCartBadge(loadCart().length)
  },[cartnum])

  return (
    <div className='navbar-nav fixed-top navbar-expand-lg bg-dark'>
      <ul className="nav">
        <li className="nav-item">
          <Link style={currentTab(location, "/")} className='nav-link' to="/">
            Home
          </Link>
        </li>
        <li className="nav-item position-relative">
          <Link style={currentTab(location, "/cart")} className='nav-link' to="/cart">
            Cart
            {Cartbadge > 0 && <span className="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-danger">
              {Cartbadge}
              <span className="visually-hidden">unread messages</span>
            </span> }
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link style={currentTab(location, "/user/dashboard")} className='nav-link' to="/user/dashboard">
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link style={currentTab(location, "/admin/dashboard")} className='nav-link' to="/admin/dashboard">
              Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (<Fragment>
          <li className="nav-item">
            <Link style={currentTab(location, "/signin")} className='nav-link' to="/signin">
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link style={currentTab(location, "/signup")} className='nav-link' to="/signup">
              Sign Up
            </Link>
          </li>
        </Fragment>)}
        {isAuthenticated() && (
          <li className="position-absolute end-0">
            <button
              className="btn btn-md btn-danger mt-1 me-3"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Signout
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default withRouter(Menu);
