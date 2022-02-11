import React, { useState } from "react";
import './App.css';
import Login from "./Login";

function App() {
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
 
export default App;