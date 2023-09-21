import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate } from "react-router-dom";

export const PublicRoute = ( {children} ) => {
    
    const {user} = useContext(AuthContext);

    if(user != undefined && user != null){

        if(user.id == 1)
            return <Navigate to='/distributor/dashboard'/>
        else
            return <Navigate to='/administrator/dashboard'/>    
    }
    else {
        return children
    }
}
