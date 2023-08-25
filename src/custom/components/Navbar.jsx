import React from "react";
import { Outlet , Link} from "react-router-dom";

import icono from "../../assets/Vithani.svg";

import DashboardImg  from "../../assets/dashboard.svg";
import reporte from "../../assets/Grupo_1_hover.png";
import notificacionesimg from "../../assets/Grupo_3.png";
// import beneficios from "../../assets/Publico.svg";
// import Logout from "../../assets/Salir.svg";
import ventas from "../../assets/ventas_publico.svg";

import "../../styles.css" 

export const Navbar = () => {
    return(
        <div className="flexMenu">
            <nav className="flexStar">
                <div className="containerHeader" >

                        <div className="MenuPrincipal"><img  className="logo" src={icono}/> </div>
                        
                        <div className="enlace">
                            <Link  to="/dashboard">
                                <img className="imgLink" src={DashboardImg}/>
                                <p className="textLink">Dashboard</p>
                            </Link>
                        </div>

                        <div className="enlace">
                            <Link to="/reports">
                                <img className="imgEnlace1" src={reporte}/>
                                <p>Reporte</p>
                            </Link>
                        </div>
                        
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
            </nav>
            <div>
                <Outlet/>
            </div>
        </div>
    );
}