import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate } from "react-router-dom";

export const PrivateAdministratorRoute = ( {children} ) => {
    
    const {logged, user} = useContext(AuthContext);

    if(user != undefined && user != null){

        if(user.id != 1)
            return <Navigate to='/distributor/dashboard'/>
    }

    return (logged)
    ? children
    : <Navigate to='/login'/>
}
