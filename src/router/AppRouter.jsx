import { Navigate, Route, Routes } from "react-router-dom"

import { Navbar } from "../custom"

import { LoginPage } from "../auth/pages/LoginPage"

import { DashboardPage } from "../modules/administrator/pages/DashboardPage"
import { ReportsPage } from "../modules/administrator/pages/ReportsPage"
import { DetailPage } from "../modules/administrator/pages/DetailPage"

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route element={<Navbar/>}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/detail/:user_id" element={<DetailPage />} />
                </Route>

                <Route path="/login" element= {<LoginPage/>} />
                
                <Route path="/" element={<Navigate to="/login"/>}/>
            </Routes>
        </>
    )
}
