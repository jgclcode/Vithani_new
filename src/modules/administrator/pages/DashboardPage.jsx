
import React, { useEffect, useState } from "react";
import perfil from "../../../assets/perfil.png";
import "../../../styles.css";
import { Locations } from "../components/Locations";
import { Link, useNavigate } from "react-router-dom";
import { DashboardHead } from "../components/DashboardHead";
import { SalesHead } from "../components/SalesHead";


const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dateBegin: '2023-05-01', dateEnd: '2023-08-31' })
};

export const DashboardPage = () => {
    
    const [users, setUsers] = useState([])
    const [globalTotal, setGlobalTotal] = useState()
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        // fetch("https://vithaniglobal.com/wp-api/api/referredSales", requestOptions)
        fetch("http://127.0.0.1:8000/api/referredSales", requestOptions)
        .then(response => response.json())
        .then(json => {setUsers(json.data), setGlobalTotal(json.globalTotal)})
        .finally(() => {
            setLoading(false)
        })
    }, [])

    const navigate = useNavigate();
    
    const onDetail = (user_id) => {
        navigate(`/detail/${user_id}`);
    }


    return(
        <>
            { loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <DashboardHead/>
                    {/* {globalTotal ? globalTotal.toFixed(2).toLocaleString("en-US") : 0} */}
                    <SalesHead/>
                    <Locations/> 
                    <div>
                        <div className="membersandDistri containerCities ">
                            <div>
                                <div className="miembros"><h2>Distribuidores</h2></div>
                                <div className="containerD">
                                    
                                    {users.map(user => (
                                        <div className="miembros contMember">
                                            <div className="name">
                                                <img src={perfil}/>
                                                    <h3>{ user.user_nicename }</h3>
                                            </div>
                                            
                                            <button
                                                onClick={ () => onDetail(user.user_id) }
                                            >
                                                Distribuidor asociado
                                            </button>

                                        </div>
                                    ))}
                                    
                                </div>
                            </div>

                            <div className="distri ">
                                <div className="miembros"><h2>Objetivos</h2></div>
                                <div className="containerDis backgroundColorWhite">
                                    {users.map(user => (
                                        <div className="ditribuidorD">
                                            <div className="name evenly">
                                                <img src={perfil}/>
                                                <h3>{user.user_nicename}</h3>
                                                <div className="percentage">
                                                    <p > 100 %</p>
                                                </div>
                                            </div>
                                            <div className="name">
                                                <div className="barraPorcentaje" />
                                                
                                            </div>
                                            
                                            
                                        </div>
                                    ))}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>

    );
}