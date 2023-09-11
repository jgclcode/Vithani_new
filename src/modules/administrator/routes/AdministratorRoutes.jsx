import { Navigate, Route, Routes } from "react-router-dom";
import { NavbarAdministrator } from "../../../custom";

import { DashboardPage } from "../pages/DashboardPage"
import { ReportsPage } from "../pages/ReportsPage"
import { DetailPage } from "../pages/DetailPage"

export const AdministratorRoutes = () => {
    return (
        <>  
            <Routes>
                <Route element={<NavbarAdministrator/>}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/detail/:user_id" element={<DetailPage />} />
                    <Route path="/*" element={<Navigate to="/administrator/dashboard"/>} />
                </Route>
            </Routes>
        </>
    )
}
