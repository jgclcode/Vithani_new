import React, { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../../../styles.css'
import '../css/styles-distributor.css'
import { AuthContext } from '../../../auth/context/AuthContext';
import { statesMX } from '../../../constants/statesConst';
import { YearBarGraph } from '../components/graphs/YearBarGraph';
import { ReferralsHead } from '../components/ReferralsHead';

export const ReferralsPage = () => {

    const {user} = useContext(AuthContext);
    const user_id = user.id.toString();
    
    const [userData, setUserData] = useState();

    const [userReferralsYear, setUserReferralsYear] = useState();

    const firstDay = new Date();
    const lastDay = new Date();

    const loadYearData = () => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user_id })
        };

        fetch("https://vithaniglobal.com/wp-api/api/referredSalesByIdAndYear", requestOptions)
        // fetch("http://127.0.0.1:8000/api/referredSalesByIdAndYear", requestOptions)
        .then(response => response.json())
        .then(json => {
                // setUserYearData(json.data.yearSales);
                // setUserYearTotal(json.data.yearTotal);
                setUserReferralsYear(json.data.yearReffered);
            }
        )
    }

    const loadData = (firstDay, lastDay) => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id: user_id, dateBegin: firstDay.toISOString().substring(0,10), dateEnd: lastDay.toISOString().substring(0,10) })
        };

        fetch("https://vithaniglobal.com/wp-api/api/referredSalesById", requestOptions)
        // fetch("http://127.0.0.1:8000/api/referredSalesById", requestOptions)
        .then(response => response.json())
        .then(json => {
            setUserData(json.data)
        })
    }

    const [loading, setLoading] = useState(false)
    const [dateStart, setDateStart] = useState(new Date(firstDay.getFullYear(), firstDay.getMonth(), 1));
    const [dateEnd, setDateEnd] = useState(new Date(lastDay.getFullYear(), lastDay.getMonth()+1, 0));

    useEffect(() => {
        setLoading(true);
        loadData(dateStart, dateEnd);
        loadYearData();
        setLoading(false);
    }, [])

    return (
        <>  
            <ReferralsHead/>

            { loading ? (
                <div className="containerCities backgroundColorWhite">
                    <h3 className='style-h-3 mb-3'>Cargando información</h3>
                </div>
            ) : (
                <>
                    {
                        (userData &&  userReferralsYear) ? (
                            <>
                                <div className="containerCities backgroundColorWhite">
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Referido</th>                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userReferralsYear.map((referred, index) => (
                                                    <tr key={index}>
                                                        <td>{index +1 }</td>
                                                        <td>{referred}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                
                            </>
                        ) : (
                            <div className="containerCities backgroundColorWhite">
                                <h3 className='style-h-3 mb-3'>Cargando información</h3>
                            </div>
                        )
                    }

                </>
            )}
        </>
    )
}
