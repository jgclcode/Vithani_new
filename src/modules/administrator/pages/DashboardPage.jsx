
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

    const exportReportCSV = () => {
        
        fetch(`https://vithaniglobal.com/wp-api/api/exportGeneralReportCSV/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
        // fetch(`http://127.0.0.1:8000/api/exportGeneralReportCSV/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
        .then(
            (response) => {

                const  url = response.url;
                const link = document.createElement('a')
                link.href = url
                document.body.appendChild(link)
                link.click()
                link.remove()
            }
        );
    }

    const exportReportExcel = () => {
        
        fetch(`https://vithaniglobal.com/wp-api/api/exportGeneralReportExcel/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
        // fetch(`http://127.0.0.1:8000/api/exportGeneralReportExcel/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
        .then(
            (response) => {

                const  url = response.url;
                const link = document.createElement('a')
                link.href = url
                document.body.appendChild(link)
                link.click()
                link.remove()
            }
        );
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
        navigate(`/administrator/detail/${user_id}`);
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
            <DashboardHead/>

            <div className="row marginRow">
                <div className="col-md justifyElements">
                    <DatePicker
                        selected={dateStart}
                        onChange={(date) => dateBeginSet(date)}
                        className="datepicker-input"
                        // inline
                    />
                </div>
                <div className="col-md justifyElements">
                    <DatePicker
                        selected={dateEnd}
                        onChange={(date) => dateEndSet(date)}
                        className="datepicker-input"
                        // inline
                    />
                </div>

                <div className="row" style={{marginBottom: '20px'}}>
                    <div className="col-md justifyElements">
                        <span className="btn btn-success btn-sm" onClick = {exportReportCSV}> Descargar Reporte CSV</span>
                    </div>
                    <div className="col-md justifyElements">
                        <span className="btn btn-success btn-sm" onClick = {exportReportExcel}> Descargar Reporte Excel</span>
                    </div>
                </div>
            </div>

            { loading ? (
                <div>Loading...</div>
            ) : (
                <>  
                    <div className="containerCities backgroundColorWhite">
                        <h2>Ventas nacional</h2>
                        <div className="city">
                            
                            {(statesSales) ? (
                                Object.entries(statesSales).map( state => (
                                    <div className="cities" key={state[0]}>
                                        <h3>{statesMX[state[0]]}</h3>
                                        <p><span>{ statesSales[state[0]] }</span></p>
                                    </div>
                                
                                ))
                            ) : (
                                <div>No data</div>
                            )}
                        </div>
                    </div>
                    <div className="row marginRow">
                        <div className='detailContainer'>
                            <div className='detailContent content-border'>
                                <h6 className='upper-h-6'>Ventas Distribuidores</h6> 
                                <h2 className='style-h-2'>$ {totalSales.toLocaleString("en-US",{maximumFractionDigits: 2})}</h2>  
                            </div>
                            <div className='detailContent content-border'>
                                <h6 className='upper-h-6'>Ganancias</h6>
                                <h2 className='style-h-2'>$ {(totalSales*.2285).toLocaleString("en-US",{maximumFractionDigits: 2})}<span className='percentage-success'><i className='fa fa-sort-up'></i> +56%</span></h2>
                            </div>
                            <div className='detailContent content-border'>
                                <h6 className='upper-h-6'> Objetivo anual</h6>
                                <h2 className='style-h-2'>$ {(735000 * users.length).toLocaleString("en-US",{maximumFractionDigits: 2})} <span className='percentage-danger'><i className='fa fa-sort-down'></i> +56%</span></h2>
                            </div>
                            <div className='detailContent'>
                                <h6 className='upper-h-6 '> Ventas al público</h6>
                                <h4 className='style-h-2 '>$ {publicSales.toLocaleString("en-US",{maximumFractionDigits: 2})}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row marginRow">
                            <div className="col-lg-6 marginColg">
                                <h2>Distribuidores</h2>
                                <div>
                                    
                                    {
                                        users.map( (user) => {
                                            
                                            if( user.display_name != 'carlosgtz'){
                                                
                                                return (
                                                    
                                                    <div key={user.user_id} className="row contMember">
                                                        <div className="col-2">
                                                            <img className="imageMiembros" src={perfil}/>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="nameMiembros">{ user.display_name }</p>
                                                        </div>
                                                        <div className="col-4 centerCol" >
                                                            <button
                                                                onClick={ () => onDetail(user.user_id) }
                                                                className="buttonMiembros"
                                                            >
                                                                Distribuidor asociado
                                                            </button>
                                                        </div>

                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    
                                </div>
                            </div>

                            <div className="col-lg-6 marginColg">
                                
                                <h2>Objetivos del mes actual</h2>

                                <div className="containerDis">
                                    {
                                        users.map( (user) => {
                                            
                                            if( user.display_name != 'carlosgtz'){
                                                let percentage = ((user.salesTotal * 999)/100) >= 100 ? 100:  ((user.salesTotal * 999)/100);
                                            
                                                return(

                                                    <div key={user.display_name} className="row marginRowObjectives">
                                                        <div className="col-2">
                                                            <img className='imageMiembros' src={perfil}/>
                                                        </div>
                                                        <div className="col-10">
                                                            <div className="row">
                                                                <p className="nameMiembrosObjetivos">{ user.display_name }</p>
                                                            </div>
                                                            <div className="row">
                                                                <div className="percentageSegment">
                                                                    <div className="col-10 centerCol">
                                                                        <div className="barraPorcentaje" style={{ width: `${percentage}%` }}/>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="percentage">
                                                                            <p > {percentage} %</p>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    
                                                                </div>
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
                </>
            )}
        </>

    );
}