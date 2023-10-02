import { Navigate, Route, Routes } from "react-router-dom";
import { NavbarDistributor } from "../../../custom";
import { DashboardPage } from "../pages/DashboardPage"
import { ReferralsPage } from "../pages/ReferralsPage";

export const DistributorRoutes = () => {
    return (
        <>  
            <Routes>
                <Route element={<NavbarDistributor/>}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/referrals" element={<ReferralsPage />} />
                    <Route path="/*" element={<Navigate to="/distributor/dashboard"/>} />
                </Route>
            </Routes>
        </>
    )
}
