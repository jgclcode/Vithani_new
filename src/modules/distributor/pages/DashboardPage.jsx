import React, { useContext, useEffect, useState } from 'react'
import { DashboardHead } from '../components/DashboardHead';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../../../styles.css'
import '../css/styles-distributor.css'
import { AuthContext } from '../../../auth/context/AuthContext';
import { statesMX } from '../../../constants/statesConst';
import { YearBarGraph } from '../components/graphs/YearBarGraph';

export const DashboardPage = () => {
    
    const {user} = useContext(AuthContext);
    const user_id = user.id.toString();
    
    const [userData, setUserData] = useState();

    const [userYearData, setUserYearData] = useState();
    const [userYearTotal, setUserYearTotal] = useState(0);

    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');

    const firstDay = new Date();
    const lastDay = new Date();

    const changeRankColor = (idRank) => {
        //Distribuidor Asociado
        if(idRank === 1){
            return '#5c67ed';
        }
        //Distribuidor Autorizado
        if(idRank === 2){
            return '#5c94ed';
        }
        //Director Junior
        if(idRank === 21){
            return '#5cb5ed';
        }
        //Director Regional
        if(idRank === 23){
            return '#000000';
        }
        //Director Senior
        if(idRank === 22){
            return '#895ced';
        }
        //Director Master
        if(idRank === 24){
            return '#000000';
        }
        else{
            return '#FFFFFF';
        }
    }
    
    let arrRefferedSales = [];
    
    const arrUserDataRefferedSales = (userD) => {
 
        userD.refferedSales.map((sale, index) => {
            let arrRef = {
                "id": sale.sale_id,
                "index": index + 1,
                "reference": sale.reference,
                "date": sale.date,
                "refferal_wp_uid": sale.refferal_wp_uid,
                "order_total": sale._order_total,
                "commission": sale.commission
            };
            arrRefferedSales[index] = arrRef;
        });  
    }

    const filteredTable = () => {
        if (search.length === 0){
            return arrRefferedSales.slice(currentPage, currentPage + 10);
        }
        const filtered = arrRefferedSales.filter(refSaleName => refSaleName.refferal_wp_uid.toLowerCase().includes(search.toLowerCase()));
        return filtered.slice(currentPage, currentPage + 10);
    }

    const nextPage = () => {
        if(arrRefferedSales.filter(refSaleName => refSaleName.refferal_wp_uid.includes(search)).length > currentPage + 10)
            setCurrentPage( currentPage + 10);
    }

    const prevPage = () => {
        if( currentPage > 0 )
            setCurrentPage( currentPage - 10);
    }

    const onSearchChange = (event) => {
        setCurrentPage(0);
        setSearch(event.target.value);
    }
 
    const loadYearData = () => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user_id })
        };

        fetch("https://vithaniglobal.com/wp-api/api/referredSalesByIdAndYear", requestOptions)
        // fetch("http://127.0.0.1:8000/api/referredSalesByIdAndYear", requestOptions)
        .then(response => response.json())
        .then(json => {
                setUserYearData(json.data.yearSales);
                setUserYearTotal(json.data.yearTotal);
            }
        )
    }

    const loadData = (firstDay, lastDay) => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id: user_id, dateBegin: firstDay.toISOString().substring(0,10), dateEnd: lastDay.toISOString().substring(0,10) })
        };

        fetch("https://vithaniglobal.com/wp-api/api/referredSalesById", requestOptions)
        // fetch("http://127.0.0.1:8000/api/referredSalesById", requestOptions)
        .then(response => response.json())
        .then(json => {
            setUserData(json.data);
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
        loadYearData();
        setLoading(false);
    }, [])

    return (
        <>  
            <DashboardHead/>

            <div className="row mx-0" style={{marginBottom: '50px'}}>
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
                        (userData) ? (
                            <>
                                {arrUserDataRefferedSales(userData)}
                                <div className='card-body'>
                                    <div className='row card-body-profile-info-dist mx-0'>
                                        <div className='col-sm-4'>
                                            <div className='profile-user'>
                                                <i className="fas fa-crown crown-icon" style={{color: changeRankColor(userData.rank_id), fontSize: "3.5em"}}></i>
                                            </div>
                                            <div>
                                                <br />
                                                <p style={{marginBottom: '0',textAlign: 'center', fontSize: "2em"}}>{userData.rank}</p>
                                            </div>
                                        </div>

                                        <div className='col-sm-8'>
                                            <h2 className='style-h-2 mb-3'>{user.display_name}</h2>
                                            <div className='profile-user'>
                                                <p style={{marginBottom: '0',textAlign: 'center', fontSize: "2em"}}>Link de asociado:</p>
                                                <p style={{marginBottom: '0',textAlign: 'center', fontSize: "1.8em"}}>https://mexico.vithaniglobal.com/?dist={userData.affiliate_id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <YearBarGraph dataGraph={userYearData}/>

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

                                <div className='row distributor-sales-table mb-3 mx-0'>
                                    <div className='col-xl-6 col-md-12 col-lg-12'>
                                        <div className='detailContainer'>
                                            {/* <div className='detailContent'>
                                                <h6 className='upper-h-6'>Ventas Totales</h6> 
                                                <h6 className='upper-h-6'>Compras Totales</h6>
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
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='row mb-3 mx-0'>
                                    <div className='col-sm-6'>
                                        <div className='card card-progress-bar'>
                                            <div className='card-body ms-2 me-2'>
                                                <span className='upper-h-6' style={{fontWeight:'bold'}}> Objetivo Mensual: </span> 
                                                <span className='style-h-2' style={{fontWeight:'bold'}}> ${`${userData.ranksGoal.toLocaleString("en-US",{ maximumFractionDigits: 2 })}`} </span>
                                                <div className='col-lg-12' style={{display:'flex', flexDirection:'row-reverse'}}>
                                                    <h2 className='style-h-2'> ${`${userData.salesTotal.toLocaleString("en-US",{ maximumFractionDigits: 2 })}`} </h2>
                                                </div>
                                                <div className='progress-bar-parent'>
                                                    <div className='progress-bar-child' style={{ width: (((`${userData.salesTotal}`*100)/`${userData.ranksGoal}`) >= 100 ? 100: ((`${userYearTotal}` * 100)/`${(userData.ranksGoal * 12)}`) > 5 ? ((`${userData.salesTotal}` * 100)/`${userData.ranksGoal}`).toLocaleString("en-US",{maximumFractionDigits: 0}): 8 )+'%' }}>
                                                        <span className='progress-text'>{((`${userData.salesTotal}` * 100)/`${userData.ranksGoal}`).toLocaleString("en-US",{maximumFractionDigits: 0})}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className='card card-progress-bar'>
                                            <div className='card-body ms-2 me-2'>
                                                <span className='upper-h-6' style={{fontWeight:'bold'}}> Objetivo Anual: </span> 
                                                <span className='style-h-2' style={{fontWeight:'bold'}}> ${`${(userData.ranksGoal * 12).toLocaleString("en-US",{ maximumFractionDigits: 2 })}`} </span>
                                                <div className='col-lg-12' style={{display:'flex', flexDirection:'row-reverse'}}>
                                                    <h2 className='style-h-2'> ${`${userYearTotal.toLocaleString("en-US",{ maximumFractionDigits: 2 })}`} </h2>
                                                </div>
                                                <div className='progress-bar-parent'>
                                                    <div className='progress-bar-child' style={{ width: (((`${userYearTotal}`*100)/`${(userData.ranksGoal * 12)}`) >= 100 ? 100:  ((`${userYearTotal}` * 100)/`${(userData.ranksGoal * 12)}`) > 5 ? ((`${userYearTotal}` * 100)/`${(userData.ranksGoal * 12)}`).toLocaleString("en-US",{maximumFractionDigits: 0}): 8 )+'%' }}>
                                                        <span className='progress-text'>{((`${userYearTotal}` * 100)/`${(userData.ranksGoal * 12)}`).toLocaleString("en-US",{maximumFractionDigits: 0})}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='col-sm-6'>                    
                                        <div className='card card-progress-bar'>
                                            <div className='card-body ms-2 me-2'>
                                                <div className='col-sm-4'>
                                                    <h6 className='upper-h-6'>Objetivo Anual</h6> 
                                                </div>
                                                <div className='col-lg-12'>
                                                    <h2 className='style-h-2'> ${`${userYearTotal.toLocaleString("en-US",{ maximumFractionDigits: 2 })}`} <i className="fas fa-arrow-right ms-3 me-3" style={{color: '#2165ff'}}></i> ${`${objective_year.toLocaleString("en-US",{ maximumFractionDigits: 2 })}`} </h2>
                                                </div>

                                                <div className='progress-bar-parent'>
                                                    <div className='progress-bar-child' style={{ width: (((`${userYearTotal}`*100)/`${objective_year}`) >= 100 ? 100:  ((`${userYearTotal}` * 100)/`${objective_year}`))+'%' }}>
                                                        <span className='progress-text'>{((`${userYearTotal}` * 100)/`${objective_year}`).toLocaleString("en-US",{maximumFractionDigits: 0})}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>

                                <div className='row mx-0'>
                                    {/* <div className='col-xl-5 col-md-12 col-lg-12 distributor-bonus-table'>
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
                                    </div> */}
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
                                    <div className='row mx-0'>
                                        <div className='col-xl-6 col-md-12 col-lg-12 px-0' style={{position: 'relative'}}>
                                            <input type='text' className='mb-2 form-control' placeholder='Buscar por nombre de Referido' value={search} onChange={ onSearchChange}/>
                                            <span id='table-search-icon'>
                                                <i className="fas fa-search"></i>
                                            </span>
                                        </div>
                                        {/*<div className='col-xl-6 col-md-12 col-lg-12 mb-2 buttons-table'>
                                            <h6 className='me-3 mb-0'> { arrRefferedSales.filter(refSaleName => refSaleName.refferal_wp_uid.toLowerCase().includes(search.toLowerCase())).length } registros encontrados</h6>
                                            <button className='btn-table' onClick={prevPage} disabled={currentPage === 0}>
                                                <i className="fas fa-angle-double-left"></i>
                                            </button>
                                            <button className='btn-table' onClick={nextPage} disabled={arrRefferedSales.filter(refSaleName => refSaleName.refferal_wp_uid.includes(search)).length < currentPage +5}>
                                                <i className="fas fa-angle-double-right"></i>
                                            </button>
                                        </div>*/}
                                    </div>
                                    <div className='row mx-0' style={{overflow: 'auto'}}>
                                        <div className='col-12 px-0'>
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
                                                    {/*
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
                                                    */}
                                                    {
                                                        filteredTable().map(sale  => (
                                                            <tr key={sale.id}>
                                                                <td>{sale.index }</td>
                                                                <td>{sale.reference}</td>
                                                                <td>{sale.date}</td>
                                                                <td>{sale.refferal_wp_uid}</td>
                                                                <td>{sale.order_total.toLocaleString("en-US",{maximumFractionDigits: 2})}</td>
                                                                <td>{sale.commission.toLocaleString("en-US",{maximumFractionDigits: 2})}</td>

                                                            </tr>
                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className='row me-0'>
                                        <div className='col-12 buttons-table'>
                                            <h6 className='me-3 mb-0'> { arrRefferedSales.filter(refSaleName => refSaleName.refferal_wp_uid.toLowerCase().includes(search.toLowerCase())).length } registros encontrados</h6>
                                            <button className='btn-table' onClick={prevPage} disabled={currentPage === 0}>
                                                <i className="fas fa-angle-double-left"></i>
                                            </button>
                                            <button className='btn-table' onClick={nextPage} disabled={arrRefferedSales.filter(refSaleName => refSaleName.refferal_wp_uid.includes(search)).length < currentPage + 10}>
                                                <i className="fas fa-angle-double-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                            </>
                        ) : (
                            <div className="containerCities backgroundColorWhite">
                                <h3 className='style-h-3 mb-3'>Cargando información</h3>
                            </div>
                        )
                    }

                </>
            )}
        </>
    )
}
