import React, { useContext } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext';
import { Link } from "react-router-dom";

export const ReferralsHead = () => {

    const {user} = useContext(AuthContext);

    return (
            <>
                <div className="row marginRow">
                    <div className="coponentOne col-md justifyElements" style={{marginTop: '15px'}}>
                        <h2>Mi Red</h2>
                    </div>
                    <div className="coponentTwo col-md justifyElements" style={{marginTop: '15px'}}>
                        {/* <img src={perfil}/> */}

                        <Link to="https://mexico.vithaniglobal.com/dashboard-distribuidor/?uap_aff_subtab=edit_account" target="_blank">
                            <p>Perfil</p>
                        </Link>

                        <p style={{marginLeft:'20px'}}>{ user?.name}</p>
                    </div>
                </div>

            </>
    )
}
