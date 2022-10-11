
import { Navigate} from "react-router-dom"
import { isAuthenticated } from "./index";


function PrivateRoute({children}) {
  return isAuthenticated() ? 
  children : <Navigate to='/signin'/>
      }


export default PrivateRoute;