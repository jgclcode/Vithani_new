import { React, useState, useEffect, useContext } from "react";
import { Outlet , Link, useNavigate} from "react-router-dom";

import icono from "../../assets/Vithani.svg";

import DashboardImg  from "../../assets/dashboard.svg";
import reporte from "../../assets/Grupo_1_hover.png";
import referidos from "../../assets/Grupo.png"
import logoutImg from "../../assets/logout.png"

import "../../styles.css" ;

import { Popup } from "./Popup/Popup";
import { AuthContext } from "../../auth/context/AuthContext";

export const NavbarDistributor = () => {

    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);

    const [open, setOpen] = useState(false);

    const onSetActiveMenuItem = (e) => {
        var elems = document.querySelector("#navList div.bg-nav-item-active");
        if(elems !==null){
            elems.classList.remove("bg-nav-item-active");
            elems.classList.add('nav-item');
         
        }
        e.currentTarget.className = "nav-item bg-nav-item-active";
    };

    const onLogout = () => {
        logout();
        navigate('/login', {
            replace: true
        });
    }

    return(
        <div className="flexMenu">
            <nav className="flexStar navbar navbar-vertical fixed-left navbar-expand-lg ">
                <div className="containerHeader container-fluid" >
                    <div className="containerTop">
                        <div className="menuPrincipal navbar-brand"><img src={icono}/> </div>
                        <button className="btn_menuPrincipal navbar-toggler" type="button" data-bs-toggle="collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setOpen(true)}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {open ? <Popup closePopup={() => setOpen(false)} /> : null}
                    </div>
                        
                        
                       
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    
                        <ul className="enlace navbar-nav me-auto mb-2 mb-lg-0" id="navList">
                            <Link to="/distributor/dashboard" >
                                <div className="nav-item bg-nav-item-active"  onClick={onSetActiveMenuItem}>
                                    <img className="imgLink" src={DashboardImg}/>
                                    <p className="textLink">Dashboard</p>
                                </div>
                            </Link>
                            <Link to="/distributor/referrals">
                                <div className="nav-item" onClick={onSetActiveMenuItem}>
                                    <img className="imgEnlace1" src={referidos}/>
                                    <p>Referidos</p>
                                </div>
                            </Link>
                            <button onClick={onLogout} style={{border: "none", background: 'none'}}>
                                <div className="nav-item" onClick={onSetActiveMenuItem}>
                                    <img className="logout" src={logoutImg}/>
                                    <p>Logout</p>
                                </div>
                            </button>
                                
                        </ul>
                    </div>
                             
                </div>
            </nav>
            <div>
                <Outlet/>
            </div>
        </div>
    );
}