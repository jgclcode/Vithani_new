import { Navigate, Route, Routes } from "react-router-dom"

import { LoginPage } from "../auth/pages/LoginPage"
import { AdministratorRoutes } from "../modules/administrator"
import { DistributorRoutes } from "../modules/distributor"

import { PrivateAdministratorRoute } from "./ PrivateAdministratorRoute"
import { PrivateDistributorRoute } from "./ PrivateDistributorRoute"

import { LoginAdministrador } from "../auth/pages/LoginAdministrador"
import { LoginDistribuidor } from "../auth/pages/LoginDistribuidor"

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/panel-vithani/login" element= {<LoginPage/>} />

                <Route path="/panel-vithani/loginAdministrator" element= {<LoginAdministrador/>} />

                <Route path="/panel-vithani/loginDistributor" element= {<LoginDistribuidor/>} />


                <Route path="/panel-vithani/administrator/*" element= {
                    <PrivateAdministratorRoute>
                        <AdministratorRoutes/>
                    </PrivateAdministratorRoute>}
                />

                <Route path="/panel-vithani/distributor/*" element= {
                    <PrivateDistributorRoute>
                        <DistributorRoutes/>
                    </PrivateDistributorRoute>}
                />

                <Route path="/panel-vithani/*" element={<Navigate to="/panel-vithani/login"/>}/>
            </Routes>
        </>
    )
}
