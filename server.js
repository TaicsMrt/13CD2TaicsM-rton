const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

const db = mysql.createConnection(
    {
        user: "root",
        host: "localhost",
        port: "3306",
        password: "",
        database: "felveteli"
    }
)

app.get("/", (req, res) => {
    res.send("Működik a szerverem!")
})