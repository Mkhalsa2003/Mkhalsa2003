import React, { useState, ReactDOM } from "react";
import './App.css';
import Axios from 'axios';

function GetWeather() {

    const [htmlTable, setTable] = useState("");

    const callGetWeather = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            Axios.get("https://api.weather.gov/points/" + latitude + "," + longitude, {
            }).then((apiResponse) => {
                Axios.get(apiResponse.data.properties.forecast, {
                }).then((forecastResponse) => {
                    var header = "<tr>"
                    var body = "<tr>";
                    forecastResponse.data.properties.periods.forEach(period => {
                        header += ("<th>" + period.name + "</th>");
                        body += ("<td>" + period.temperature + " " + period.temperatureUnit + "</td>");
                    });
                    header += "</tr>";
                    body += "</tr>";
                    var html = "<table>" + header + body + "</table>";
                    setTable(html);
                });
            });
        });
    };

    callGetWeather();
    return (
        <div>
            {htmlTable}
        </div>
    );
}

export default GetWeather;