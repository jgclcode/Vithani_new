import React, { useEffect, useState } from "react";
import "../../../styles.css";

export const Locations = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [statesSales , setStateSales] = useState()
    const [statesTotalSales, setStatesTotalSales] = useState();
    
    let resStates = {};

    let resSales = {};

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateBegin: '2023-08-01', dateEnd: '2023-08-31' })
    };

    useEffect(() => {
        setLoading(true)


        fetch("https://vithaniglobal.com/wp-api/api/referredSales", requestOptions)
        .then(response => response.json())
        .then(json =>{
            setUsers(json.data)

            resStates = json.data.reduce(function(obj, v) {
                obj[v.state] = (obj[v.state] || 0) + 1;
                
                return obj;
            }, {})

            resSales = json.data.reduce(function(obj, v) {

                obj[v.state] = ( obj[v.state] || 0 ) + parseFloat(v.salesTotal.replace(",", ""));
                
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
            <div className="containerCitys backgroundColorWhite">
                <div className="cits">
                    { loading ? (
                            <div>Loading...</div>
                        ) : (

                            (statesSales) ? (
                                Object.entries(statesSales).map( state => (
                                    <div className="cityss">
                                        <h3>{state[0]}</h3>
                                        <p>$<span>{statesTotalSales[state[0]]}</span></p>
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