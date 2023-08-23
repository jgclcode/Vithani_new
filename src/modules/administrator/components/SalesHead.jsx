import React, { useEffect, useState } from "react";
import "../../../styles.css";
import {statesMX} from '../../../constants/statesConst'

export const SalesHead = () => {
    
    const [loading, setLoading] = useState(false)
    const [totalSales, setTotalSales] = useState(0);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateBegin: '2023-05-01', dateEnd: '2023-08-31' })
    };

    useEffect(() => {
        setLoading(true)
        let total = 0;
        
        // fetch("https://vithaniglobal.com/wp-api/api/referredSales", requestOptions)
        fetch("http://127.0.0.1:8000/api/referredSales", requestOptions)
        .then(response => response.json())
        .then(json =>{
            
            for (const user in json.data) {
                
                if( json.data[user].salesTotal > 1000 )
                    total += json.data[user].salesTotal;
            }
        }
        )  
        .finally(() => {
            
            setTotalSales(total);
            setLoading(false);
        })
    }, [])

    return(
        <>
            <div className="containerCities backgroundColorWhite">
                <div className="salesGlobal">
                    { loading ? (
                            <div>Loading...</div>
                        ) : (

                            <>
                                <div className="salesDetails">
                                    <div style={{

                                        // 'height': '50px',
                                        // 'padding-top': '80px',
                                        // 'padding-bottom': '160px',
                                        // '-moz-box-shadow':'0px 0px 1px 0px rgb(210, 210, 210)',
                                        // 'box-shadow': '0px 0px 7px 8px rgb(199, 199, 199)',
                                        
                                    }}>
                                        <p>Ventas distribuidores</p>
                                        <p>$ {totalSales.toFixed(2).toLocaleString("en-US")}</p>
                                        
                                    </div>
                                </div>
                                <div className="salesDetails" style={{
                                    'width': '50%'
                                }}>
                                    <hr className="divider"/>
                                </div>

                                <div className="salesDetails">
                                    <p>Ganancias</p>
                                    <p>$ </p>
                                </div>
                                
                                <div className="salesDetails" style={{
                                    'width': '50%'
                                }}>
                                    <hr className="divider"/>
                                </div>

                                <div className="salesDetails">
                                    <p>Objetivo anual</p>
                                    <p>$ 10000</p>
                                </div>
                                
                                <div className="salesDetails" style={{
                                    'width': '50%'
                                }}>
                                    <hr className="divider"/>
                                </div>

                                <div className="salesDetails">
                                    <p>Ventas al público</p>
                                    <p>$ 10000</p>
                                </div>
                            </>
                            
                            

                            // (statesSales) ? (
                            //     Object.entries(statesSales).map( state => (
                            //         <div className="cities">
                            //             <h3>{statesMX[state[0]]}</h3>
                            //             <p><span>{ statesSales[state[0]] }</span></p>
                            //         </div>
                                
                            //     ))
                            // ) : (
                            //     <div>No data</div>
                            // )

                        )
                    }
                    
                </div>
            </div>

        </>
    );
}
