import React from 'react'
import perfil from "../../../assets/perfil.png";



export const DashboardHead = () => {
    return (
        <>
            <div className="row marginRow">
                <div className="coponentOne col-md justifyElements" style={{marginTop: '15px'}}>
                    <h2>Dashboard</h2>
                </div>
                <div className="coponentTwo col-md justifyElements" style={{marginTop: '15px'}}>
                    <img src={perfil}/>
                    <p>Administrador</p>
                </div>
            </div>

        </>
    )
}
