import React from 'react'
import perfil from "../../../assets/perfil.png";



export const DetailHead = () => {
  return (
        <>
            <div className="perAdmin">
                <div className="coponentOne">
                    <h2>Reporte individual</h2>
                </div>
                <div className="coponentTwo">
                    <img src={perfil}/>
                    <p>Administrador</p>
                </div>
            </div>

        </>
  )
}
