import React, { useState } from "react";
import './App.css';
import Login from "./Login";
import { Tabs } from 'react-simple-tabs-component';
import 'react-simple-tabs-component/dist/index.css';
import Register from "./Register";
import { useCookies } from 'react-cookie';

const TabTwo = () => {
   return <Register />
}

const TabOne = () => {
   const [token, setToken] = useState();
   if(!token) {
      return <Login setToken={setToken} />
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
]

export default function App() {

   const[cookies, setCookie] = useCookies(["test"]);

   function handleCookie() {
      setCookie("test", "cookie-test", {
         path: "/"
      });
   }

   return (
      <div className="App">
         <Tabs tabs={tabs}/>
         <button onClick={handleCookie}>Set a Cookie 🍪</button>
      </div>
   );
}