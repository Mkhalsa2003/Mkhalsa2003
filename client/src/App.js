import React, { useEffect, useState, useRef } from "react";
import './App.css';
import Login from "./Login";
import { Tabs } from 'react-simple-tabs-component';
import 'react-simple-tabs-component/dist/index.css';
import Register from "./Register";
import { useCookies } from 'react-cookie';
import Axios from "axios";
import GetWeather from "./GetWeather";



const TabThree = () => {
   return <GetWeather />
}

const TabTwo = () => {
   return <Register />
}

const TabOne = () => {
const [token, setToken] = useState();
const [username, setUsername] = useState();

   if(!token) {
      return <Login setToken={setToken} setUsername={setUsername} />
   }
   return (
      <div className="App">
         <div className="registration">
            <h1>Logged in Successfully</h1>
         </div>
      </div>
   );
}
 
 const tabs = [
   {
     label: 'Log In',
     Component: TabOne 
   },
   {
     label: 'Sign Up',
     Component: TabTwo
   },
   {
      label: 'Weather',
      Component: TabThree
   }
]

export default function App() {

   const[cookies, setCookie, removeCookie] = useCookies(["test", "login", "register"]);
   const [count, setCount] = useState(0);

   function clearCookiesOnExit() {
      removeCookie("test");
      removeCookie("login");
      removeCookie("register");
   }

   function handleCookie() {    
      if (cookies.test === undefined) {
         setCookie("test", "1", {
            path: "/"
         });
      }
      else {
         var testcookie = parseInt(cookies.test);
         testcookie++;
         setCookie("test", testcookie, {
            path: "/"
         });
      }
   }

   function sendCookiesOnExit()
   {
      Axios.post("https://api-dot-elite-firefly-337919.uc.r.appspot.com/storecookie", {
      //Axios.post("http://localhost:8080/storecookie", {
      testcookie: cookies.test ? cookies.test : '0',
      logincookie: cookies.login ? cookies.login : '0',
      registercookie: cookies.register ? cookies.register : '0',
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      });
      clearCookiesOnExit();
   }

   const notInitialRender = useRef(false)

   useEffect(() => {
      if(notInitialRender.current)
      {
         sendCookiesOnExit();
      }
      else
      {
         notInitialRender.current = true;
      }
   }, [count])

   useEffect(() => {
      setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 30000);

      const handler = (e) => {
         setCount(prevCount => prevCount + 1);
       };
      window.addEventListener("beforeunload", handler);
    }, []);


   return (
      
      <div className="App">
         <Tabs tabs={tabs}/>
         <button onClick={handleCookie}>Set a Cookie <span role="img" aria-label="cookie">🍪</span></button>
         <button onClick={sendCookiesOnExit}>Send cookies</button>
      </div>
   );
}