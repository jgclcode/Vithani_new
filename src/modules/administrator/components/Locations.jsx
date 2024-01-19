import React, { useEffect, useState } from "react";
import "../../../styles.css";
import {statesMX} from '../../../constants/statesConst'

export const Locations = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [statesSales , setStateSales] = useState(0)
    const [statesTotalSales, setStatesTotalSales] = useState(0);
    
    let resStates = {};

    let resSales = {};

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateBegin: '2023-05-01', dateEnd: '2023-08-31' })
    };

    useEffect(() => {
        setLoading(true)

        fetch("https://biogel.mx/wp-api/api/referredSales", requestOptions)
        .then(response => response.json())
        .then(json =>{
            setUsers(json.data)

            resStates = json.data.reduce(function(obj, v) {
                obj[v.state] = (obj[v.state] || 0) + 1;
                
                return obj;
            }, {})

            resSales = json.data.reduce(function(obj, v) {

                obj[v.state] = ( obj[v.state] || 0 ) + v.salesTotal;
                
                return obj;
            }, {})

        }
        )  
        .finally(() => {
            
            setStateSales(resStates);

            setStatesTotalSales(resSales);

            setLoading(false);
        })
    }, [])

    return(
        <>
            <div className="containerCities backgroundColorWhite">
                <h2>Ventas nacional</h2>
                <div className="city">
                    
                    { loading ? (
                            <div>Loading...</div>
                        ) : (

                            (statesSales) ? (
                                Object.entries(statesSales).map( state => (
                                    <div className="cities">
                                        <h3>{statesMX[state[0]]}</h3>
                                        <p><span>{ statesSales[state[0]] }</span></p>
                                    </div>
                                
                                ))
                            ) : (
                                <div>No data</div>
                            )

                        )
                    }
                    
                </div>
            </div>

        </>
    );

}