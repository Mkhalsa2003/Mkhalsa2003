require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRound = 10;
const cookieParser = require('cookie-parser');

var config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  //user: "root",
  //database: "loginsystem",
  //password: "",
  //host:"localhost"
}

config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;

const db = mysql.createConnection(config);

db.connect();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
      origin: ["https://elite-firefly-337919.uc.r.appspot.com"],
        //origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "OPTIONS"],
        credentials: true,
  })
);

const port = process.env.PORT;
app.listen(port, () => console.log("API is running on" + port.toString()));

//app.listen(8080, () => console.log("API is running on " + 8080));


app.options('/', cors());

app.post("/register", cors(), (req, res) => {
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

app.post("/login", (req, res) => {
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
            const accessToken = jwt.sign(
              username,
              process.env.ACCESS_TOKEN_SECRET
            );
            res.send({ token: accessToken });
          } else {
            res.send({ message: "Username/Password is incorrect" });
          }
        });
      } else {
        res.send({ message: "Username doesn't exist" });
      }
    }
  );
});

app.post("/storecookie", (req, res) => {
    const testcookie = req.body.testcookie;
    const logincookie = req.body.logincookie;
    const registercookie = req.body.registercookie;
    const date = req.body.date;
  
    db.execute(
        "INSERT INTO cookies (testcookie, logincookie, registercookie, date) VALUES (?,?,?,?)",
      [testcookie, logincookie, registercookie, date],
      (err, result) => {
        console.log(err);
      }
    );
  });
  
