import { Navigate, Route, Routes } from "react-router-dom"

import { LoginPage } from "../auth/pages/LoginPage"
import { AdministratorRoutes } from "../modules/administrator"
import { DistributorRoutes } from "../modules/distributor"

import { PrivateAdministratorRoute } from "./ PrivateAdministratorRoute"
import { PrivateDistributorRoute } from "./ PrivateDistributorRoute"

import { LoginAdministrador } from "../auth/pages/LoginAdministrador"
import { LoginDistribuidor } from "../auth/pages/LoginDistribuidor"
import { PublicRoute } from "./PublicRoute"

export const AppRouter = () => {
    return (
        <>
            <Routes>

                <Route path="/login" element= {
                    <PublicRoute>
                        <LoginPage/>
                    </PublicRoute>
                }
                />

                <Route path="/loginAdministrator" element= {
                    <PublicRoute>
                        <LoginAdministrador/>
                    </PublicRoute>
                }
                />

                <Route path="/loginDistributor" element= {
                    <PublicRoute>
                        <LoginDistribuidor/>
                    </PublicRoute>
                }
                />


                <Route path="/administrator/*" element= {
                    <PrivateAdministratorRoute>
                        <AdministratorRoutes/>
                    </PrivateAdministratorRoute>}
                />

                <Route path="/distributor/*" element= {
                    <PrivateDistributorRoute>
                        <DistributorRoutes/>
                    </PrivateDistributorRoute>}
                />

                <Route path="/*" element={<Navigate to="/login"/>}/>
            </Routes>
        </>
    )
}
