import { React, useState, useEffect } from "react";
import { Outlet , Link} from "react-router-dom";

import icono from "../../assets/Vithani.svg";

import DashboardImg  from "../../assets/dashboard.svg";
import reporte from "../../assets/Grupo_1_hover.png";
import notificacionesimg from "../../assets/Grupo_3.png";
// import beneficios from "../../assets/Publico.svg";
// import Logout from "../../assets/Salir.svg";
import ventas from "../../assets/ventas_publico.svg";

import "../../styles.css" ;

import { Popup } from "./Popup/Popup";

export const Navbar = () => {

    const [open, setOpen] = useState(false);


    const onSetActiveMenuItem = (e) => {
        var elems = document.querySelector("#navList div.bg-nav-item-active");
        if(elems !==null){
            elems.classList.remove("bg-nav-item-active");
            elems.classList.add('nav-item');
         
        }
        e.currentTarget.className = "nav-item bg-nav-item-active";
    };

    return(
        <div className="flexMenu">
            <nav className="flexStar navbar navbar-vertical fixed-left navbar-expand-lg "> {/* navbar-light bg-white */}
                <div className="containerHeader container-fluid" >
                    <div className="containerTop">
                        <div className="menuPrincipal navbar-brand"><img src={icono}/> </div>
                        <button className="btn_menuPrincipal navbar-toggler" type="button" data-bs-toggle="collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setOpen(true)}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {open ? <Popup closePopup={() => setOpen(false)} /> : null}
                    </div>
                        
                        
                       
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    
                        <ul className="enlace navbar-nav me-auto mb-2 mb-lg-0" id="navList"> {/*onClick={onSetActiveMenuItem}*/}
                            <Link to="/dashboard" >
                                <div className="nav-item bg-nav-item-active"  onClick={onSetActiveMenuItem}>
                                    <img className="imgLink" src={DashboardImg}/>
                                    <p className="textLink">Dashboard</p>
                                </div>
                            </Link>
                            <Link to="/reports">
                                <div className="nav-item" onClick={onSetActiveMenuItem}>
                                    <img className="imgEnlace1" src={reporte}/>
                                    <p>Reporte</p>
                                </div>
                            </Link>
                        </ul>     

                        {/* <div className="enlace">
                            <Link to="/public">
                                <img className="imgEnlace4" src={ventas}/>
                                <p>Publico</p>
                            </Link>
                        </div>
                        <div className="enlace">
                            <Link to="/Notifications">
                                <img 
                                    className="imgEnlace2" 
                                    src={notificacionesimg}
                                />
                                <p>Notificaciones</p>
                            </Link>
                        </div> */}
                        {/* <div className="enlace">
                            <Link to="./DescuentosandBeneficios">
                                <img className="imgEnlace3" src={beneficios}/>
                                <p>Beneficios</p>
                            </Link>
                        </div> */}
                        {/* <div className="enlace">
                            <img className="imgEnlace5" src={Logout}/>
                        </div> */}
                    </div>
                             
                </div>
            </nav>
            <div>
                <Outlet/>
            </div>
        </div>
    );
}