import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { DetailHead } from '../components/DetailHead';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../../../styles.css'

export const DetailPage = () => {
  
    const {user_id} = useParams();
    
    const [user, setUser] = useState();

    const firstDay = new Date();
    const lastDay = new Date();

    const loadData = (firstDay, lastDay) => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id: user_id, dateBegin: firstDay, dateEnd: lastDay })
        };
        
        // let total = 0;
        // let publicTotal = 0;

        // fetch("https://vithaniglobal.com/wp-api/api/referredSalesById", requestOptions)
        fetch("http://127.0.0.1:8000/api/referredSalesById", requestOptions)
        .then(response => response.json())
        .then(json => setUser(json.data))
        .finally(() => {
            setLoading(false)
        })
    }

    const [loading, setLoading] = useState(false)
    const [dateStart, setDateStart] = useState(new Date(firstDay.getFullYear(), firstDay.getMonth(), 1));
    const [dateEnd, setDateEnd] = useState(new Date(lastDay.getFullYear(), lastDay.getMonth()+1, 0));

    
    useEffect(() => {

        setLoading(true)
        loadData(firstDay, lastDay)

    }, [])

    
    const dateBeginSet = (date) => {
        setLoading(true);

        console.log(date);
        setDateStart(date);
        loadData(dateStart, dateEnd)
    };

    const dateEndSet = (date) => {
        
        setLoading(true);
        
        console.log(date);
        setDateEnd(date);
        loadData(dateStart, dateEnd)
    };


    return (
        <>
            { loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <DetailHead/>
                    
                    {
                        (user) ? (

                            <>  
                                <div className="membersandDistri containerCities" style={{marginLeft:'100px', marginBottom:'20px', marginTop:'20px'}}>
                                    <Link to={'/dashboard'}>
                                        Regresar
                                    </Link>
                                </div>
                                <br />
                                <div className="membersandDistri containerCities " style={{marginLeft:'150px', marginBottom:'20px', marginTop:'20px'}}>
                                    <DatePicker
                                        selected={dateStart}
                                        onChange={(date) => dateBeginSet(date)}
                                    />

                                    <DatePicker
                                        selected={dateEnd}
                                        onChange={(date) => dateEndSet(date)}
                                    />
                                </div>
                                <br />
                                <div className="containerCities backgroundColorWhite">
                                    <h1>{user.user_nicename}</h1>
                                    <br />
                                    <h3>Email: {user.user_email}</h3>
                                    <br />
                                    <h3>Ubicación: {user.state} - { user.city }</h3>
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
                                            <p>$ {user.salesTotal.toFixed(2).toLocaleString("en-US")}</p>
                                        </div>
                                        <div className='detailContent'>
                                            <p>$ {user.commission.toFixed(2).toLocaleString("en-US")}</p>

                                        </div>
                                        <div className='detailContent'>
                                            <p> $ 2,997 </p>
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
