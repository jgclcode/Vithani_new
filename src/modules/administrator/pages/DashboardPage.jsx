
import React, { useEffect, useState } from "react";
import perfil from "../../../assets/perfil.png";
import "../../../styles.css";
import { useNavigate } from "react-router-dom";
import { DashboardHead } from "../components/DashboardHead";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {statesMX} from '../../../constants/statesConst'

export const DashboardPage = () => {
        
    let resStates = {};
    let resSales = {};

    const firstDay = new Date();
    const lastDay = new Date();

    const loadData = (firstDay, lastDay) => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({dateBegin: firstDay.toISOString().substring(0,10), dateEnd: lastDay.toISOString().substring(0,10) })
        };

        let total = 0;
        let publicTotal = 0;

        fetch("https://vithaniglobal.com/wp-api/api/referredSales", requestOptions)
        // fetch("http://127.0.0.1:8000/api/referredSales", requestOptions)
        .then(response => response.json())
        .then(json => {
                        
            setUsers(json.data);

            for (const user in json.data) {
                
                total += json.data[user].salesTotal;
                publicTotal += json.data[user].publicSales;
            }

            resStates = json.data.reduce(function(obj, v) {
                if(v.salesTotal > 0){
                    obj[v.state] = (obj[v.state] || 0) + 1;
                }
                
                
                return obj;
            }, {})

            resSales = json.data.reduce(function(obj, v) {

                obj[v.state] = ( obj[v.state] || 0 ) + v.salesTotal;
                
                return obj;
            }, {})
        })
        .finally(() => {
            setPublicSales(publicTotal);
            setTotalSales(total);
            setStateSales(resStates);
            setLoading(false)
        })
    }
    const [statesSales , setStateSales] = useState(0)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [dateStart, setDateStart] = useState(new Date(firstDay.getFullYear(), firstDay.getMonth(), 1) );
    const [dateEnd, setDateEnd] = useState(new Date(lastDay.getFullYear(), lastDay.getMonth()+1, 0));
    const [totalSales, setTotalSales] = useState(0);
    const [publicSales, setPublicSales] = useState(0);

    const navigate = useNavigate();
    const onDetail = (user_id) => {
        navigate(`/detail/${user_id}`);
    }
    
    useEffect(() => {
        setLoading(true);
        loadData(dateStart, dateEnd)
    }, [])

    
    const dateBeginSet = (date) => {
        setLoading(true);
        setDateStart(date);
        loadData(date, dateEnd)
    };

    const dateEndSet = (date) => {
        setLoading(true);
        setDateEnd(date);
        loadData(dateStart, date)
    };

    return(
        <>
            { loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <DashboardHead/>

                    <div className="membersandDistri containerCities " style={{
                        justifyItems:'center',
                    }}>                     

                        <DatePicker
                            selected={dateStart}
                            onChange={(date) => dateBeginSet(date)}
                            inline
                        />

                        <DatePicker
                            selected={dateEnd}
                            onChange={(date) => dateEndSet(date)}
                            inline
                        />
                    </div>

                    <div className="containerCities backgroundColorWhite">
                        <div className="salesGlobal">
                            <div className="salesDetails">
                                <div>
                                    <p>Ventas distribuidores</p>
                                    <p>$ {totalSales.toLocaleString("en-US")}</p>
                                    
                                </div>
                            </div>
                            <div className="salesDetails" style={{
                                'width': '50%'
                            }}>
                                <hr className="divider"/>
                            </div>

                            <div className="salesDetails">
                                <p>Ganancias</p>
                                <p>$ {(totalSales*.2285).toLocaleString("en-US")}</p>
                            </div>
                            
                            <div className="salesDetails" style={{
                                'width': '50%'
                            }}>
                                <hr className="divider"/>
                            </div>

                            <div className="salesDetails">
                                <p>Objetivo anual</p>
                                <p>$ {(735000 * users.length).toLocaleString("en-US")} </p>
                            </div>
                            
                            <div className="salesDetails" style={{
                                'width': '50%'
                            }}>
                                <hr className="divider"/>
                            </div>

                            <div className="salesDetails">
                                <p>Ventas al público</p>
                                <p>$ {publicSales.toLocaleString("en-US")}</p>
                            </div>
                        </div>
                    </div>

                    <div className="containerCities backgroundColorWhite">
                        <h2>Ventas nacional</h2>
                        <div className="city">
                            
                            {(statesSales) ? (
                                Object.entries(statesSales).map( state => (
                                    <div key={state[0]} className="cities">
                                        <h3>{statesMX[state[0]]}</h3>
                                        <p><span>{ statesSales[state[0]] }</span></p>
                                    </div>
                                
                                ))
                            ) : (
                                <div>No data</div>
                            )}

                        </div>
                    </div>

                    <div>
                        <div className="membersandDistri containerCities ">
                            <div>
                                <div className="miembros"><h2>Distribuidores</h2></div>
                                <div className="containerD">
                                    
                                    {
                                        users.map( (user) => {
                                            
                                            if( user.user_nicename != 'carlosgtz'){
                                                
                                                return (
                                                    
                                                    <div key={user.user_id} className="miembros contMember">
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
                                                )
                                            }
                                        })
                                    }
                                    
                                </div>
                            </div>

                            <div className="distri ">
                                <div className="miembros"><h2>Objetivos</h2></div>
                                <div className="containerDis backgroundColorWhite">
                                    {
                                        users.map( (user) => {
                                            
                                            if( user.user_nicename != 'carlosgtz'){
                                                let percentage = ((user.salesTotal * 999)/100) >= 100 ? 100:  ((user.salesTotal * 999)/100);
                                            
                                                return(
                                                    <div key={user.user_nicename} className="ditribuidorD">
                                                        <div className="name">
                                                            <img src={perfil}/>
                                                            <h3>{user.user_nicename}</h3>
                                                        </div>
                                                        <div className="percentageSegment">
                                                            <div className="barraPorcentaje" style={{ width: `${percentage}%` }}/>
                                                            <div className="percentage">
                                                                <p > {percentage} %</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </>
            )}
        </>

    );
}