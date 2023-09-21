import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate } from "react-router-dom";

export const PrivateDistributorRoute = ( {children} ) => {
    
    const {logged, user} = useContext(AuthContext);

    if(user != undefined && user != null){

        if(user.id == 1)
            return <Navigate to='/administrator/dashboard'/>
    }

    return (logged)
    ? children
    : <Navigate to='/login'/>
}