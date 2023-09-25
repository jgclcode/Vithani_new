import React, { useContext, useEffect, useState } from 'react'
import { DashboardHead } from '../components/DashboardHead';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../../../styles.css'
import '../css/styles-distributor.css'
import { AuthContext } from '../../../auth/context/AuthContext';
import { statesMX } from '../../../constants/statesConst';

export const DashboardPage = () => {
    
    const progress_test = 700;
    const objective_test = 999; 
    const {user} = useContext(AuthContext);
    const user_id = user.id.toString();
    
    const [userData, setUserData] = useState();

    const firstDay = new Date();
    const lastDay = new Date();

    const loadData = (firstDay, lastDay) => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id: user_id, dateBegin: firstDay.toISOString().substring(0,10), dateEnd: lastDay.toISOString().substring(0,10) })
        };

        fetch("https://vithaniglobal.com/wp-api/api/referredSalesById", requestOptions)
        // fetch("http://127.0.0.1:8000/api/referredSalesById", requestOptions)
        .then(response => response.json())
        .then(json => setUserData(json.data))
        .finally(() => {
            setLoading(false)
        })
    }

    const exportReportCSV = () => {
        
        fetch(`https://vithaniglobal.com/wp-api/api/exportIndividualReportCSV/${user_id}/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
        // fetch(`http://127.0.0.1:8000/api/exportIndividualReportCSV/${user_id}/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
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
        
        fetch(`https://vithaniglobal.com/wp-api/api/exportIndividualReportExcel/${user_id}/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
        // fetch(`http://127.0.0.1:8000/api/exportIndividualReportExcel/${user_id}/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
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

    const exportReportPDF = () => {
        fetch(`https://vithaniglobal.com/wp-api/api/exportIndividualReportPDF/${user_id}/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
        // fetch(`http://127.0.0.1:8000/api/exportIndividualReportPDF/${user_id}/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
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

    const [loading, setLoading] = useState(false)
    const [dateStart, setDateStart] = useState(new Date(firstDay.getFullYear(), firstDay.getMonth(), 1));
    const [dateEnd, setDateEnd] = useState(new Date(lastDay.getFullYear(), lastDay.getMonth()+1, 0));

    useEffect(() => {
        setLoading(true);
        loadData(dateStart, dateEnd);
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


    return (
        <>  
            <DashboardHead/>

            {/* <div className="row marginRow">
                <div className="col-md justifyElements">
                    <DatePicker
                        selected={dateStart}
                        onChange={(date) => dateBeginSet(date)}
                        inline
                    />
                </div>
                <div className="col-md justifyElements">
                    <DatePicker
                        selected={dateEnd}
                        onChange={(date) => dateEndSet(date)}
                        inline
                    />
                </div>
            </div> */}

            <div className="row" style={{marginBottom: '50px'}}>
                <div className="col-md justifyElements">
                    <span className="btn btn-success btn-sm" onClick = {exportReportCSV}> Descargar Reporte CSV</span>
                </div>
                <div className="col-md justifyElements">
                    <span className="btn btn-success btn-sm" onClick = {exportReportExcel}> Descargar Reporte Excel</span>
                </div>
                <div className="col-md justifyElements">
                    <span className="btn btn-danger btn-sm" onClick = {exportReportPDF}> Descargar Reporte PDF</span>
                </div>
            </div>

            { loading ? (
                <div className="containerCities backgroundColorWhite">
                    <h3 className='style-h-3 mb-3'>Cargando información</h3>
                </div>
            ) : (
                <>
                    {
                        (userData ) ? (
                            <>
                            
                              {/*
                                <div className="containerCities backgroundColorWhite">
                                    
                                    <div style={{marginBottom: '50px'}}>
                                        <h3 className='style-h-3 mb-3'>{userData.display_name}</h3>
                                        
                                        <h3 className='style-h-3'> <span className='font-weight-light'>{userData.user_email}</span></h3>
                                        
                                        <h3 className='style-h-3'> <span className='font-weight-light'> {statesMX[userData.state]} - { userData.city } </span></h3>
                                        
                                        <h3 className='style-h-3'>Cuenta bancaria:  <span className='font-weight-light'> {userData.account} </span></h3>
                                    </div> 
                                    
                                    <div className='detailContainer'>
                                        <div className='detailContent content-border'>
                                            <h6 className='upper-h-6'>Ventas Distribuidores</h6> 
                                            <h2 className='style-h-2'>$ {userData.salesTotal.toLocaleString("en-US",{maximumFractionDigits: 2})}</h2>  
                                        </div>
                                        <div className='detailContent content-border'>
                                            <h6 className='upper-h-6'>Ganancias</h6>
                                            <h2 className='style-h-2'>
                                                $ {userData.commission.toLocaleString("en-US",{maximumFractionDigits: 2})}
                                                <span className='percentage-success'><i className='fa fa-sort-up'></i> +56%</span>
                                            </h2>
                                        </div>
                                        <div className='detailContent content-border'>
                                            <h6 className='upper-h-6'> Objetivo anual</h6>
                                            <h2 className='style-h-2'>
                                                $ {(2997*12).toLocaleString("en-US",{maximumFractionDigits: 2})}
                                                <span className='percentage-danger'><i className='fa fa-sort-down'></i> +56%</span>
                                            </h2>
                                        </div>
                                        <div className='detailContent'>
                                            <h6 className='upper-h-6 mb-0'> Rango de Fechas</h6>
                                            <h4 className='style-h-4 mb-0'>{dateStart.toLocaleDateString("en-GB")} - {dateEnd.toLocaleDateString("en-GB")}</h4>
                                        </div>
                                    </div>
                                </div> */}

                                <div className='row distributor-sales-table mb-3'>
                                    <div className='col-xl-6 col-md-12 col-lg-12'>
                                        <div className='detailContainer'>
                                            <div className='detailContent'>
                                                <h6 className='upper-h-6'>Ventas Totales</h6> 
                                                <h2 className='style-h-2'>$ {userData.salesTotal.toLocaleString("en-US",{ maximumFractionDigits: 2 })}
                                                    <span className='percentage-success'><i className='fa fa-sort-up'></i> +56%</span>
                                                </h2>  
                                            </div>
                                            <div className='detailContent'>
                                                <h6 className='upper-h-6'>Compras Totales</h6> 
                                                <h2 className='style-h-2'>$450
                                                    <span className='percentage-danger'><i className='fa fa-sort-down'></i> +56%</span>
                                                </h2>  
                                            </div>
                                            <div className='detailContent'>
                                                <h6 className='upper-h-6'>Utilidad</h6> 
                                                <h2 className='style-h-2'>$450
                                                    <span className='percentage-danger'><i className='fa fa-sort-down'></i> +56%</span>
                                                </h2>  
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-xl-6 col-md-12 col-lg-12'>

                                    </div>

                                </div>
                                
                                <div className='row mb-3'>
                                    <div className='col-12'>
                                        <div className='card card-progress-bar'>
                                            <div className='card-body ms-2 me-2'>
                                                <div className='row'>
                                                    <div className='col-sm-4'>
                                                        <h6 className='upper-h-6'>Objetivo Mensual</h6> 
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        {/* Datos de prueba */}
                                                        <h2 className='style-h-2'> ${`${progress_test}`} <i className="fas fa-arrow-right ms-3 me-3" style={{color: '#2165ff'}}></i> ${`${objective_test}`} </h2>

                                                        {/* Datos con las variables correspondientes  */}

                                                        {/*
                                                        <h2 className='style-h-2'> ${`${userData.salesTotal}`} <i className="fas fa-arrow-right ms-3 me-3" style={{color: '#2165ff'}}></i> $999 </h2>
                                                        */}

                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='progress-bar-parent'>

                                                        {/* Datos de prueba */}
                                                        <div className='progress-bar-child' style={{ width: (((`${progress_test}`*100)/`${objective_test}`) >= 100 ? 100:  ((`${progress_test}` * 100)/999))+'%' }}>
                                                            <span className='progress-text'>{(((`${progress_test}`*100)/`${objective_test}`) >= 100 ? 100:  ((`${progress_test}` * 100)/999)).toLocaleString("en-US",{maximumFractionDigits: 0})}%</span>
                                                        </div>


                                                        {/* Datos con las variables correspondientes  */}
                                                        {/*
                                                        <div className='progress-bar-child' style={{ width: (((`${userData.salesTotal}` * 100)/999) >= 100 ? 100:  ((`${userData.salesTotal}` * 100)/999))+'%' }}>
                                                          <span className='progress-text'>{(((`${userData.salesTotal}` * 100)/999) >= 100 ? 100:  ((`${userData.salesTotal}` * 100)/999)).toLocaleString("en-US",{maximumFractionDigits: 0})}%</span>
                                                        </div>
                                                        */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-xl-5 col-md-12 col-lg-12 distributor-bonus-table'>
                                        <div className='card'>
                                            <div className='card-body ms-2 me-2'>
                                                <div className='col'>
                                                    <h6 className='upper-h-6 ms-2'>Bonos</h6> 
                                                </div>
                                                <div className='col'>
                                                    <div className='detailContainer'>
                                                        <div className='detailContent content-border'>
                                                            <h6 className='upper-h-6'>Compras</h6> 
                                                            <h2 className='style-h-2'>$950 
                                                                <span className='percentage-success'><i className='fa fa-sort-up'></i> +56%</span> 
                                                            </h2>  
                                                        </div>
                                                        <div className='detailContent'>
                                                            <h6 className='upper-h-6'>Reclutamiento</h6> 
                                                            <h2 className='style-h-2'>$450
                                                                <span className='percentage-danger'><i className='fa fa-sort-down'></i> +56%</span>
                                                            </h2>  
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-xl-7 col-md-12 col-lg-12'>
                                        {/* Columna para la parte del Acumulado Anual */}

                                        {/*<div className='card'>
                                            <div className='card-body ms-2 me-2'>
                                            </div>
                                        </div>*/}
                                    </div>
                                </div>                
                                

                                <br />
                                <div className="containerCities backgroundColorWhite">
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>No. </th>
                                                <th>Referencia</th>
                                                <th>Fecha</th>
                                                <th>Referido</th>
                                                <th>Compra</th>
                                                <th>Comisión</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userData.refferedSales.map((sale, index) => (
                                                    <tr key={sale.sale_id}>
                                                        <td>{index +1 }</td>
                                                        <td>{sale.reference}</td>
                                                        <td>{sale.date}</td>
                                                        <td>{sale.refferal_wp_uid}</td>
                                                        <td>{sale._order_total.toLocaleString("en-US",{maximumFractionDigits: 2})}</td>
                                                        <td>{sale.commission.toLocaleString("en-US",{maximumFractionDigits: 2})}</td>
                                                        
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                
                            </>
                        ) : (
                            <div>No data</div>
                        )
                    }

                </>
            )}
        </>
    )
}
