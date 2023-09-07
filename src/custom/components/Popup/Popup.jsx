import { React, useState } from "react";
import {Link} from "react-router-dom"
import DashboardImg  from "../../../assets/dashboard.svg";
import reporte from "../../../assets/Grupo_1_hover.png";
import icono from "../../../assets/Vithani.svg";
import "./Popup.css";
import "../../../styles.css" ;


export const Popup = ({ closePopup }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = event => {
      setIsActive(current => !current);
    };


    return (
        <div className="popup-container">
            <div className="popup-body">
                <div className="navbar-collapse">
                    <div className="navbar-collapse-header d-md-none">
                        <div className="row">
                            <div className="collapse-brand col-6">
                                <img src={icono}/>
                            </div>
                            <div className="collapse-close col-6">
                                <button className="navbar-toggler close" type="button" aria-label="Close" onClick={closePopup}>

                                    <span>&times;</span>

                                </button>
                            </div>
                        </div>
                    </div>
                    <ul className="enlace-popup navbar-nav">
                        <div className={`nav-item mb-3 ${isActive ? 'bg-nav-item-active' : ''}`} onClick={handleClick}>
                            <Link to="/dashboard" onClick={closePopup}>
                                <img className="imgLink" src={DashboardImg}/>
                                <p className="textLink">Dashboard</p>
                            </Link>
                        </div>
                        <div className="nav-item mb-3">
                            <Link to="/reports" onClick={closePopup}>
                                <img className="imgEnlace1" src={reporte}/>
                                <p>Reporte</p>
                            </Link>
                        </div>
                    </ul>     
                </div>
            </div>
        </div>
    );
};