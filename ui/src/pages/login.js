import {Link, useNavigate} from "react-router-dom";
import React, {useState,useContext}  from "react";
import axios from "axios";
import {AuthProvider,AuthContext} from "../Auth.Provider"

function LoginComponent(){
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const { login } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            login(email,password)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
            <div className='d-flex justify-content-center mt-5'>
                <div className='col-md-5'>
                    <div className='card '>
                        <div className='card-header'>
                            <h1>  Giriş Sayfası </h1>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='email'>Mail Adresi</label>
                                    <input value={email} onChange={(e)=>{
                                        setEmail(e.target.value)
                                    }} type='email' className='form-control' id='email' name='email' />
                                </div>
                                <div className='form-group mt-2'>
                                    <label htmlFor='password'>Şifre</label>
                                    <input value={password} onChange={(e)=> setPassword(e.target.value)} type='password' className='form-control' id='password' name='password' />
                                </div>
                                <div className='form-group mt-2'>
                                    <button className='btn btn-outline-primary w-100'>
                                        Giriş Yap
                                    </button>
                                    <Link to='/register' className='mt-2' style={{float:"right"}}>Kayıt Ol</Link>
                                    <Link to='/forgotPassword' className='mt-2' style={{float:"right",marginRight:5}}>Şifremi Unuttum</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginComponent