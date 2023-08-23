import React, { useEffect, useState } from "react";
import "../../../styles.css";
import moment from "moment";


export const SalesHead = ({totalSales, publicSales, users}) => {
    
    const [loading, setLoading] = useState(true)
    const [totalSales_, setTotalSales] = useState(0);
    const [publicSales_, setPublicSales] = useState(0);
    const [users_, setUsers] = useState([]);

    // let firstDay = dateStart; //moment().startOf('month').format('YYYY-MM-DD');
    // let lastDay = dateEnd; //moment().endOf('month').format('YYYY-MM-DD');


    useEffect(() => {
        setLoading(true);
        setTotalSales(totalSales)
        setUsers(users)
        setPublicSales(publicSales)
        setLoading(false);
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
                                    <div>
                                        <p>Ventas distribuidores</p>
                                        <p>$ {totalSales_.toLocaleString("en-US")}</p>
                                        
                                    </div>
                                </div>
                                <div className="salesDetails" style={{
                                    'width': '50%'
                                }}>
                                    <hr className="divider"/>
                                </div>

                                <div className="salesDetails">
                                    <p>Ganancias</p>
                                    <p>$ {(totalSales_*.2285).toLocaleString("en-US")}</p>
                                </div>
                                
                                <div className="salesDetails" style={{
                                    'width': '50%'
                                }}>
                                    <hr className="divider"/>
                                </div>

                                <div className="salesDetails">
                                    <p>Objetivo anual</p>
                                    <p>$ {(735000 * users_.length).toLocaleString("en-US")} </p>
                                </div>
                                
                                <div className="salesDetails" style={{
                                    'width': '50%'
                                }}>
                                    <hr className="divider"/>
                                </div>

                                <div className="salesDetails">
                                    <p>Ventas al público</p>
                                    <p>$ {publicSales_.toLocaleString("en-US")}</p>
                                </div>
                            </>
                        )
                    }
                    
                </div>
            </div>

        </>
    );
}
