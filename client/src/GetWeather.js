import React, { useState, ReactDOM } from "react";
import './App.css';
import Axios from 'axios';
import {Cookies} from 'react-cookie';


function GetWeather() {

    const cookie = new Cookies();
    const [htmlTable, setTable] = useState("");
    const [forcastType, setForcastType] = useState("");

    const callGetWeather = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            Axios.get("https://api.weather.gov/points/" + latitude + "," + longitude, {
            }).then((apiResponse) => {
                Axios.get(apiResponse.data.properties.forecast, {
                }).then((forecastResponse) => {
                    var header = "<tr>"
                    var body = "<tr>";
                    var img = "<tr>"
                    forecastResponse.data.properties.periods.forEach(period => {
                        header += ("<th>" + period.name + "</th>");
                        body += ("<td>" + period.temperature + " " + period.temperatureUnit + "</td>");
                        img += ("<td><img src=\"" + period.icon + "\"/></td>");
                    });
                    header += "</tr>";
                    body += "</tr>";
                    img += "</tr>";
                    var html = "<table>" + header + body + img + "</table>";
                    setTable(html);
                });
            });
        });
    };

    const getUserPreference = () => {
        //Axios.post("https://api-dot-elite-firefly-337919.uc.r.appspot.com/getpreference", {
            Axios.post("http://localhost:8080/getpreference", {

            username: cookie.get("username")
            
        }).then((response) => {
            if (response.data.forcastType !== undefined) {
                setForcastType(response.data.forcastType);
            }
        })
    }

    const setUserPreference = () => {
        //Axios.post("https://api-dot-elite-firefly-337919.uc.r.appspot.com/getpreference", {
            Axios.post("http://localhost:8080/setpreference", {

            username: cookie.get("username"),
            forcastType: "testtype"
            
        }).then((response) => {
            if (response.data.forcastType !== undefined) {
                setForcastType(response.data.forcastType);
            }
        })
    }


    callGetWeather();
    setUserPreference();
    getUserPreference();
    return (
        <div>
        <div dangerouslySetInnerHTML={{ __html:  htmlTable}}/>
        <p>{cookie.get("username")}</p>
        <p>{forcastType}</p> 
        </div>
    );
}

export default GetWeather;