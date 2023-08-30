import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { DetailHead } from '../components/DetailHead';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../../../styles.css'
import { statesMX } from '../../../constants/statesConst';

export const DetailPage = () => {
  
    const {user_id} = useParams();
    
    const [user, setUser] = useState();

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
        .then(json => setUser(json.data))
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


    const [loading, setLoading] = useState(false)
    const [dateStart, setDateStart] = useState(new Date(firstDay.getFullYear(), firstDay.getMonth(), 1));
    const [dateEnd, setDateEnd] = useState(new Date(lastDay.getFullYear(), lastDay.getMonth()+1, 0));

    
    useEffect(() => {
        setLoading(true);
        loadData(dateStart, dateEnd)
        console.log(dateStart);
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
            <DetailHead/>

            <div className="membersandDistri" style={{marginLeft:'100px', marginBottom:'20px', marginTop:'20px'}}>
                <Link to={'/dashboard'}>
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
                        (user) ? (
                            <>  
                                <div className="containerCities backgroundColorWhite">
                                    <h1>{user.display_name}</h1>
                                    <br />
                                    <h3>Email: {user.user_email}</h3>
                                    <br />
                                    <h3>Ubicación: {statesMX[user.state]} - { user.city }</h3>
                                    <br />
                                    <h4>Cuenta bancaria: {user.account}</h4>
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
                                            <p>$ {user.salesTotal.toLocaleString("en-US")}</p>
                                        </div>
                                        <div className='detailContent'>
                                            <p>$ {user.commission.toLocaleString("en-US")}</p>

                                        </div>
                                        <div className='detailContent'>
                                            <p> $ 999 </p>
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
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                user.refferedSales.map((sale, index) => (
                                                    <tr key={sale.sale_id}>
                                                        <td>{index +1 }</td>
                                                        <td>{sale.reference}</td>
                                                        <td>{sale.date}</td>
                                                        <td>{sale.refferal_wp_uid}</td>
                                                        <td>{sale._order_total.toLocaleString("en-US")}</td>
                                                        <td>{sale.commission.toFixed(2).toLocaleString("en-US")}</td>
                                                        
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
            )
            }
        </>
    )
}
