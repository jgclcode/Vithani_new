import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DetailHead } from '../components/DetailHead';

import '../../../styles.css'

export const DetailPage = () => {
  
    const {user_id} = useParams();

    const [user, setUser] = useState<any>()
    const [loading, setLoading] = useState(false)
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id: user_id,  dateBegin: '2023-08-01', dateEnd: '2023-08-31' })
    };

    useEffect(() => {
        setLoading(true)
        fetch("https://vithaniglobal.com/wp-api/api/referredSalesById", requestOptions)
        .then(response => response.json())
        .then(json => setUser(json.data))
        .finally(() => {
            setLoading(false)
        })
    }, []);


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
                                <h1>{user.user_nicename}</h1>
                                <br />
                                <h3>{user.state} - { user.city }</h3>
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
                                        <p>$ {user.salesTotal}</p>
                                    </div>
                                    <div className='detailContent'>
                                        <p>$ {user.commission}</p>

                                    </div>
                                    <div className='detailContent'>
                                        <p> $ 30000 </p>
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
