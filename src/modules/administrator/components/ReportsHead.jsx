import React from 'react'
import perfil from "../../../assets/perfil.png";



export const ReportsHead = () => {
  return (
        <>
            <div className="perAdmin">
                <div className="coponentOne">
                    <h2>Reporte general</h2>
                </div>
                <div className="coponentTwo">
                    <img src={perfil}/>
                    <p>Administrador</p>
                </div>
            </div>

        </>
  )
}
