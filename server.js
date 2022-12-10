const express = require("express"), 
app = express();
const dotenv = require('dotenv'),
bodyParser = require("body-parser");

//=======  Basic express app setup =========//

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname + "/public"));

dotenv.config({path: '.env-local'});


PORT = process.env.PORT || '8000';

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/", function(req, res){
    res.send("landing page, go to "  + "<a href='http://localhost:3000/dashboard'>Dashboard</a>?")
})

const indexRouter = require('./routes/index');
const avengersRouter = require('./routes/avengers');

app.use('/',indexRouter);
app.use('/avengers',avengersRouter);

app.listen(3000, ()=>{
    // console.log(`Running on http://localhost:${PORT}/`)
    console.log(`Running on http://localhost:3000/`)
})