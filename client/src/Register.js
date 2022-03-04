import React, { useState } from "react";
import './App.css';
import Axios from 'axios';
import { useCookies } from 'react-cookie';

function Register() {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const register = () => {
        Axios.post("https://api-dot-elite-firefly-337919.uc.r.appspot.com/register", {
        //Axios.post("http://localhost:8080/register", {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    };

    const[cookies, setCookie] = useCookies(["register"]);

    function handleCookie() {
    if (cookies.register == undefined) {
        setCookie("register", "1", {
            path: "/"
     });
    }
    else {
        var registercookie = parseInt(cookies.register);
        registercookie++;
        setCookie("register", registercookie, {
            path: "/"
        });
    }
    }

    return (
        <div className="App">
            <div className="registration">
                <h1>Sign Up</h1>
                <input type="text" placeholder="Username" onChange={(x) => { setUsernameReg(x.target.value); }} /><br />
                <input type="password" placeholder="Password" onChange={(x) => { setPasswordReg(x.target.value); }} /> <br />
                <button onClick={() => {register(); handleCookie();}}>Sign Up</button>
            </div>
        </div>
    );
}

export default Register;