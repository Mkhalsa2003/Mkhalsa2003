import React, { useState } from "react";
import './App.css';
import Axios from 'axios';

function Register() {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const register = () => {
        Axios.post("http://localhost:8080/register", {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    };
    return (
        <div className="App">
            <div className="registration">
                <h1>Sign Up</h1>
                <input type="text" placeholder="Username" onChange={(x) => { setUsernameReg(x.target.value); }} /><br />
                <input type="password" placeholder="Password" onChange={(x) => { setPasswordReg(x.target.value); }} /> <br />
                <button onClick={register}>Sign Up</button>
            </div>
        </div>
    );
}

export default Register;