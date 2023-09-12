import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import icono from "../../assets/Vithani.svg";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";


export const LoginDistribuidor = () => {
    
    const navigate = useNavigate()

    const {login} = useContext(AuthContext);
    
    const {formState, onInputChange} = useForm({
        username: '',
        password: ''
    });

    const {username, password} = formState;

    const [loading, setLoading] = useState(false);
    const [invalidData, setInvalidData] = useState(false);

    const onLogin = () => {

        setInvalidData(false);
        setLoading(true);
        loadData(username, password);
    }

    const loadData = (username, password) => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: username,
                password: password
            })
        };

        let type = 'Distribuidor';

        fetch("https://vithaniglobal.com/wp-api/api/login", requestOptions)
        .then(response => response.json())
        .then(json => {
            
            if(json.status == 'success'){
                
                if(json.user.ID == 1){
                    type = 'Administrador';
                    
                    setLoading(false);
                    setInvalidData(true);

                } else {
                    login(json.user.ID, json.user.display_name, type);

                    navigate('/panel-vithani/distributor/dashboard',{
                        replace: true
                    });
                }
    
            } else {
                setLoading(false);
                setInvalidData(true);
            }
        })
    }
    
    return (
        <>
            <div className="main-content">
                <div className="py-7 py-lg-8 loginBody">
                
                    <div className="cardLogin">
                        
                        <div className="logoLogin"><img  className="logo" src={icono}/> </div>
                        <p> Distribuidor </p>
                        <form>
                            <div className="mb-3 form-group">
                                <div className="input-group-alternative input-group" style={{marginLeft:'20px', marginRight:'20px', width:'90%'}}>
                                    
                                    <input 
                                        placeholder="Username" 
                                        type="text" 
                                        autoComplete="username"
                                        className="form-control" 
                                        name="username" 
                                        value={ username }
                                        onChange={onInputChange}
                                        style={{width:'90%'}}
                                    />
                                </div>
                            </div>

                            <div className="mb-3 form-group">
                                <div className="input-group-alternative input-group" style={{marginLeft:'20px', marginRight:'20px', width:'90%'}}>
                                    
                                    <input 
                                        type="password"
                                        autoComplete="current-password"
                                        className="form-control"
                                        placeholder="password"
                                        name="password"
                                        value={ password }
                                        onChange={onInputChange}
                                        style={{width:'90%'}}
                                    />
                                </div>
                            </div>
                        </form>
                           
                        <br />
                        { (loading) ?  <span> Cargando </span> : <></> }
                        { (invalidData) ?  <span className="text-danger mr-2"> Los datos proporcionados son incorrectos</span> : <></> } 

                        <br />
                        <br />
                        <button
                            className="btn btn-primary"
                            onClick={onLogin}
                        >
                            Login
                        </button>
                        
                        <br />
                        <br />

                        <Link to={'/panel-vithani/login'}>
                            Volver
                        </Link>
                    </div>
                </div>
            </div>


        
        </>
    )
}
