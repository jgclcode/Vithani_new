import React from "react"
import { useNavigate } from "react-router-dom"
import icono from "../../assets/Vithani.svg";


export const LoginPage = () => {
        
    const navigate = useNavigate();

    const onLoginAdministrador = () => {
        navigate('/panel-vithani/loginAdministrator',{
            replace: true
        });
    }

    const onLoginDistribuidor = () => {
        navigate('/panel-vithani/loginDistributor',{
            replace: true
        });
    }
    
    return (
        <>
            <div className="main-content">
                <div className="py-7 py-lg-8 loginBody">
                
                    <div className="cardLogin">
                        
                        <div className="logoLogin"><img  className="logo" src={icono}/> </div>
                        
                        <br />
                        <br />
                        <button
                            className="btn btn-primary"
                            onClick={onLoginAdministrador}
                        >
                            Administrador
                        </button>
                        
                        <br />
                        <br />

                        <button
                            className="btn btn-primary"
                            onClick={onLoginDistribuidor}
                        >
                            Distribuidor
                        </button>
                    </div>
                </div>
            </div>


        
        </>
    )
}
