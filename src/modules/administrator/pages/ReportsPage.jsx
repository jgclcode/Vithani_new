import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../../../styles.css'
import { statesMX } from '../../../constants/statesConst';
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

    let salesData = [];

    const loadData = (firstDay, lastDay) => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({dateBegin: firstDay.toISOString().substring(0,10), dateEnd: lastDay.toISOString().substring(0,10) })
        };

        fetch("https://vithaniglobal.com/wp-api/api/referredSales", requestOptions)
        // fetch("http://127.0.0.1:8000/api/referredSales", requestOptions)
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
                                <div className="containerCities backgroundColorWhite">
                                    
                                    <div className='detailContainer'>
                                        <div className='detailContent'>
                                            <p>Ventas Distribuidores</p>   
                                        </div>
                                        <div className='detailContent'>
                                            <p>Ganancias</p>
                                        </div>
                                        <div className='detailContent'>
                                            <p> Objetivo anual</p>
                                        </div>
                                    </div>

                                    <div className='detailContainer'>
                                        <div className='detailContent'>
                                            <p>$ {totalGlobal.toLocaleString("en-US")}</p>
                                        </div>
                                        <div className='detailContent'>
                                            <p>$ {totalCommission.toLocaleString("en-US")}</p>

                                        </div>
                                        <div className='detailContent'>
                                            <p> $ {(735000 * users.length).toLocaleString("en-US")} </p>
                                        </div>
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
                                                <th>Distribuidor</th>

                                            </tr>
                                        </thead>
                                            <tbody>
                                            {   
                                                sales.map((sale, index) => (
                                                    <tr key={sale.sale_id}>
                                                        <td>{index + 1 }</td>
                                                        <td>{sale.reference}</td>
                                                        <td>{sale.date}</td>
                                                        <td>{sale.refferal_wp_uid}</td>
                                                        <td>{sale._order_total.toLocaleString("en-US")}</td>
                                                        <td>{sale.commission.toFixed(2).toLocaleString("en-US")}</td>
                                                        <td>{sale.display_name}</td>
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
