import React, {Fragment} from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';

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
  if (location.location.pathname === path){
    return {color: "#9CFF2E", border:"2px solid #9CFF2E"}
  }
  else {
    return {color: "#fff"}
  }
}

const Menu = (location) => {
  let navigate = useNavigate();
  return (
    <div className='navbar-nav fixed-top navbar-expand-lg bg-dark'>
        <ul className="nav">
            <li className="nav-item">
                <Link style={currentTab(location, "/")} className='nav-link' to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(location, "/cart")} className='nav-link' to="/cart">
                    Cart
                </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role===0 && (
              <li className="nav-item">
                <Link style={currentTab(location, "/user/dashboard")} className='nav-link' to="/user/dashboard">
                    Dashboard
                </Link>
            </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role===1 && (
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
        <li className="nav-item">
          <Link
            className="nav-link text-danger"
            onClick={() => {
              signout(() => {
                navigate("/");
              });
            }}
          >
            Signout
          </Link>
        </li>
      )}
        </ul>
   
 
    </div>
  )
}

export default withRouter(Menu);