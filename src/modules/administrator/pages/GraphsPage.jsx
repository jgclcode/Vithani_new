import React, { useContext, useEffect, useState } from 'react';
import { GraphsHead } from '../components/GraphsHead';

import '../../../styles.css';
import '../css/styles-admin.css';

import { TotalSalesBarGraph } from '../components/graphs/TotalSalesBarGraph';
import { DistributorSalesBarGraph } from '../components/graphs/DistributorSalesBarGraph';
import { PublicSalesBarGraph } from '../components/graphs/PublicSalesBarGraph';

export const GraphsPage = () => {


    const [totalSalesData, setTotalSalesData] = useState();
    const [distributorSalesData, setDistributorSalesData] = useState();
    const [publicSalesData, setPublicSalesData] = useState();
    const firstDay = new Date();
    const lastDay = new Date();

    const loadTotalSalesData = () => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: "24" })
        };

        fetch("https://vithaniglobal.com/wp-api/api/referredSalesByIdAndYear", requestOptions)
        // fetch("http://127.0.0.1:8000/api/referredSalesByIdAndYear", requestOptions)
        .then(response => response.json())
        .then(json => {
                setTotalSalesData(json.data.yearSales);
            }
        )
    }

    const loadDistributorSales = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: "104" })
        };

        fetch("https://vithaniglobal.com/wp-api/api/referredSalesByIdAndYear", requestOptions)
        // fetch("http://127.0.0.1:8000/api/referredSalesByIdAndYear", requestOptions)
        .then(response => response.json())
        .then(json => {
                setDistributorSalesData(json.data.yearSales);
            }
        )
    }

    const loadPublicSales = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: "11" })
        };

        fetch("https://vithaniglobal.com/wp-api/api/referredSalesByIdAndYear", requestOptions)
        // fetch("http://127.0.0.1:8000/api/referredSalesByIdAndYear", requestOptions)
        .then(response => response.json())
        .then(json => {
                setPublicSalesData(json.data.yearSales);
            }
        )
    }
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
        loadTotalSalesData();
        loadDistributorSales();
        loadPublicSales();
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
                        <div className="col-lg-12 mb-5">
                            <TotalSalesBarGraph dataGraph={totalSalesData}/>
                        </div>
                        <div className="col-lg-12 mb-5">
                            <DistributorSalesBarGraph dataGraph={distributorSalesData}/>
                        </div>
                        <div className="col-lg-12">
                            <PublicSalesBarGraph dataGraph={publicSalesData}/>
                        </div>
                    </div>
                </>

            )}
        </>
    )
}