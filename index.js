const express = require("express");
const mysql = require("mysql");
const app = express();


var conn = mysql.createConnection({
host: "m7nj9dclezfq7ax1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
user: "c3yxm56xoiva8nz1",
password: "om1hjmtbl3qcxgcs",
database: "o4dti14tbvvdeb98",
port: "3306"
});

app.get("/db", function(req, res) {
console.log("Usuario es: ", req.query.user);
console.log("Password es: ", req.query.pass);
// res.send(`Usuario: ${req.query.user},
// Password: ${req.query.pass}`);
try {
    conn.connect();
    conn.query("SELECT * FROM mi01", function(err, rows, fields) {
    if (err) throw err;
    // console.log(`Primer fila: ${rows[0]}`);
    console.log("Primera fila: ", rows[0]);
    res.send(rows[0]);
});
} catch (err) {
    console.error(err);
} finally {
    conn.end();
}
});

app.get("/saludos", function(req, res) {
    res.send("Saludos GET");
});
app.post("/saludos", function(req, res) {
    res.send("Salute POST");
});

app.get("/", function(req, res) {
    // res.send("Hola Pianola!");
    res.sendfile('index.html');
});

app.listen(3000, () => {
    console.log(`El servidor esta inicializado en el puerto 3000`);
});

app.get("/Comparar", function(req, res)
{
    conn.connect();
    conn.query("SELECT username, password FROM mi01 WHERE username = '" + req.query.username + "'", function(err, rows, fields)
    {
        if (err) throw err;
        // console.log(`Primer fila: ${rows[0]}`);

        console.log("Usuario: " + req.query.username);
        console.log("Contrasena: "+ req.query.pass);
        if (rows[0] == null)
        {
            //console.log ("No existe");
            res.send("No existe");

        }
        else{
            console.log(rows[0]);
            res.send(rows[0]);
        }

    })
    conn.end();
    ;
});
