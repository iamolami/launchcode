require('dotenv').config()
const express = require('express');
const morgan = require(('morgan'));
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.use(cors())

//Database Connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})



app.use(morgan('dev'));
app.use(express.json());

//Controllers

//POST Request
app.post('/create', (req, res) => {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const bmp = req.body.bmp;
        const date = new Date();

        db.query(
            process.env.CREATE_USER,
            [first_name, last_name, bmp, date],

            (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send("Values Inserted");
                }
            }
        )
        
    }
)
//GET Request
app.get('/clients', (req, res) => {

    db.query(
        process.env.GET_ALL_USERS, (err, result) => {
            if(err) {
                console.log(err)
            }else {
                res.send(result)
            }
        }
    )
})

//PUT request
app.put('/update',(req, res) => {
    const id = req.body.id;
    const first_name = req.body.first_name;

    db.query(
        process.env.UPDATE_USER, [first_name, id], (err, result) => {
            if(err) {
                console.log(err)
            } else {
                res.send(result)
                console.log(result)
            }
        }
    )
})

//Delete Request
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        process.env.DELETE_USER, id, (err, result) => {
            if(err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`app running on PORT ${PORT}`)
});