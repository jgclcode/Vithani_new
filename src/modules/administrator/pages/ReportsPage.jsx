import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../../../styles.css'
import '../css/styles-admin.css'
import { ReportsHead } from '../components/ReportsHead';

export const ReportsPage = () => {
  
    const firstDay = new Date();
    const lastDay = new Date();

    const [users, setUsers] = useState([]);
    const [totalGlobal, setTotalGlobal] = useState(0);
    const [totalCommission, setTotalCommission] = useState(0);
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false)
    const [dateStart, setDateStart] = useState(new Date(firstDay.getFullYear(), firstDay.getMonth(), 1));
    const [dateEnd, setDateEnd] = useState(new Date(lastDay.getFullYear(), lastDay.getMonth()+1, 0));

    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');

    let salesData = [];
    let arrSales = [];

    const arrUserSales = (usersSales) => {
 
        usersSales.map((sale, index) => {
            let arrS = {
                "id": sale.sale_id,
                "index": index +1,
                "reference": sale.reference,
                "date": sale.date,
                "refferal_wp_uid": sale.refferal_wp_uid,
                "order_total": sale._order_total,
                "commission": sale.commission,
                "display_name": sale.display_name
            };
            arrSales[index] = arrS;
        });  
    }

    const filteredTable = () => {
        if (search.length === 0){
            return arrSales.slice(currentPage, currentPage + 10);
        }
        const filtered = arrSales.filter(refSaleName => refSaleName.refferal_wp_uid.toLowerCase().includes(search.toLowerCase()));
        return filtered.slice(currentPage, currentPage + 10);
    }

    const nextPage = () => {
        if(arrSales.filter(refSaleName => refSaleName.refferal_wp_uid.includes(search)).length > currentPage + 10)
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

    const loadData = (firstDay, lastDay) => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({dateBegin: firstDay.toISOString().substring(0,10), dateEnd: lastDay.toISOString().substring(0,10) })
        };

        fetch("https://vithaniglobal.com/wp-api/api/referredSales", requestOptions)
        .then(response => response.json())
        .then(json => {

            salesData = [];
            let usersTemp = json.data
            setUsers(json.data)

            for (let userData of usersTemp) {
                for(let saleData of userData.sales){
                    saleData.display_name = userData.display_name
                    salesData.push(saleData)
                }
            }

            setTotalGlobal(json.totalGlobal)
            setTotalCommission(json.totalCommission)
            
        })
        .finally(() => {
            setSales(salesData);
            setLoading(false);
        })
    }

    const exportReportCSV = () => {
        
        fetch(`https://vithaniglobal.com/wp-api/api/exportGeneralReportCSV/${dateStart.toISOString().substring(0,10)}/${dateEnd.toISOString().substring(0,10)}`)
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
            <ReportsHead/>

            <div className="membersandDistri" style={{marginLeft:'100px', marginBottom:'20px', marginTop:'20px'}}>
                <Link to={-1}>
                    Regresar
                </Link>
            </div>

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
            </div>

            <div className="row marginRow">
                <div className="col-md justifyElements">
                    <span className="btn btn-success btn-sm" onClick = {exportReportCSV}> Descargar Reporte CSV</span>
                </div>
                <div className="col-md justifyElements">
                    <span className="btn btn-success btn-sm" onClick = {exportReportExcel}> Descargar Reporte Excel</span>
                </div>
            </div>

            { loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {
                        (users) ? (
                            <>  
                                {arrUserSales(sales)}
                                <div className="containerCities backgroundColorWhite">
                                    
                                    <div className='detailContainer reports'>
                                        <div className='detailContent content-border'>
                                            <h6 className='upper-h-6'>Ventas Distribuidores</h6>
                                            <h2 className='style-h-2'>$ {totalGlobal.toLocaleString("en-US",{ minimumFractionDigits: 2, maximumFractionDigits: 2,})}</h2>   
                                        </div>
                                        <div className='detailContent content-border'>
                                            <h6 className='upper-h-6'>Ganancias</h6>
                                            <h2 className='style-h-2'>
                                                $ {totalCommission.toLocaleString("en-US",{ minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </h2>
                                        </div>
                                        <div className='detailContent'>
                                            <h6 className='upper-h-6'> Objetivo anual</h6>
                                            <h2 className='style-h-2'>
                                                $ {(735000 * users.length).toLocaleString("en-US",{ minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </h2>
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
                                                        <th>Distribuidor</th>

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
                                                                <td>{sale.order_total.toLocaleString("en-US")}</td>
                                                                <td>{sale.commission.toFixed(2).toLocaleString("en-US")}</td>
                                                                <td>{sale.display_name}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                    </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className='row me-0'>
                                        <div className='col-12 buttons-table'>
                                            <h6 className='me-3 mb-0'> { arrSales.filter(refSaleName => refSaleName.refferal_wp_uid.toLowerCase().includes(search.toLowerCase())).length } registros encontrados</h6>
                                            <button className='btn-table' onClick={prevPage} disabled={currentPage === 0}>
                                                <i className="fas fa-angle-double-left"></i>
                                            </button>
                                            <button className='btn-table' onClick={nextPage} disabled={arrSales.filter(refSaleName => refSaleName.refferal_wp_uid.includes(search)).length < currentPage + 10}>
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
            )}
        </>
    )
}
