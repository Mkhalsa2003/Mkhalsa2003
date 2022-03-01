import React, { useState } from "react";
import './App.css';
import Axios from 'axios';
import { useCookies } from 'react-cookie';

function Register() {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const register = () => {
        Axios.post("https://api-dot-elite-firefly-337919.uc.r.appspot.com/register", {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    };

    const[cookies, setCookie] = useCookies(["user"]);

    function handleCookie() {
       setCookie("register", "register-attempt", {
          path: "/"
       });
    }

    return (
        <div className="App">
            <div className="registration">
                <h1>Sign Up</h1>
                <input type="text" placeholder="Username" onChange={(x) => { setUsernameReg(x.target.value); }} /><br />
                <input type="password" placeholder="Password" onChange={(x) => { setPasswordReg(x.target.value); }} /> <br />
                <button onClick={register, handleCookie}>Sign Up</button>
            </div>
        </div>
    );
}

export default Register;