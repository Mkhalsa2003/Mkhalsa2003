import React, { useState } from "react";
import './App.css';
import Login from "./Login";
import { Tabs } from 'react-simple-tabs-component';
import 'react-simple-tabs-component/dist/index.css';
import Register from "./Register";

// Component Example
const TabOne = () => {
   return <Register />
 }

 const TabTwo = () => {
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
     label: 'Sign Up',
     Component: TabOne 
   },
   {
     label: 'Log In',
     Component: TabTwo
   },
 ]

export default function App() {
   return (
      <div className="App">
         <Tabs tabs={tabs}/>
      </div>
   );
}