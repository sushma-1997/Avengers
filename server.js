const express = require("express");
const dotenv = require('dotenv');

dotenv.config({path: '.env-local'});


PORT = process.env.PORT || '8000';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/", function(req, res){
    res.send("landing page")
})

const avengersRouter = require('./routes/avengers');
app.use('/avengers',avengersRouter);

app.listen(3000, ()=>{
    console.log(`Running on http://localhost:${PORT}/`)
})