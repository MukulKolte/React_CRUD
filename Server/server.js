import express from 'express';
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: ""
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM StudentVerification";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.post('/StudentVerification', (req, res) => {
    const sql = "INSERT INTO StudentVerification (`ID`,`StudentName`, `Email`) VALUES (?)";
    const values = [
        req.body.id,
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM StudentVerification WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.put('/edit/:id', (req,res) => {
    const sql = 'UPDATE StudentVerification SET `StudentName`=?, `Email`=? WHERE `ID`=?';
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if(err) return res.json({Message: "Error inside Server"})
        return res.json(result);
    })
})

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM StudentVerification WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside Server"})
        return res.json(result);
    })
})

app.listen(8081, () => {
    console.log("listening...");
})