import React, { useContext } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext';


export const DetailHead = () => {

    const {user} = useContext(AuthContext);

    return (
            <>
                <div className="row marginRow">
                    <div className="coponentOne col-md justifyElements" style={{marginTop: '15px'}}>
                        <h2>Reporte individual</h2>
                    </div>
                    <div className="coponentTwo col-md justifyElements" style={{marginTop: '15px'}}>
                        <p>{ user?.name}</p>
                    </div>
                </div>

            </>
    )
}
