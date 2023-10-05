import React, { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../../../styles.css'
import '../css/styles-distributor.css'
import { AuthContext } from '../../../auth/context/AuthContext';
import { statesMX } from '../../../constants/statesConst';
import { YearBarGraph } from '../components/graphs/YearBarGraph';
import { ReferralsHead } from '../components/ReferralsHead';
import { Tree, TreeNode} from 'react-organizational-chart';

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
                setUserReferralsYear(json.data.yearReferrals);
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

    const changeRankColor = (idRank) => {
        //Distribuidor Asociado
        if(idRank === 1){
            return '#5c67ed';
        }
        //Distribuidor Autorizado
        if(idRank === 2){
            return '#5c94ed';
        }
        //Director Junior
        if(idRank === 21){
            return '#5cb5ed';
        }
        //Director Regional
        if(idRank === 23){
            return '#000000';
        }
        //Director Senior
        if(idRank === 22){
            return '#895ced';
        }
        //Director Master
        if(idRank === 24){
            return '#000000';
        }
        else{
            return '#FFFFFF';
        }
    }

    const treeContainerRef = React.createRef();
    const crownDivRef = React.createRef();
    const [checkedInput, setCheckedInput] = useState("Extra Chico");

    const initialState = {
        scale: "Extra Chico"
    }
    let scaleCurrent = initialState;
 
    const scales = {
        "Extra Chico": 0.15,
        "Chico": 0.5,
        "Mediano": 1.0,
        "Largo": 1.5,
        "Extra Largo": 2
    }  

    const setScale = (key) => {
        scaleCurrent = {
            scale: key
        };

        if(scaleCurrent.scale === 'Extra Chico'){
            crownDivRef.current.style.display = 'none';
        }else{
            crownDivRef.current.style.display = 'block'
        }
        treeContainerRef.current.style.zoom = scales[scaleCurrent.scale];
        setCheckedInput(scaleCurrent.scale);
    };

    
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
                                <h3>Árbol Referidos</h3>
                                <p>Zoom:  <br />
                                    {
                                        
                                        Object.keys(scales).map(key => <> <label key={key}><input name="scale" type="radio" value={key} checked={checkedInput === key} onChange={() => setScale(key) } />{key}</label> <br /> </>)
                                        
                                    }
                                </p>
                                <div className='tree-container' style={{zoom: scales[scaleCurrent.scale]}} ref={treeContainerRef}>
                                    <Tree
                                        lineWidth={"2px"}
                                        lineColor={"#bbc"}
                                        lineBorderRadius={"12px"}
                                        label={
                                        <div className='first-level-tree'>
                                            <div className='crown-icon-div' ref={crownDivRef}>   
                                            </div>
                                            <i className="fas fa-crown crown-icon" style={{color: changeRankColor(userData.rank_id), fontSize: "2em"}}></i>
                                            
                                            {userData.display_name}
                                        </div>
                                        }
                                    >
                                    {
                                        userReferralsYear.map((referred, index) => (
                                            <TreeNode key={referred.refferal_wp_uid} label={
                                                <div className='second-level-tree'>
                                                    <i className="fas fa-user referral-icon-sl" style={{color: changeRankColor(referred.rank_id), fontSize: "2em"}}></i>
                                                    <br></br>
                                                    {referred.refferal_wp_uid}
                                                </div>
                                            }>
                                                {referred.referredReferredSales.map((referredReferred, index) => (
                                                    <TreeNode key={referredReferred.refferal_wp_uid} label={
                                                        <div className='second-level-tree'>
                                                            <i className="fas fa-user referral-icon-sl" style={{color: changeRankColor(referredReferred.rank_id), fontSize: "2em"}}></i>
                                                            <br></br>
                                                            {referredReferred.refferal_wp_uid}
                                                        </div>
                                                    }>
                                                    </TreeNode>
                                                
                                                ))}

                                            </TreeNode>
                                            
                                        ))
                                    }
                                    </Tree>
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
