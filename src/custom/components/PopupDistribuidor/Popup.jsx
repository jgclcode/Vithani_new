import { React, useContext, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import DashboardImg  from "../../../assets/dashboard.svg";
import reporte from "../../../assets/Grupo_1_hover.png";
import referidos from "../../../assets/Grupo.png"
import icono from "../../../assets/Vithani.svg";
import "./Popup.css";
import "../../../styles.css" ;
import { AuthContext } from "../../../auth/context/AuthContext";
import logoutImg from "../../../assets/logout.png"
import media_kit from "../../../assets/image-gallery-line1.png"
import legales from "../../../assets/documents-outline1.png"
import trackSellingLink from "../../../assets/track-selling-link.png"

export const Popup = ({ closePopup }) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const {logout} = useContext(AuthContext);

    const handleClick = event => {
      setIsActive(current => !current);
    };

    const onLogout = () => {
        logout();
        navigate('/login', {
            replace: true
        });
    }

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
                            <Link to="/distributor/dashboard" onClick={closePopup}>
                                <img className="imgLink" src={DashboardImg}/>
                                <p className="textLink">Dashboard</p>
                            </Link>
                        </div>
                        <div className="nav-item mb-3">
                            <Link to="/distributor/referrals" onClick={closePopup}>
                                <img className="imgEnlace1 pt-1 pb-1" src={referidos}/>
                                <p>Mi Red</p>
                            </Link>
                        </div>
                        <div className="nav-item mb-3">
                            <Link to="https://mexico.vithaniglobal.com/materiales/" target="_blank" onClick={closePopup}>
                                <img className="imgEnlace1" src={media_kit}/>
                                <p>Media Kit</p>
                            </Link>
                        </div>
                        <div className="nav-item mb-3">
                            <Link to="https://mexico.vithaniglobal.com/legales/" target="_blank" onClick={closePopup}>
                                <img className="imgEnlace1" src={legales}/>
                                <p>Legales</p>
                            </Link>
                        </div>
                        <div className="nav-item mb-3">
                            <Link to="https://mexico.vithaniglobal.com/trackselling/" target="_blank" onClick={closePopup}>
                                <img className="imgEnlace1" src={trackSellingLink}/>
                                <p>Track Selling Link</p>
                            </Link>
                        </div>
                        <div className="nav-item mb-3" onClick={onLogout}>
                            <img className="logout" src={logoutImg} />
                            <p style={{
                                textDecoration: 'none',
                                color: 'rgb(103, 96, 96)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}>Logout</p>
                        </div>
                    </ul>     
                </div>
            </div>
        </div>
    );
};