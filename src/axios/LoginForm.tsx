import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Navigate, Route, Routes, Link} from 'react-router-dom';
import './LoginForm.css';

LoginForm.propTypes = {

};

function LoginForm() {
    
    const login = () => {
        const data = {
            password: "admin",
            rememberMe: true,
            username: "admin"
        }
        axios.post("http://192.168.1.210:8080/api/authenticate",
            data
        )
            .then((response) => {
                console.log("token", response.data.id_token);
                localStorage.setItem("access_token", response.data.id_token);
                
            }).catch((err) => {
                console.log(err);
                return false
            })
    }
    return (
        <div className='div-login'>
            <button className='btn-login' onClick={() => login()}>
            <Link className='text-login' to='/post'>
                Login
                </Link>
            </button>
        </div>
    );
}

export default LoginForm;