import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate } from "react-router-dom";

export const PrivateDistributorRoute = ( {children} ) => {
    
    const {logged, user} = useContext(AuthContext);

    return (logged && user.id != 1)
    ? children
    : <Navigate to='/panel-vithani/administrator/dashboard'/>
}