import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';
import GoogleLogin from 'react-google-login';

function Login({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

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

    const handleCredentialResponse = (results) => {
        setToken(results.tokenId)
    }

    return (
        <div className="App">
            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="Username" onChange={(x) => { setUsername(x.target.value); }} /> <br />
                <input type="password" placeholder="Password" onChange={(x) => { setPassword(x.target.value); }} />
                <button onClick={login}>Login</button>
                <GoogleLogin
                clientId="975785739574-gj70fl0q2htqrhq5ae1a2csp5k12ne9v.apps.googleusercontent.com"
                buttonText="Log in with Google"
                onSuccess={handleCredentialResponse}
                onFailure={handleCredentialResponse}
                />
                <p>{loginStatus}</p>
            </div>
        </div>
    );
}

export default Login;