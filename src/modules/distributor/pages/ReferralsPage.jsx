import React, { useContext, useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";

import '../../../styles.css'
import '../css/styles-distributor.css'
import { AuthContext } from '../../../auth/context/AuthContext';
import { ReferralsHead } from '../components/ReferralsHead';
import { Tree, TreeNode} from 'react-organizational-chart';

export const ReferralsPage = () => {

    const {user} = useContext(AuthContext);
    const user_id = user.id.toString();
    
    const [userData, setUserData] = useState();

    const [userRelations, setUserRelations] = useState();

    const firstDay = new Date();
    const lastDay = new Date();

    const loadDistributorsRelations = () => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user_id })
        };

        fetch("https://biogel.mx/wp-api/api/distributorsRelations", requestOptions)
        .then(response => response.json())
        .then(json => {
                setUserRelations(json.data.relations);
            }
        )
    }

    const loadData = (firstDay, lastDay) => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id: user_id, dateBegin: firstDay.toISOString().substring(0,10), dateEnd: lastDay.toISOString().substring(0,10) })
        };

        fetch("https://biogel.mx/wp-api/api/referredSalesById", requestOptions)
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
            return '#989898';
        }
    }

    const treeContainerRef = React.createRef();
    const [checkedInput, setCheckedInput] = useState("15%");

    const initialState = {
        scale: "15%"
    }

    let scaleCurrent = initialState;
 
    const scales = {
        "15%": 0.15,
        "50%": 0.5,
        "100%": 1.0,
        "150%": 1.5,
        "200%": 2
    }  

    const setScale = (key) => {
        scaleCurrent = {
            scale: key
        };

        treeContainerRef.current.style.zoom = scales[scaleCurrent.scale];
        setCheckedInput(scaleCurrent.scale);
    };

    
    const [loading, setLoading] = useState(false)
    const [dateStart, setDateStart] = useState(new Date(firstDay.getFullYear(), firstDay.getMonth(), 1));
    const [dateEnd, setDateEnd] = useState(new Date(lastDay.getFullYear(), lastDay.getMonth()+1, 0));

    useEffect(() => {
        setLoading(true);
        loadData(dateStart, dateEnd);
        loadDistributorsRelations();
        setLoading(false);
    }, [])

    const printTree = (relations) => {

        return (relations.map((relation, index) => (
            <TreeNode key={relation.refferal_wp_uid} label={
                <div className='second-level-tree'>
                    <i className="fas fa-crown referral-icon-sl" style={{color: changeRankColor(relation.rank_id), fontSize: "2em"}}></i>
                    <br></br>
                    {relation.refferal_wp_uid}
                </div>
            }>
                {
                    printTree(relation.relations)
                }
            </TreeNode>
        )))
    }

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
                        (userData &&  userRelations) ? (
                            <>  
                                <div className='zoom-div-container'>                            
                                    <p>Escalas para el Zoom del árbol: </p>
                                    <div className='zoom-options mb-3'>
                                        {

                                            Object.keys(scales).map(key => <div key={key} className='zoom-input'> <label key={key}><input name="scale" type="radio" value={key} checked={checkedInput === key} onChange={() => setScale(key) } />{key}</label> </div>)

                                        }
                                    </div>
                                </div>
                                <div className='tree-container' style={{zoom: scales[scaleCurrent.scale]}} ref={treeContainerRef}>
                                    <Tree
                                        lineWidth={"2px"}
                                        lineColor={"#bbc"}
                                        lineBorderRadius={"12px"}
                                        label={
                                        <div className='first-level-tree'>
                                            <i className="fas fa-crown crown-icon" style={{color: changeRankColor(userData.rank_id), fontSize: "2em"}}></i>  
                                            {userData.display_name}
                                        </div>
                                        }
                                    >
                                    {
                                        printTree(userRelations)
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
