const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    port: "3306",
    password: "",
    database: "felveteli"
});

db.connect((err) => {
    console.log('Csatlakozva az adatbázishoz');
});

app.get("/", (req, res) => {
    res.send("Működik a szerverem!");
});

app.get("/diakok", (req, res) => {
    const lekerdezes = `SELECT diakok.nev AS 'Tanuló neve', tagozatok.agazat AS 'Ágazat', (diakok.hozott + diakok.kpmagy + diakok.kpmat) AS 'Összes pontszám' FROM diakok INNER JOIN jelentkezesek ON diakok.oktazon = jelentkezesek.diak INNER JOIN tagozatok ON jelentkezesek.tag = tagozatok.akod ORDER BY (diakok.hozott + diakok.kpmagy + diakok.kpmat) ASC;`;

    db.query(lekerdezes, (err, eredmenyek) => {
            res.json(eredmenyek);
    });
});

app.listen(3000, () => {
    console.log('Fut a szerver!');
});