import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { DetailHead } from '../components/DetailHead';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../../../styles.css'
import '../css/styles-admin.css'
import { statesMX } from '../../../constants/statesConst';

export const DetailPage = () => {
  
    const {user_id} = useParams();
    
    const [user, setUser] = useState();

    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');

    const firstDay = new Date();
    const lastDay = new Date();

    const loadData = (firstDay, lastDay) => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id: user_id, dateBegin: firstDay.toISOString().substring(0,10), dateEnd: lastDay.toISOString().substring(0,10) })
        };

        fetch("https://biogel.mx/wp-api/api/referredSalesById", requestOptions)
        .then(response => response.json())
        .then(json => setUser(json.data))
        .finally(() => {
            setLoading(false)
        })
    }

    const exportReportCSV = () => {
        
        fetch(`https://biogel.mx/wp-api/api/exportIndividualReportCSV/${user_id}/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
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
        
        fetch(`https://biogel.mx/wp-api/api/exportIndividualReportExcel/${user_id}/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
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
    
    const arrUserRefferedSales = (userD) => {
 
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

    const [loading, setLoading] = useState(false)
    const [dateStart, setDateStart] = useState(new Date(firstDay.getFullYear(), firstDay.getMonth(), 1));
    const [dateEnd, setDateEnd] = useState(new Date(lastDay.getFullYear(), lastDay.getMonth()+1, 0));

    
    useEffect(() => {
        setLoading(true);
        loadData(dateStart, dateEnd)
    }, [])

    
    const dateBeginSet = (date) => {
        if (date < dateEnd) {
            setLoading(true);
            setDateStart(date);
            loadData(date, dateEnd)
        };
    };

    const dateEndSet = (date) => {
        if (date > dateStart) {
            setLoading(true);
            setDateEnd(date);
            loadData(dateStart, date);
        };
    };


    return (
        <>  
            <DetailHead/>

            <div className="membersandDistri" style={{marginLeft:'100px', marginBottom:'20px', marginTop:'20px'}}>
                <Link to={-1}>
                    Regresar
                </Link>
            </div>

            <div className='row ms-0 me-0 container-info-calendar'>
                <div className='col-xl-5 col-md-12 col-lg-12'>
                    <div className='card card-info-user mb-4'>
                        { loading ? (
                            <div className="containerCities backgroundColorWhite">
                                <h3 className='style-h-3 mb-3'>Cargando información</h3>
                            </div>
                        ) : (
                            <>
                                {user ? (
                                    <div className='card-body'>
                                        <div className='row card-body-profile-info'>
                                            <div className='col-sm-4'>
                                                <div className='profile-user'>
                                                    <i className="fas fa-crown crown-icon" style={{color: changeRankColor(user.rank_id), fontSize: "3.5em"}}></i>
                                                </div>
                                                <div>
                                                    <p style={{marginBottom: '0',textAlign: 'center', color: '#979797'}}>{user.rank}</p>
                                                </div>
                                            </div>
                                            <div className='col-sm-8'>
                                                <h2 className='style-h-2 mb-3'>{user.display_name}</h2>
                                                <div className='user-info'>
                                                    <span>
                                                        <i className="fas fa-map-marker-alt"></i>
                                                        <span> {statesMX[user.state]} - { user.city } </span>
                                                    </span>
                                                    <br/>
                                                    <br/>
                                                    <span> 
                                                        <i className="fas fa-envelope"></i>
                                                        <span> {user.user_email} </span>
                                                    </span>
                                                    <br/>
                                                    <br/>
                                                    <span>
                                                        <i className="fas fa-money-check-alt"></i>
                                                        <span> {user.account} </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div> No data </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className='col-xl-7 col-md-12 col-lg-12'>
                    <div className='card card-calendar-content mb-4'>
                        <div className='card-body'>
                            <div className="row" style={{marginBottom: '20px'}}>
                                <div className="col-md justifyElements">
                                    <span className="btn btn-success btn-sm" onClick = {exportReportCSV}> Descargar Reporte CSV</span>
                                </div>
                                <div className="col-md justifyElements">
                                    <span className="btn btn-success btn-sm" onClick = {exportReportExcel}> Descargar Reporte Excel</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md justifyElements mt-0">
                                    <DatePicker
                                        selected={dateStart}
                                        onChange={(date) => dateBeginSet(date)}
                                        className="datepicker-input"
                                        // inline
                                    />
                                </div>
                                <div className="col-md justifyElements mt-0">
                                    <DatePicker
                                        selected={dateEnd}
                                        onChange={(date) => dateEndSet(date)}
                                        className="datepicker-input"
                                        // inline
                                    />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            { loading ? (
                <div className="containerCities backgroundColorWhite">
                    <h3 className='style-h-3 mb-3'>Cargando información</h3>
                </div>
            ) : (
                <>
                    {
                        (user) ? (
                            <>  
                                {arrUserRefferedSales(user)}
                                <div className="containerCities backgroundColorWhite">

                                    <div className='detailContainer'>
                                        <div className='detailContent content-border'>
                                            <h6 className='upper-h-6'>Ventas Distribuidores</h6> 
                                            <h2 className='style-h-2'>$ {user.salesTotal.toLocaleString("en-US",{ minimumFractionDigits: 2, maximumFractionDigits: 2,})}</h2>  
                                        </div>
                                        <div className='detailContent content-border'>
                                            <h6 className='upper-h-6'>Ganancias</h6>
                                            <h2 className='style-h-2'>
                                                $ {user.commission.toLocaleString("en-US",{ minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </h2>
                                        </div>
                                        <div className='detailContent content-border'>
                                            <h6 className='upper-h-6'> Objetivo anual</h6>
                                            <h2 className='style-h-2'>
                                                $ {(2997*12).toLocaleString("en-US",{ minimumFractionDigits: 2, maximumFractionDigits: 2,})} 
                                            </h2>
                                        </div>
                                        <div className='detailContent'>
                                            <h6 className='upper-h-6 mb-0'> Rango de Fechas</h6>
                                            <h4 className='style-h-4 mb-0'>{dateStart.toLocaleDateString("en-GB")} - {dateEnd.toLocaleDateString("en-GB")}</h4>
                                        </div>
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
                                                    {
                                                        filteredTable().map(sale => (
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
                            <div>No data</div>
                        )
                    }

                </>
            )
            }
        </>
    )
}
