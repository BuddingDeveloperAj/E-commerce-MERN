
import { Navigate} from "react-router-dom"
import { isAuthenticated } from "./index";


function AdminRoute({ children }) {
  return isAuthenticated() && isAuthenticated().user.role===1 ? 
          children : <Navigate to={"/signin"} />;
      }

export default AdminRoute;