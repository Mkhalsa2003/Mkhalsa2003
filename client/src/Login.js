import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';

function Login({ setToken }) {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const register = () => {
        Axios.post("http://localhost:8080/register", {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    };
    const login = () => {
        Axios.post("http://localhost:8080/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message !== undefined) {
                setLoginStatus(response.data.message)
            }
            else if (response.data.token !== undefined) {
                setLoginStatus("Logged in Successfully");
                setToken(response.data.token)
            }
            else {
                setLoginStatus("Something Went Wrong")
            }
        });
    };
    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);

    const handleCredentialResponse = (response) =>{
        setToken(response.credential)
    }

    return (
        <div className="App">
            <div className="registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input type="text" onChange={(x) => { setUsernameReg(x.target.value); }} /><br />
                <label>Password</label>
                <input type="password" onChange={(x) => { setPasswordReg(x.target.value); }} /> <br />
                <button onClick={register}> Register</button>
            </div>
            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="Username…" onChange={(x) => { setUsername(x.target.value); }} /> <br />
                <input type="password" placeholder="Password…" onChange={(x) => { setPassword(x.target.value); }} />
                <button onClick={login}>Login</button>
            </div>
            <p>{loginStatus}</p>
            <div id="g_id_onload"
                data-client_id="975785739574-gj70fl0q2htqrhq5ae1a2csp5k12ne9v.apps.googleusercontent.com"
                data-callback="handleCredentialResponse"
                data-auto_prompt="false">
            </div>
            <div className="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left">
            </div>

        </div>
    );
}

export default Login;