require("dotenv").config();
const jwt = require("jsonwebtoken")
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRound = 10;
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "9e1bc3cb-a91a-455d-a101-6d882570e702",
    database: "loginsystem",

});

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRound, (err, hash) => {
        if (err) {
            console.log(error);
        }

        db.execute(
            "INSERT INTO users (username, password) VALUES (?,?)",
            [username, hash],
            (err, result) => {
                console.log(err);
            }
        );
    });
});


app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.execute(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {

                        const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
                        res.send({token: accessToken});
                    }
                    else {
                        res.send({ message: "Username/Password is incorrect" });
                    }
                })
            }
            else {
                res.send({ message: "Username doesn't exist" });
            }
        }
    );
});

