import React, { useEffect, useState, useRef } from "react";
import './App.css';

import { Tabs } from 'react-simple-tabs-component';
import 'react-simple-tabs-component/dist/index.css';
import Register from "./Register";
import { useCookies } from 'react-cookie';
import Axios from "axios";
import GetWeather from "./GetWeather";


/*function TabTwo() {
   return <Register />;
}
*/
const TabOne = () => {
// const [token, setToken] = useState();
// const [username, setUsername] = useState();
return (<GetWeather/>);
}
 
 const tabs = [
   {
     Component: TabOne 
   },
   // {
   //   label: 'Sign Up',
   //   Component: TabTwo
   // }
]

export default function App() {

   // const[cookies, setCookie, removeCookie] = useCookies(["test", "login", "register"]);
   // const [count, setCount] = useState(0);

  
   // const notInitialRender = useRef(false)

   // useEffect(() => {
      
   // }, [count])

   // useEffect(() => {
   //    setInterval(() => {
   //      setCount(prevCount => prevCount + 1);
   //    }, 30000);

   //    const handler = (e) => {
   //       setCount(prevCount => prevCount + 1);
   //     };
   //    window.addEventListener("beforeunload", handler);
   //  }, []);


   return (
      
      <div className="App">
         <Tabs tabs={tabs}/>
        
      </div>
   );};
