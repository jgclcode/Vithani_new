import React, { useContext } from 'react'
import perfil from "../../../assets/perfil.png";
import { AuthContext } from '../../../auth/context/AuthContext';



export const GraphsHead = () => {

    const {user} = useContext(AuthContext);

    return (
        <>
            <div className="row marginRow">
                <div className="coponentOne col-md justifyElements" style={{marginTop: '15px'}}>
                    <h2>Graphs</h2>
                </div>
                <div className="coponentTwo col-md justifyElements" style={{marginTop: '15px'}}>
                    {/* <img src={perfil}/> */}
                    <p>{ user?.name}</p>
                </div>
            </div>

        </>
    )
}