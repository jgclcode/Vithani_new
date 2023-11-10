import React, { useContext, useEffect, useState } from 'react'
import { GraphsHead } from '../components/GraphsHead';

import '../../../styles.css'
import '../css/styles-admin.css'

import { YearBarGraph } from '../components/graphs/YearBarGraph';

export const GraphsPage = () => {


    const [yearTotalSales, setYearTotalSales] = useState();
    const [yearAffiliatedSales, setYearAffiliatedSales] = useState();
    const [yearPublicSales, setYearPublicSales] = useState();
    const firstDay = new Date();
    const lastDay = new Date();

    const loadGeneralYearData = () => {

        fetch("https://vithaniglobal.com/wp-api/api/referredSalesByYear")
        .then(response => response.json())
        .then(json => {
            setYearTotalSales(json.yearTotalSales);
            setYearAffiliatedSales(json.yearAffiliatedSales);
            setYearPublicSales(json.yearPublicSales);
        })
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
            setUsers(json.data);
        })
    }

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [dateStart, setDateStart] = useState(new Date(firstDay.getFullYear(), firstDay.getMonth(), 1) );
    const [dateEnd, setDateEnd] = useState(new Date(lastDay.getFullYear(), lastDay.getMonth()+1, 0));

    useEffect(() => {
        setLoading(true);
        loadData(dateStart, dateEnd);
        loadGeneralYearData();
        setLoading(false);
    }, [])



    return (
        <>
            <GraphsHead/>

            { loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="row marginRow">
                        <div className="col-lg-12">
                            <YearBarGraph dataGraph={yearTotalSales} name = {'Acumulado anual'} color = {'#007fff'}/>
                        </div>
                    </div>

                    <div className="row marginRow">
                        <div className="col-lg-12">
                            <YearBarGraph dataGraph={yearAffiliatedSales} name = {'Ventas de distribuidores'} color = {'#198bfb'}/>
                        </div>
                    </div>

                    <div className="row marginRow">
                        <div className="col-lg-12">
                            <YearBarGraph dataGraph={yearPublicSales} name =  {'Ventas al público'}  color = {'#194afb'}/>
                        </div>
                    </div>
                </>

            )}
        </>
    )
}